<template>
  <el-form
    ref="paragraphFormRef"
    :model="form"
    label-position="top"
    require-asterisk-position="right"
    :rules="rules"
    @submit.prevent
  >
    <el-form-item :label="$t('views.paragraph.form.paragraphTitle.label')">
      <el-input
        v-if="isEdit"
        v-model="form.title"
        :placeholder="$t('views.paragraph.form.paragraphTitle.placeholder')"
        maxlength="256"
        show-word-limit
      >
      </el-input>
      <span class="lighter" v-else>{{ form.title || '-' }}</span>
    </el-form-item>
    <el-form-item :label="$t('views.paragraph.form.content.label')" prop="content">
      <MdEditor
        v-if="isEdit"
        v-model="form.content"
        :placeholder="$t('views.paragraph.form.content.placeholder')"
        :maxLength="100000"
        :preview="false"
        :toolbars="toolbars"
        style="height: 300px"
        @onUploadImg="onUploadImg"
        :footers="footers"
      >
        <template #defFooters>
          <span style="margin-left: -6px">/ 100000</span>
        </template>
      </MdEditor>
      <MdPreview
        v-else
        ref="editorRef"
        editorId="preview-only"
        :modelValue="form.content"
        class="maxkb-md"
      />
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, reactive, onUnmounted, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import imageApi from '@/api/image'
import { t } from '@/locales'
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  isEdit: Boolean,
  knowledgeId: String
})

const toolbars = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  '=',
  'pageFullscreen',
  'preview',
  'htmlPreview'
] as any[]

const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch']

const editorRef = ref()

const form = ref<any>({
  title: '',
  content: ''
})

const rules = reactive<FormRules>({
  content: [
    { required: true, message: t('views.paragraph.form.content.requiredMessage1'), trigger: 'blur' },
    { max: 100000, message: t('views.paragraph.form.content.requiredMessage2'), trigger: 'blur' }
  ]
})

const paragraphFormRef = ref<FormInstance>()

watch(
  () => props.data,
  (value) => {
    if (value && JSON.stringify(value) !== '{}') {
      form.value.title = value.title
      form.value.content = value.content
    }
  },
  {
    immediate: true
  }
)
watch(
  () => props.isEdit,
  (value) => {
    if (!value) {
      paragraphFormRef.value?.clearValidate()
    }
  },
  {
    immediate: true
  }
)

/*
  表单校验
*/
function validate() {
  if (!paragraphFormRef.value) return
  return paragraphFormRef.value.validate((valid: any) => {
    return valid
  })
}

const onUploadImg = async (files: any, callback: any) => {
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('source_id', props.knowledgeId as string)
        fd.append('source_type', 'KNOWLEDGE')

        imageApi
          .postImage(fd)
          .then((res: any) => {
            rev(res)
          })
          .catch((error) => rej(error))
      })
    })
  )

  callback(res.map((item) => item.data))
}

onUnmounted(() => {
  form.value = {
    title: '',
    content: ''
  }
})

defineExpose({
  validate,
  form
})
</script>
<style scoped lang="scss"></style>
