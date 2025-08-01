<template>
  <div class="p-16-24 application-setting">
    <div class="flex-between w-full mb-16">
      <h3>
        {{ $t('common.setting') }}
      </h3>
      <div>
        <el-button
          type="primary"
          @click="submit(applicationFormRef)"
          :disabled="loading"
          v-if="permissionPrecise.edit(id)"
        >
          {{ $t('common.save') }}
        </el-button>
        <el-button
          type="primary"
          @click="publish(applicationFormRef)"
          :disabled="loading"
          v-if="permissionPrecise.edit(id)"
        >
          {{ $t('views.application.operation.publish') }}
        </el-button>
      </div>
    </div>

    <el-card style="--el-card-padding: 0">
      <el-row v-loading="loading">
        <el-col :span="10">
          <div class="p-24 mb-16" style="padding-bottom: 0">
            <h4 class="title-decoration-1">
              {{ $t('views.applicationOverview.appInfo.header') }}
            </h4>
          </div>
          <div class="scrollbar-height-left">
            <el-scrollbar>
              <el-form
                hide-required-asterisk
                ref="applicationFormRef"
                :model="applicationForm"
                :rules="rules"
                label-position="top"
                require-asterisk-position="right"
                class="p-24"
                style="padding-top: 0"
              >
                <el-form-item prop="name">
                  <template #label>
                    <div class="flex-between">
                      <span
                        >{{ $t('views.application.form.appName.label') }}
                        <span class="color-danger">*</span></span
                      >
                    </div>
                  </template>
                  <el-input
                    v-model="applicationForm.name"
                    maxlength="64"
                    :placeholder="$t('views.application.form.appName.placeholder')"
                    show-word-limit
                    @blur="applicationForm.name = applicationForm.name?.trim()"
                  />
                </el-form-item>
                <el-form-item :label="$t('views.application.form.appDescription.label')">
                  <el-input
                    v-model="applicationForm.desc"
                    type="textarea"
                    :placeholder="$t('views.application.form.appDescription.placeholder')"
                    :rows="3"
                    maxlength="256"
                    show-word-limit
                  />
                </el-form-item>

                <el-form-item :label="$t('views.application.form.aiModel.label')">
                  <template #label>
                    <div class="flex-between">
                      <span>{{ $t('views.application.form.aiModel.label') }}</span>

                      <el-button
                        type="primary"
                        link
                        @click="openAIParamSettingDialog"
                        :disabled="!applicationForm.model_id"
                      >
                        {{ $t('common.paramSetting') }}
                      </el-button>
                    </div>
                  </template>
                  <ModelSelect
                    v-model="applicationForm.model_id"
                    :placeholder="$t('views.application.form.aiModel.placeholder')"
                    :options="modelOptions"
                    @change="model_change"
                    @submitModel="getSelectModel"
                    showFooter
                    :model-type="'LLM'"
                  ></ModelSelect>
                </el-form-item>
                <el-form-item :label="$t('views.application.form.roleSettings.label')">
                  <MdEditorMagnify
                    :title="$t('views.application.form.roleSettings.label')"
                    v-model="applicationForm.model_setting.system"
                    style="height: 120px"
                    @submitDialog="submitSystemDialog"
                    :placeholder="$t('views.application.form.roleSettings.placeholder')"
                  />
                </el-form-item>
                <el-form-item
                  prop="model_setting.no_references_prompt"
                  :rules="{
                    required: applicationForm.model_id,
                    message: $t('views.application.form.prompt.requiredMessage'),
                    trigger: 'blur',
                  }"
                >
                  <template #label>
                    <div class="flex align-center">
                      <span class="mr-4"
                        >{{
                          $t('views.application.form.prompt.label') +
                          $t('views.application.form.prompt.noReferences')
                        }}
                      </span>
                      <el-tooltip
                        effect="dark"
                        :content="
                          $t('views.application.form.prompt.noReferencesTooltip', {
                            question: '{question}',
                          })
                        "
                        placement="right"
                        popper-class="max-w-350"
                      >
                        <AppIcon iconName="app-warning" class="app-warning-icon"></AppIcon>
                      </el-tooltip>
                      <span class="color-danger ml-4" v-if="applicationForm.model_id">*</span>
                    </div>
                  </template>

                  <MdEditorMagnify
                    :title="
                      $t('views.application.form.prompt.label') +
                      $t('views.application.form.prompt.noReferences')
                    "
                    v-model="applicationForm.model_setting.no_references_prompt"
                    style="height: 120px"
                    @submitDialog="submitNoReferencesPromptDialog"
                    placeholder="{question}"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('views.application.form.historyRecord.label')"
                  @click.prevent
                >
                  <el-input-number
                    v-model="applicationForm.dialogue_number"
                    :min="0"
                    :value-on-clear="0"
                    controls-position="right"
                    class="w-full"
                    :step="1"
                    :step-strictly="true"
                  />
                </el-form-item>
                <el-form-item label="$t('views.application.form.relatedKnowledgeBase')">
                  <template #label>
                    <div class="flex-between">
                      <span>{{ $t('views.application.form.relatedKnowledge.label') }}</span>
                      <div>
                        <el-button type="primary" link @click="openParamSettingDialog">
                          <AppIcon iconName="app-operation" class="mr-4"></AppIcon>
                          {{ $t('common.paramSetting') }}
                        </el-button>
                        <el-button type="primary" link @click="openKnowledgeDialog">
                          <el-icon class="mr-4">
                            <Plus />
                          </el-icon>
                          {{ $t('common.add') }}
                        </el-button>
                      </div>
                    </div>
                  </template>
                  <div class="w-full">
                    <el-text type="info" v-if="applicationForm.knowledge_id_list?.length === 0"
                      >{{ $t('views.application.form.relatedKnowledge.placeholder') }}
                    </el-text>
                    <el-row :gutter="12" v-else>
                      <el-col
                        :xs="24"
                        :sm="24"
                        :md="24"
                        :lg="12"
                        :xl="12"
                        class="mb-8"
                        v-for="(item, index) in applicationForm.knowledge_id_list"
                        :key="index"
                      >
                        <el-card class="relate-knowledge-card border-r-6" shadow="never">
                          <div class="flex-between">
                            <div class="flex align-center" style="width: 80%">
                              <KnowledgeIcon
                                :type="relatedObject(knowledgeList, item, 'id')?.type"
                                class="mr-12"
                              />

                              <span
                                class="ellipsis cursor"
                                :title="relatedObject(knowledgeList, item, 'id')?.name"
                              >
                                {{ relatedObject(knowledgeList, item, 'id')?.name }}</span
                              >
                            </div>
                            <el-button text @click="removeKnowledge(item)">
                              <el-icon>
                                <Close />
                              </el-icon>
                            </el-button>
                          </div>
                        </el-card>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
                <el-form-item
                  :label="$t('views.application.form.prompt.label')"
                  prop="model_setting.prompt"
                  :rules="{
                    required: applicationForm.model_id,
                    message: $t('views.application.form.prompt.requiredMessage'),
                    trigger: 'blur',
                  }"
                >
                  <template #label>
                    <div class="flex align-center">
                      <span class="mr-4">
                        {{ $t('views.application.form.prompt.label') }}
                        {{ $t('views.application.form.prompt.references') }}
                      </span>
                      <el-tooltip
                        effect="dark"
                        :content="
                          $t('views.application.form.prompt.referencesTooltip', {
                            data: '{data}',
                            question: '{question}',
                          })
                        "
                        popper-class="max-w-350"
                        placement="right"
                      >
                        <AppIcon iconName="app-warning" class="app-warning-icon"></AppIcon>
                      </el-tooltip>
                      <span class="color-danger ml-4" v-if="applicationForm.model_id">*</span>
                    </div>
                  </template>

                  <MdEditorMagnify
                    :title="
                      $t('views.application.form.prompt.label') +
                      $t('views.application.form.prompt.references')
                    "
                    v-model="applicationForm.model_setting.prompt"
                    style="height: 150px"
                    @submitDialog="submitPromptDialog"
                    :placeholder="defaultPrompt"
                  />
                </el-form-item>
                <el-form-item :label="$t('views.application.form.prologue')">
                  <MdEditorMagnify
                    :title="$t('views.application.form.prologue')"
                    v-model="applicationForm.prologue"
                    style="height: 150px"
                    @submitDialog="submitPrologueDialog"
                  />
                </el-form-item>
                <el-form-item @click.prevent>
                  <template #label>
                    <div class="flex-between">
                      <span class="mr-4">
                        {{ $t('views.application.form.reasoningContent.label') }}
                      </span>

                      <div class="flex">
                        <el-button type="primary" link @click="openReasoningParamSettingDialog">
                          <el-icon><Setting /></el-icon>
                        </el-button>
                        <el-switch
                          class="ml-8"
                          size="small"
                          v-model="applicationForm.model_setting.reasoning_content_enable"
                          @change="sttModelEnableChange"
                        />
                      </div>
                    </div>
                  </template>
                </el-form-item>

                <el-form-item
                  prop="stt_model_id"
                  :rules="{
                    required: applicationForm.stt_model_enable,
                    message: $t('views.application.form.voiceInput.requiredMessage'),
                    trigger: 'change',
                  }"
                >
                  <template #label>
                    <div class="flex-between">
                      <span class="mr-4">
                        {{ $t('views.application.form.voiceInput.label') }}
                        <span class="color-danger" v-if="applicationForm.stt_model_enable">*</span>
                      </span>

                      <div class="flex">
                        <el-checkbox
                          v-if="applicationForm.stt_model_enable"
                          v-model="applicationForm.stt_autosend"
                          >{{ $t('views.application.form.voiceInput.autoSend') }}</el-checkbox
                        >
                        <el-switch
                          class="ml-8"
                          size="small"
                          v-model="applicationForm.stt_model_enable"
                          @change="sttModelEnableChange"
                        />
                      </div>
                    </div>
                  </template>
                  <ModelSelect
                    v-show="applicationForm.stt_model_enable"
                    v-model="applicationForm.stt_model_id"
                    :placeholder="$t('views.application.form.voiceInput.placeholder')"
                    :options="sttModelOptions"
                    :model-type="'STT'"
                  ></ModelSelect>
                </el-form-item>
                <el-form-item
                  prop="tts_model_id"
                  :rules="{
                    required:
                      applicationForm.tts_type === 'TTS' && applicationForm.tts_model_enable,
                    message: $t('views.application.form.voicePlay.requiredMessage'),
                    trigger: 'change',
                  }"
                >
                  <template #label>
                    <div class="flex-between">
                      <span class="mr-4"
                        >{{ $t('views.application.form.voicePlay.label') }}
                        <span
                          class="color-danger"
                          v-if="
                            applicationForm.tts_type === 'TTS' && applicationForm.tts_model_enable
                          "
                          >*</span
                        >
                      </span>
                      <div class="flex">
                        <el-checkbox
                          v-if="applicationForm.tts_model_enable"
                          v-model="applicationForm.tts_autoplay"
                          >{{ $t('views.application.form.voicePlay.autoPlay') }}</el-checkbox
                        >
                        <el-switch
                          class="ml-8"
                          size="small"
                          v-model="applicationForm.tts_model_enable"
                          @change="ttsModelEnableChange"
                        />
                      </div>
                    </div>
                  </template>
                  <div class="w-full">
                    <el-radio-group
                      v-model="applicationForm.tts_type"
                      v-show="applicationForm.tts_model_enable"
                      class="mb-8"
                    >
                      <el-radio value="BROWSER">{{
                        $t('views.application.form.voicePlay.browser')
                      }}</el-radio>
                      <el-radio value="TTS">{{
                        $t('views.application.form.voicePlay.tts')
                      }}</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="flex-between w-full">
                    <ModelSelect
                      v-if="applicationForm.tts_type === 'TTS' && applicationForm.tts_model_enable"
                      v-model="applicationForm.tts_model_id"
                      :placeholder="$t('views.application.form.voicePlay.placeholder')"
                      :options="ttsModelOptions"
                      @change="ttsModelChange()"
                      :model-type="'TTS'"
                    ></ModelSelect>

                    <el-button
                      v-if="applicationForm.tts_type === 'TTS'"
                      @click="openTTSParamSettingDialog"
                      :disabled="!applicationForm.tts_model_id"
                      class="ml-8"
                    >
                      <el-icon><Operation /></el-icon>
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="14" class="p-24 border-l">
          <h4 class="title-decoration-1 mb-16">
            {{ $t('views.application.appTest') }}
          </h4>
          <div class="dialog-bg">
            <div class="scrollbar-height">
              <AiChat :applicationDetails="applicationForm" :type="'debug-ai-chat'"></AiChat>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <AIModeParamSettingDialog ref="AIModeParamSettingDialogRef" @refresh="refreshForm" />
    <TTSModeParamSettingDialog ref="TTSModeParamSettingDialogRef" @refresh="refreshTTSForm" />
    <ParamSettingDialog ref="ParamSettingDialogRef" @refresh="refreshParam" />
    <AddKnowledgeDialog
      ref="AddKnowledgeDialogRef"
      @addData="addKnowledge"
      :data="knowledgeList"
      :loading="knowledgeLoading"
    />
    <ReasoningParamSettingDialog
      ref="ReasoningParamSettingDialogRef"
      @refresh="submitReasoningDialog"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { groupBy } from 'lodash'
import AIModeParamSettingDialog from './component/AIModeParamSettingDialog.vue'
import ParamSettingDialog from './component/ParamSettingDialog.vue'
import AddKnowledgeDialog from './component/AddKnowledgeDialog.vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { ApplicationFormType } from '@/api/type/application'
import { relatedObject } from '@/utils/array'
import { MsgSuccess, MsgWarning } from '@/utils/message'
import useStore from '@/stores'
import { t } from '@/locales'
import TTSModeParamSettingDialog from './component/TTSModeParamSettingDialog.vue'
import ReasoningParamSettingDialog from './component/ReasoningParamSettingDialog.vue'
import permissionMap from '@/permission'
import ApplicationAPI from '@/api/application/application'
import { EditionConst } from '@/utils/permission/data'
import { hasPermission } from '@/utils/permission/index'
const route = useRoute()

const apiType = computed<'workspace'>(() => {
  return 'workspace'
})
const permissionPrecise = computed(() => {
  return permissionMap['application'][apiType.value]
})

const { knowledge, model, application } = useStore()

const {
  params: { id },
} = route as any
// @ts-ignore
const defaultPrompt = t('views.application.form.prompt.defaultPrompt', {
  data: '{data}',
  question: '{question}',
})

const optimizationPrompt =
  t('views.application.dialog.defaultPrompt1', {
    question: '{question}',
  }) +
  '<data></data>' +
  t('views.application.dialog.defaultPrompt2')

const AIModeParamSettingDialogRef = ref<InstanceType<typeof AIModeParamSettingDialog>>()
const ReasoningParamSettingDialogRef = ref<InstanceType<typeof ReasoningParamSettingDialog>>()
const TTSModeParamSettingDialogRef = ref<InstanceType<typeof TTSModeParamSettingDialog>>()
const ParamSettingDialogRef = ref<InstanceType<typeof ParamSettingDialog>>()

const applicationFormRef = ref<FormInstance>()
const AddKnowledgeDialogRef = ref()

const loading = ref(false)
const knowledgeLoading = ref(false)

const applicationForm = ref<ApplicationFormType>({
  name: '',
  desc: '',
  model_id: '',
  dialogue_number: 1,
  prologue: t('views.application.form.defaultPrologue'),
  knowledge_id_list: [],
  knowledge_setting: {
    top_n: 3,
    similarity: 0.6,
    max_paragraph_char_number: 5000,
    search_mode: 'embedding',
    no_references_setting: {
      status: 'ai_questioning',
      value: '{question}',
    },
  },
  model_setting: {
    prompt: defaultPrompt,
    system: t('views.application.form.roleSettings.placeholder'),
    no_references_prompt: '{question}',
    reasoning_content_enable: false,
  },
  model_params_setting: {},
  problem_optimization: false,
  problem_optimization_prompt: optimizationPrompt,
  stt_model_id: '',
  tts_model_id: '',
  stt_model_enable: false,
  tts_model_enable: false,
  tts_type: 'BROWSER',
  type: 'SIMPLE',
})
const themeDetail = ref({})

const rules = reactive<FormRules<ApplicationFormType>>({
  name: [
    {
      required: true,
      message: t('views.application.form.appName.placeholder'),
      trigger: 'blur',
    },
  ],
})
const modelOptions = ref<any>(null)
const knowledgeList = ref<Array<any>>([])
const sttModelOptions = ref<any>(null)
const ttsModelOptions = ref<any>(null)

function submitPrologueDialog(val: string) {
  applicationForm.value.prologue = val
}
function submitPromptDialog(val: string) {
  applicationForm.value.model_setting.prompt = val
}
function submitNoReferencesPromptDialog(val: string) {
  applicationForm.value.model_setting.no_references_prompt = val
}
function submitSystemDialog(val: string) {
  applicationForm.value.model_setting.system = val
}
function submitReasoningDialog(val: any) {
  applicationForm.value.model_setting = {
    ...applicationForm.value.model_setting,
    ...val,
  }
}
const publish = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate().then(() => {
    return ApplicationAPI.putApplication(id, applicationForm.value, loading)
      .then((ok) => {
        return ApplicationAPI.publish(id, {}, loading)
      })
      .then((res) => {
        MsgSuccess(t('views.application.tip.publishSuccess'))
      })
  })
}
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      application.asyncPutApplication(id, applicationForm.value, loading).then((res) => {
        MsgSuccess(t('common.saveSuccess'))
      })
    }
  })
}
const model_change = (model_id?: string) => {
  applicationForm.value.model_id = model_id
  if (model_id) {
    AIModeParamSettingDialogRef.value?.reset_default(model_id, id)
  } else {
    refreshForm({})
  }
}
const openAIParamSettingDialog = () => {
  if (applicationForm.value.model_id) {
    AIModeParamSettingDialogRef.value?.open(
      applicationForm.value.model_id,
      id,
      applicationForm.value.model_params_setting,
    )
  }
}

const openReasoningParamSettingDialog = () => {
  ReasoningParamSettingDialogRef.value?.open(applicationForm.value.model_setting)
}

const openTTSParamSettingDialog = () => {
  if (applicationForm.value.tts_model_id) {
    TTSModeParamSettingDialogRef.value?.open(
      applicationForm.value.tts_model_id,
      id,
      applicationForm.value.tts_model_params_setting,
    )
  }
}

const openParamSettingDialog = () => {
  ParamSettingDialogRef.value?.open(applicationForm.value)
}

function refreshParam(data: any) {
  applicationForm.value = { ...applicationForm.value, ...data }
}

function refreshForm(data: any) {
  applicationForm.value.model_params_setting = data
}

function refreshTTSForm(data: any) {
  applicationForm.value.tts_model_params_setting = data
}

function removeKnowledge(id: any) {
  if (applicationForm.value.knowledge_id_list) {
    applicationForm.value.knowledge_id_list.splice(
      applicationForm.value.knowledge_id_list.indexOf(id),
      1,
    )
  }
}

function addKnowledge(val: Array<any>) {
  knowledgeList.value = val
  applicationForm.value.knowledge_id_list = val.map((item) => item.id)
}

function openKnowledgeDialog() {
  AddKnowledgeDialogRef.value.open(applicationForm.value.knowledge_id_list)
}

function getDetail() {
  application.asyncGetApplicationDetail(id, loading).then((res: any) => {
    applicationForm.value = res.data
    applicationForm.value.model_id = res.data.model
    applicationForm.value.stt_model_id = res.data.stt_model
    applicationForm.value.tts_model_id = res.data.tts_model
    applicationForm.value.tts_type = res.data.tts_type
    knowledgeList.value = res.data.knowledge_list
    applicationForm.value.model_setting.no_references_prompt =
      res.data.model_setting.no_references_prompt || '{question}'

    // 企业版和专业版
    if (hasPermission([EditionConst.IS_EE, EditionConst.IS_PE], 'OR')) {
      ApplicationAPI.getApplicationSetting(id).then((ok) => {
        applicationForm.value = { ...applicationForm.value, ...ok.data }
      })
    }
  })
}

function getSelectModel() {
  loading.value = true
  model
    .asyncGetSelectModel({ model_type: 'LLM' })
    .then((res: any) => {
      modelOptions.value = groupBy(res?.data, 'provider')
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function getSTTModel() {
  loading.value = true
  model
    .asyncGetSelectModel({ model_type: 'STT' })
    .then((res: any) => {
      sttModelOptions.value = groupBy(res?.data, 'provider')
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function getTTSModel() {
  loading.value = true
  model
    .asyncGetSelectModel({ model_type: 'TTS' })
    .then((res: any) => {
      ttsModelOptions.value = groupBy(res?.data, 'provider')
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

function ttsModelChange() {
  if (applicationForm.value.tts_model_id) {
    TTSModeParamSettingDialogRef.value?.reset_default(applicationForm.value.tts_model_id, id)
  } else {
    refreshTTSForm({})
  }
}

function ttsModelEnableChange() {
  if (!applicationForm.value.tts_model_enable) {
    applicationForm.value.tts_model_id = undefined
    applicationForm.value.tts_type = 'BROWSER'
  }
}

function sttModelEnableChange() {
  if (!applicationForm.value.stt_model_enable) {
    applicationForm.value.stt_model_id = undefined
  }
}

onMounted(() => {
  getSelectModel()
  getDetail()
  getSTTModel()
  getTTSModel()
})
</script>
<style lang="scss" scoped>
.application-setting {
  .relate-knowledge-card {
    color: var(--app-text-color);
  }

  .dialog-bg {
    border-radius: 8px;
    background: var(--dialog-bg-gradient-color);
    overflow: hidden;
    box-sizing: border-box;
  }

  .scrollbar-height-left {
    height: calc(var(--app-main-height) - 64px);
  }

  .scrollbar-height {
    padding-top: 16px;
    height: calc(var(--app-main-height) - 96px);
  }
}

.prologue-md-editor {
  height: 150px;
}

:deep(.el-form-item__label) {
  display: block;
}
</style>
