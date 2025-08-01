<template>
  <card-box :title="model.name" shadow="hover" class="model-card">
    <template #icon>
      <span style="height: 32px; width: 32px" :innerHTML="icon"></span>
    </template>
    <template #title>
      <div class="flex" style="height: 22px">
        <span class="ellipsis-1 mb-4" :title="model.name" style="width: 80%">
          {{ model.name }}
        </span>
        <span v-if="currentModel.status === 'ERROR'">
          <el-tooltip effect="dark" :content="errMessage" placement="top">
            <el-icon class="color-danger ml-4" size="18"><Warning /></el-icon>
          </el-tooltip>
        </span>
        <span v-if="currentModel.status === 'PAUSE_DOWNLOAD'">
          <el-tooltip
            effect="dark"
            :content="`${$t('views.model.modelForm.base_model.label')}: ${props.model.model_name} ${$t('views.model.tip.downloadError')}`"
            placement="top"
          >
            <el-icon class="color-danger ml-4" size="18"><Warning /></el-icon>
          </el-tooltip>
        </span>
      </div>
    </template>
    <template #subTitle>
      <el-text class="color-secondary lighter" size="small">
        {{ $t('common.creator') }}: {{ model.nick_name }}
      </el-text>
    </template>
    <template #tag>
      <el-tag v-if="isShared || isSystemShare" type="info" class="info-tag">
        {{ t('views.shared.title') }}
      </el-tag>
    </template>
    <ul>
      <li class="flex mb-4">
        <el-text type="info" class="color-secondary"
          >{{ $t('views.model.modelForm.model_type.label') }}
        </el-text>
        <span class="ellipsis ml-16">
          {{ $t(modelType[model.model_type as keyof typeof modelType]) }}</span
        >
      </li>
      <li class="flex">
        <el-text type="info" class="color-secondary"
          >{{ $t('views.model.modelForm.base_model.label') }}
        </el-text>
        <span class="ellipsis-1 ml-16" style="height: 20px; width: 70%">
          {{ model.model_name }}</span
        >
      </li>
    </ul>
    <!-- progress -->
    <div class="progress-mask" v-if="currentModel.status === 'DOWNLOAD'">
      <DownloadLoading class="percentage" />

      <div class="percentage-label flex-center">
        {{ $t('views.model.download.downloading') }} <span class="dotting"></span>
        <el-button link type="primary" class="ml-16" @click.stop="cancelDownload"
          >{{ $t('views.model.download.cancelDownload') }}
        </el-button>
      </div>
    </div>

    <template #mouseEnter v-if="MoreFilledPermission(model.id)">
      <el-dropdown trigger="click" v-if="!isShared">
        <el-button text @click.stop>
          <el-icon>
            <MoreFilled />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-if="permissionPrecise.modify(model.id)"
              icon="EditPen"
              text
              @click.stop="openEditModel"
            >
              {{ $t('common.modify') }}
            </el-dropdown-item>
            <el-dropdown-item
              v-if="isSystemShare"
              icon="Lock"
              @click.stop="openAuthorizedWorkspaceDialog(model)"
              >{{ $t('views.shared.authorized_workspace') }}
            </el-dropdown-item>

            <el-dropdown-item
              v-if="
                (currentModel.model_type === 'TTS' ||
                  currentModel.model_type === 'LLM' ||
                  currentModel.model_type === 'IMAGE' ||
                  currentModel.model_type === 'TTI') &&
                permissionPrecise.paramSetting(model.id)
              "
              icon="Setting"
              @click.stop="openParamSetting"
            >
              {{ $t('views.model.modelForm.title.paramSetting') }}
            </el-dropdown-item>
            <el-dropdown-item
              divided
              icon="Delete"
              text
              @click.stop="deleteModel"
              v-if="permissionPrecise.delete(model.id)"
            >
              {{ $t('common.delete') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <EditModel ref="editModelRef" @submit="emit('change')"></EditModel>
    <ParamSettingDialog ref="paramSettingRef" />
    <AuthorizedWorkspace
      ref="AuthorizedWorkspaceDialogRef"
      v-if="isSystemShare"
    ></AuthorizedWorkspace>
  </card-box>
</template>
<script setup lang="ts">
import type { Provider, Model } from '@/api/type/model'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import EditModel from '@/views/model/component/EditModel.vue'
import DownloadLoading from '@/components/loading/DownloadLoading.vue'
import { MsgConfirm, MsgSuccess } from '@/utils/message'
import { modelType } from '@/enums/model'
import ParamSettingDialog from './ParamSettingDialog.vue'
import AuthorizedWorkspace from '@/views/system-shared/AuthorizedWorkspaceDialog.vue'
import { t } from '@/locales'
import permissionMap from '@/permission'
import { useRoute } from 'vue-router'
import { loadSharedApi } from '@/utils/dynamics-api/shared-api'

const route = useRoute()

const props = defineProps<{
  model: Model
  provider_list: Array<Provider>
  updateModelById: (model_id: string, model: Model) => void
  isShared?: boolean | undefined
  isSystemShare?: boolean | undefined
  apiType: 'systemShare' | 'workspace' | 'systemManage'
}>()

const apiType = props.apiType

const isSystemShare = computed(() => {
  return apiType === 'systemShare'
})

const permissionPrecise = computed(() => {
  return permissionMap['model'][props.apiType]
})

const MoreFilledPermission = (id: any) => {
  return (
    permissionPrecise.value.modify(id) || permissionPrecise.value.delete(id) || isSystemShare.value
  )
}

const downModel = ref<Model>()

const currentModel = computed(() => {
  if (downModel.value) {
    return downModel.value
  } else {
    return props.model
  }
})

const errMessage = computed(() => {
  if (currentModel.value.meta && currentModel.value.meta.message) {
    if (currentModel.value.meta.message === 'pull model manifest: file does not exist') {
      return `${currentModel.value.model_name} ${t('views.model.tip.noModel')}`
    }
    return currentModel.value.meta.message
  }
  return ''
})
const emit = defineEmits(['change', 'update:model'])
const editModelRef = ref<InstanceType<typeof EditModel>>()
let interval: any
const deleteModel = () => {
  MsgConfirm(
    `${t('views.model.delete.confirmTitle')}${props.model.name} ?`,
    t('views.model.delete.confirmMessage'),
    {
      confirmButtonText: t('common.confirm'),
      confirmButtonClass: 'danger',
    },
  )
    .then(() => {
      loadSharedApi({ type: 'model', systemType: props.apiType })
        .deleteModel(props.model.id)
        .then(() => {
          emit('change')
          MsgSuccess(t('common.deleteSuccess'))
        })
    })
    .catch(() => {})
}

const cancelDownload = () => {
  loadSharedApi({ type: 'model', systemType: props.apiType })
    .pauseDownload(props.model.id)
    .then(() => {
      downModel.value = undefined
      emit('change')
    })
}
const openEditModel = () => {
  const provider = props.provider_list.find((p) => p.provider === props.model.provider)
  if (provider) {
    editModelRef.value?.open(provider, props.model)
  }
}
const icon = computed(() => {
  return props.provider_list.find((p) => p.provider === props.model.provider)?.icon
})

/**
 * 初始化轮询
 */
const initInterval = () => {
  interval = setInterval(() => {
    if (currentModel.value.status === 'DOWNLOAD') {
      loadSharedApi({ type: 'model', systemType: props.apiType })
        .getModelMetaById(props.model.id)
        .then((ok: any) => {
          downModel.value = ok.data
        })
    } else {
      if (downModel.value) {
        props.updateModelById(props.model.id, downModel.value)
        downModel.value = undefined
      }
    }
  }, 6000)
}

/**
 * 关闭轮询
 */
const closeInterval = () => {
  if (interval) {
    clearInterval(interval)
  }
}

const paramSettingRef = ref<InstanceType<typeof ParamSettingDialog>>()
const openParamSetting = () => {
  paramSettingRef.value?.open(props.model)
}

const AuthorizedWorkspaceDialogRef = ref()

function openAuthorizedWorkspaceDialog(row: any) {
  if (AuthorizedWorkspaceDialogRef.value) {
    AuthorizedWorkspaceDialogRef.value.open(row, 'Model')
  }
}

onMounted(() => {
  initInterval()
})
onBeforeUnmount(() => {
  // 清除定时任务
  closeInterval()
})
</script>
<style lang="scss" scoped>
.model-card {
  min-height: 135px;
  min-width: auto;

  .operation-button {
    position: absolute;
    right: 12px;
    bottom: 12px;
    height: auto;
  }

  .progress-mask {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    width: 100%;
    height: 100%;
    z-index: 99;
    text-align: center;

    .percentage {
      margin-top: 55px;
      margin-bottom: 16px;
    }

    .percentage-label {
      margin-top: 50px;
      margin-left: 10px;
      font-size: 13px;
      color: var(--app-text-color-secondary);
    }
  }
}
</style>
