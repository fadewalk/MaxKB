<template>
  <ContentContainer>
    <template #header>
      <slot name="header"> </slot>
    </template>
    <template #search>
      <div class="flex">
        <div class="flex-between complex-search">
          <el-select
            class="complex-search__left"
            v-model="search_type"
            style="width: 120px"
            @change="search_type_change"
          >
            <el-option :label="$t('common.creator')" value="create_user" />

            <el-option :label="$t('views.tool.form.toolName.label')" value="name" />
          </el-select>
          <el-input
            v-if="search_type === 'name'"
            v-model="search_form.name"
            @change="searchHandle"
            :placeholder="$t('common.searchBar.placeholder')"
            style="width: 220px"
            clearable
          />
          <el-select
            v-else-if="search_type === 'create_user'"
            v-model="search_form.create_user"
            @change="searchHandle"
            filterable
            clearable
            style="width: 220px"
          >
            <el-option v-for="u in user_options" :key="u.id" :value="u.id" :label="u.nick_name" />
          </el-select>
        </div>
        <el-dropdown trigger="click" v-if="!isShared && permissionPrecise.create()">
          <el-button type="primary" class="ml-8">
            {{ $t('common.create') }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class="create-dropdown">
              <el-dropdown-item @click="openCreateDialog()">
                <div class="flex align-center">
                  <el-avatar class="avatar-green" shape="square" :size="32">
                    <img src="@/assets/workflow/icon_tool.svg" style="width: 58%" alt="" />
                  </el-avatar>
                  <div class="pre-wrap ml-8">
                    <div class="lighter">空白创建</div>
                  </div>
                </div>
              </el-dropdown-item>
              <el-upload
                ref="elUploadRef"
                :file-list="[]"
                action="#"
                multiple
                :auto-upload="false"
                :show-file-list="false"
                :limit="1"
                :on-change="(file: any, fileList: any) => importTool(file)"
                class="import-button"
              >
                <el-dropdown-item
                  v-if="permissionPrecise.import()"
                >
                  <div class="flex align-center w-full">
                    <el-avatar shape="square" class="mt-4" :size="36" style="background: none">
                      <img src="@/assets/icon_import.svg" alt="" />
                    </el-avatar>
                    <div class="pre-wrap ml-8">
                      <div class="lighter">{{ $t('common.importCreate') }}</div>
                    </div>
                  </div>
                </el-dropdown-item>
              </el-upload>
              <el-dropdown-item @click="openToolStoreDialog()">
                <div class="flex align-center">
                  <el-avatar class="avatar-green" shape="square" :size="32">
                    <img src="@/assets/workflow/icon_tool.svg" style="width: 58%" alt="" />
                  </el-avatar>
                  <div class="pre-wrap ml-8">
                    <div class="lighter">
                      {{ $t('views.tool.toolStore.createFromToolStore') }}
                    </div>
                  </div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item @click="openCreateFolder" divided v-if="apiType === 'workspace'">
                <div class="flex align-center">
                  <AppIcon iconName="app-folder" style="font-size: 32px"></AppIcon>
                  <div class="pre-wrap ml-4">
                    <div class="lighter">
                      {{ $t('components.folder.addFolder') }}
                    </div>
                  </div>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>

    <div
      v-loading.fullscreen.lock="paginationConfig.current_page === 1 && loading"
      style="max-height: calc(100vh - 120px)"
    >
      <InfiniteScroll
        :size="tool.toolList.length"
        :total="paginationConfig.total"
        :page_size="paginationConfig.page_size"
        v-model:current_page="paginationConfig.current_page"
        @load="getList"
        :loading="loading"
      >
        <el-row v-if="tool.toolList.length > 0" :gutter="15" class="w-full">
          <template v-for="(item, index) in tool.toolList" :key="index">
            <el-col
              v-if="item.resource_type === 'folder'"
              :xs="24"
              :sm="12"
              :md="12"
              :lg="8"
              :xl="6"
              class="mb-16"
            >
              <CardBox
                :title="item.name"
                :description="item.desc || $t('components.noDesc')"
                class="cursor"
                @click="clickFolder(item)"
              >
                <template #icon>
                  <el-avatar shape="square" :size="32" style="background: none">
                    <AppIcon iconName="app-folder" style="font-size: 32px"></AppIcon>
                  </el-avatar>
                </template>
                <template #subTitle>
                  <el-text class="color-secondary lighter" size="small">
                    {{ $t('common.creator') }}: {{ item.nick_name }}
                  </el-text>
                </template>
              </CardBox>
            </el-col>
            <el-col v-else :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="mb-16">
              <CardBox
                :title="item.name"
                :description="item.desc"
                class="cursor"
                @click.stop="openCreateDialog(item)"
                :disabled="permissionPrecise.edit(item.id)"
              >
                <template #icon>
                  <el-avatar
                    v-if="item?.icon"
                    shape="square"
                    :size="32"
                    style="background: none"
                    class="mr-8"
                  >
                    <img :src="resetUrl(item?.icon)" alt="" />
                  </el-avatar>
                  <el-avatar v-else class="avatar-green" shape="square" :size="32">
                    <img src="@/assets/workflow/icon_tool.svg" style="width: 58%" alt="" />
                  </el-avatar>
                </template>
                <template #subTitle>
                  <el-text class="color-secondary lighter" size="small">
                    {{ $t('common.creator') }}: {{ item.nick_name }}
                  </el-text>
                </template>
                <template #tag>
                  <el-tag v-if="isShared" type="info" class="info-tag">
                    {{ t('views.shared.title') }}
                  </el-tag>
                </template>

                <template #footer>
                  <div v-if="item.is_active" class="flex align-center">
                    <el-icon class="color-success mr-8" style="font-size: 16px">
                      <SuccessFilled />
                    </el-icon>
                    <span class="color-secondary">
                      {{ $t('common.status.enabled') }}
                    </span>
                  </div>
                  <div v-else class="flex align-center">
                    <AppIcon iconName="app-disabled" class="color-secondary mr-8"></AppIcon>
                    <span class="color-secondary">
                      {{ $t('common.status.disabled') }}
                    </span>
                  </div>
                </template>
                <template #mouseEnter>
                  <div @click.stop v-if="!isShared &&
                    MoreFieldPermission(item.id)">
                    <el-switch
                      v-model="item.is_active"
                      :before-change="() => changeState(item)"
                      size="small"
                      class="mr-4"
                      v-if="permissionPrecise.switch(item.id)"
                    />
                    <el-divider direction="vertical" />
                    <el-dropdown trigger="click">
                      <el-button text @click.stop>
                        <el-icon>
                          <MoreFilled />
                        </el-icon>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item
                            v-if="item.template_id && permissionPrecise.edit(item.id)"
                            @click.stop="addInternalTool(item, true)"
                          >
                            <el-icon>
                              <EditPen />
                            </el-icon>
                            {{ $t('common.edit') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="!item.template_id && permissionPrecise.edit(item.id)"
                            @click.stop="openCreateDialog(item)"
                          >
                            <el-icon>
                              <EditPen />
                            </el-icon>
                            {{ $t('common.edit') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="!item.template_id && permissionPrecise.copy(item.id)"
                            @click.stop="copyTool(item)"
                          >
                            <AppIcon iconName="app-copy"></AppIcon>
                            {{ $t('common.copy') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="
                              item.init_field_list?.length > 0 && permissionPrecise.edit(item.id)
                            "
                            @click.stop="configInitParams(item)"
                          >
                            <AppIcon iconName="app-operation" class="mr-4"></AppIcon>
                            {{ $t('common.param.initParam') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            @click.stop="openMoveToDialog(item)"
                            v-if="permissionPrecise.copy(item.id) && apiType === 'workspace'"
                          >
                            <AppIcon iconName="app-migrate"></AppIcon>
                            {{ $t('common.moveTo') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="isSystemShare"
                            icon="Lock"
                            @click.stop="openAuthorizedWorkspaceDialog(item)"
                            >{{ $t('views.shared.authorized_workspace') }}</el-dropdown-item
                          >
                          <el-dropdown-item
                            v-if="!item.template_id && permissionPrecise.export(item.id)"
                            @click.stop="exportTool(item)"
                          >
                            <AppIcon iconName="app-export"></AppIcon>
                            {{ $t('common.export') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            v-if="permissionPrecise.delete(item.id)"
                            divided
                            @click.stop="deleteTool(item)"
                          >
                            <el-icon><Delete /></el-icon>
                            {{ $t('common.delete') }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </template>
              </CardBox>
            </el-col>
          </template>
        </el-row>
        <el-empty :description="$t('common.noData')" v-else />
      </InfiniteScroll>
    </div>
  </ContentContainer>
  <InitParamDrawer ref="InitParamDrawerRef" @refresh="refresh" />
  <ToolFormDrawer ref="ToolFormDrawerRef" @refresh="refresh" :title="ToolDrawertitle" />
  <CreateFolderDialog ref="CreateFolderDialogRef" v-if="!isShared" @refresh="refreshFolder" />
  <ToolStoreDialog ref="toolStoreDialogRef" :api-type="apiType" @refresh="refresh" />
  <AddInternalToolDialog ref="AddInternalToolDialogRef" @refresh="confirmAddInternalTool" />
  <AuthorizedWorkspace
    ref="AuthorizedWorkspaceDialogRef"
    v-if="isSystemShare"
  ></AuthorizedWorkspace>
  <MoveToDialog
    ref="MoveToDialogRef"
    :source="SourceTypeEnum.TOOL"
    @refresh="refreshToolList"
    v-if="apiType === 'workspace'"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'
import { cloneDeep } from 'lodash'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import InitParamDrawer from '@/views/tool/component/InitParamDrawer.vue'
import ToolFormDrawer from '@/views/tool/ToolFormDrawer.vue'
import CreateFolderDialog from '@/components/folder-tree/CreateFolderDialog.vue'
import AuthorizedWorkspace from '@/views/system-shared/AuthorizedWorkspaceDialog.vue'
import ToolStoreDialog from '@/views/tool/toolStore/ToolStoreDialog.vue'
import AddInternalToolDialog from '@/views/tool/toolStore/AddInternalToolDialog.vue'
import MoveToDialog from '@/components/folder-tree/MoveToDialog.vue'
import { resetUrl } from '@/utils/common'
import { MsgSuccess, MsgConfirm, MsgError } from '@/utils/message'
import { SourceTypeEnum } from '@/enums/common'
import { loadSharedApi } from '@/utils/dynamics-api/shared-api'
import permissionMap from '@/permission'
import useStore from '@/stores'
import { t } from '@/locales'
const route = useRoute()
const { folder, user, tool } = useStore()
onBeforeRouteLeave((to, from) => {
  tool.setToolList([])
})
const emit = defineEmits(['refreshFolder'])

const apiType = computed(() => {
  if (route.path.includes('shared')) {
    return 'systemShare'
  } else if (route.path.includes('resource-management')) {
    return 'systemManage'
  } else {
    return 'workspace'
  }
})

const isShared = computed(() => {
  return folder.currentFolder.id === 'share'
})
const isSystemShare = computed(() => {
  return apiType.value === 'systemShare'
})

const permissionPrecise = computed(() => {
  return permissionMap['tool'][apiType.value]
})

const MoreFieldPermission = (id: any) => {
  return (permissionPrecise.value.edit(id) ||
   permissionPrecise.value.export(id) ||
  permissionPrecise.value.delete(id) || isSystemShare.value)
}

const InitParamDrawerRef = ref()
const search_type = ref('name')
const search_form = ref<any>({
  name: '',
  create_user: '',
})
const user_options = ref<any[]>([])

const loading = ref(false)
const changeStateloading = ref(false)
const paginationConfig = reactive({
  current_page: 1,
  page_size: 30,
  total: 0,
})

const search_type_change = () => {
  search_form.value = { name: '', create_user: '' }
}
const ToolFormDrawerRef = ref()
const ToolDrawertitle = ref('')

const MoveToDialogRef = ref()
function openMoveToDialog(data: any) {
  const obj = {
    id: data.id,
    folder_id: data.folder,
  }
  MoveToDialogRef.value?.open(obj)
}

function refreshToolList(row: any) {
  const list = cloneDeep(tool.toolList)
  const index = list.findIndex((v) => v.id === row.id)
  list.splice(index, 1)
  tool.setToolList(list)
}

const AuthorizedWorkspaceDialogRef = ref()
function openAuthorizedWorkspaceDialog(row: any) {
  if (AuthorizedWorkspaceDialogRef.value) {
    AuthorizedWorkspaceDialogRef.value.open(row, 'Tool')
  }
}

function openCreateDialog(data?: any) {
  // 有template_id的不允许编辑，是模板转换来的
  if (data?.template_id) {
    return
  }
  // 共享过来的工具不让编辑
  if (isShared.value) {
    return
  }
  ToolDrawertitle.value = data ? t('views.tool.editTool') : t('views.tool.createTool')
  if (data) {
    loadSharedApi({ type: 'tool', systemType: apiType.value })
      .getToolById(data?.id, loading)
      .then((res: any) => {
        ToolFormDrawerRef.value.open(res.data)
      })
  } else {
    ToolFormDrawerRef.value.open(data)
  }
}

async function changeState(row: any) {
  if (row.is_active) {
    MsgConfirm(
      `${t('views.tool.disabled.confirmTitle')}${row.name} ?`,
      t('views.tool.disabled.confirmMessage'),
      {
        confirmButtonText: t('common.status.disable'),
        confirmButtonClass: 'danger',
      },
    ).then(() => {
      const obj = {
        is_active: !row.is_active,
      }
      loadSharedApi({ type: 'tool', systemType: apiType.value })
        .putTool(row.id, obj, changeStateloading)
        .then(() => {
          const list = cloneDeep(tool.toolList)
          const index = list.findIndex((v) => v.id === row.id)
          list[index].is_active = !row.is_active
          tool.setToolList(list)
          return true
        })
        .catch(() => {
          return false
        })
    })
  } else {
    const res = await loadSharedApi({ type: 'tool', systemType: apiType.value }).getToolById(
      row.id,
      changeStateloading,
    )
    if (
      (!res.data.init_params || Object.keys(res.data.init_params).length === 0) &&
      res.data.init_field_list &&
      res.data.init_field_list.length > 0 &&
      res.data.init_field_list.filter((item: any) => item.default_value && item.show_default_value)
        .length !== res.data.init_field_list.length
    ) {
      InitParamDrawerRef.value.open(res.data, !row.is_active)
      return false
    }
    const obj = {
      is_active: !row.is_active,
    }
    loadSharedApi({ type: 'tool', systemType: apiType.value })
      .putTool(row.id, obj, changeStateloading)
      .then(() => {
        const list = cloneDeep(tool.toolList)
        const index = list.findIndex((v) => v.id === row.id)
        list[index].is_active = !row.is_active
        tool.setToolList(list)
        return true
      })
      .catch(() => {
        return false
      })
  }
}

async function copyTool(row: any) {
  ToolDrawertitle.value = t('views.tool.copyTool')
  const res = await loadSharedApi({ type: 'tool', systemType: apiType.value }).getToolById(
    row.id,
    changeStateloading,
  )
  const obj = cloneDeep(res.data)
  delete obj['id']
  obj['name'] = obj['name'] + `  ${t('common.copyTitle')}`
  ToolFormDrawerRef.value.open(obj)
}

function exportTool(row: any) {
  loadSharedApi({ type: 'tool', systemType: apiType.value })
    .exportTool(row.id, row.name, loading)
    .catch((e: any) => {
      if (e.response.status !== 403) {
        e.response.data.text().then((res: string) => {
          MsgError(`${t('views.application.tip.ExportError')}:${JSON.parse(res).message}`)
        })
      }
    })
}

function deleteTool(row: any) {
  MsgConfirm(
    `${t('views.tool.delete.confirmTitle')}：${row.name} ?`,
    t('views.tool.delete.confirmMessage'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      confirmButtonClass: 'danger',
    },
  )
    .then(() => {
      loadSharedApi({ type: 'tool', systemType: apiType.value })
        .delTool(row.id, loading)
        .then(() => {
          const list = cloneDeep(tool.toolList)
          const index = list.findIndex((v) => v.id === row.id)
          list.splice(index, 1)
          tool.setToolList(list)
          MsgSuccess(t('common.deleteSuccess'))
        })
    })
    .catch(() => {})
}

function configInitParams(item: any) {
  loadSharedApi({ type: 'tool', systemType: apiType.value })
    .getToolById(item?.id, changeStateloading)
    .then((res: any) => {
      InitParamDrawerRef.value.open(res.data)
    })
}

const toolStoreDialogRef = ref<InstanceType<typeof ToolStoreDialog>>()
function openToolStoreDialog() {
  toolStoreDialogRef.value?.open(folder.currentFolder.id)
}

const AddInternalToolDialogRef = ref<InstanceType<typeof AddInternalToolDialog>>()
function addInternalTool(data?: any, isEdit?: boolean) {
  AddInternalToolDialogRef.value?.open(data, isEdit)
}

function confirmAddInternalTool(data?: any, isEdit?: boolean) {
  if (isEdit) {
    loadSharedApi({ type: 'tool', systemType: apiType.value })
      .putTool(data?.id as string, { name: data.name }, loading)
      .then((res: any) => {
        MsgSuccess(t('common.saveSuccess'))
        refresh()
      })
  }
}

const elUploadRef = ref()
function importTool(file: any) {
  const formData = new FormData()
  formData.append('file', file.raw, file.name)
  formData.append('folder_id', folder.currentFolder.id || user.getWorkspaceId())
  elUploadRef.value.clearFiles()
  loadSharedApi({ type: 'tool', systemType: apiType.value })
    .postImportTool(formData, loading)
    .then(async (res: any) => {
      if (res?.data) {
        tool.setToolList([])
        return user.profile()
      }
    })
    .then(() => {
      getList()
    })
    .catch((e: any) => {
      if (e.code === 400) {
        MsgConfirm(t('common.tip'), t('views.application.tip.professionalMessage'), {
          cancelButtonText: t('common.confirm'),
          confirmButtonText: t('common.professional'),
        }).then(() => {
          window.open('https://maxkb.cn/pricing.html', '_blank')
        })
      }
    })
}

function refresh(data?: any) {
  if (data) {
    const list = cloneDeep(tool.toolList)
    const index = list.findIndex((v) => v.id === data.id)
    list.splice(index, 1, data)
    tool.setToolList(list)
  } else {
    paginationConfig.total = 0
    paginationConfig.current_page = 1
    tool.setToolList([])
    getList()
  }
}

// 文件夹相关
const CreateFolderDialogRef = ref()
function openCreateFolder() {
  CreateFolderDialogRef.value.open(SourceTypeEnum.TOOL, folder.currentFolder.id)
}

watch(
  () => folder.currentFolder,
  (newValue) => {
    if (newValue && newValue.id) {
      paginationConfig.current_page = 1
      tool.setToolList([])
      getList()
    }
  },
  { deep: true, immediate: true },
)
function getList() {
  const params: any = {
    folder_id: folder.currentFolder?.id || user.getWorkspaceId(),
    scope: apiType.value === 'systemShare' ? 'SHARED' : 'WORKSPACE',
  }
  if (search_form.value[search_type.value]) {
    params[search_type.value] = search_form.value[search_type.value]
  }
  loadSharedApi({ type: 'tool', isShared: isShared.value, systemType: apiType.value })
    .getToolListPage(paginationConfig, params, loading)
    .then((res: any) => {
      paginationConfig.total = res.data?.total
      tool.setToolList([...tool.toolList, ...res.data?.records])
    })
}

function clickFolder(item: any) {
  folder.setCurrentFolder(item)
}

function refreshFolder() {
  emit('refreshFolder')
}

function searchHandle() {
  paginationConfig.current_page = 1
  tool.setToolList([])
  getList()
}

onMounted(() => {
  if (apiType.value !== 'workspace') {
    getList()
  }
  loadSharedApi({ type: 'workspace', isShared: isShared.value, systemType: apiType.value })
    .getAllMemberList(user.getWorkspaceId(), loading)
    .then((res: any) => {
      user_options.value = res.data
    })
})
</script>

<style lang="scss" scoped></style>
