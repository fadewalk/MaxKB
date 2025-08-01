<template>
  <div class="authentication-setting__main main-calc-height">
    <el-scrollbar>
      <div class="form-container p-24" v-loading="loading">
        <el-form
          ref="authFormRef"
          :rules="rules"
          :model="form"
          label-position="top"
          require-asterisk-position="right"
        >
          <el-form-item
            :label="$t('views.system.authentication.cas.ldpUri')"
            prop="config.ldpUri"
          >
            <el-input
              v-model="form.config.ldpUri"
              :placeholder="$t('views.system.authentication.cas.ldpUriPlaceholder')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('views.system.authentication.cas.validateUrl')"
            prop="config.validateUrl"
          >
            <el-input
              v-model="form.config.validateUrl"
              :placeholder="$t('views.system.authentication.cas.validateUrlPlaceholder')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('views.system.authentication.cas.redirectUrl')"
            prop="config.redirectUrl"
          >
            <el-input
              v-model="form.config.redirectUrl"
              :placeholder="$t('views.system.authentication.cas.redirectUrlPlaceholder')"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.is_active"
            >{{ $t('views.system.authentication.cas.enableAuthentication') }}
            </el-checkbox>
          </el-form-item>
        </el-form>

        <div class="text-right">
          <el-button @click="submit(authFormRef)" type="primary" :disabled="loading"
                     v-hasPermission="
                      new ComplexPermission(
                        [RoleConst.ADMIN],
                        [PermissionConst.LOGIN_AUTH_EDIT],
                        [],'OR',)"
          >
            {{ $t('common.save') }}
          </el-button>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref, watch, onMounted} from 'vue'
import authApi from '@/api/system-settings/auth-setting'
import type {FormInstance, FormRules} from 'element-plus'
import {t} from '@/locales'
import {MsgSuccess} from '@/utils/message'
import {PermissionConst, RoleConst} from '@/utils/permission/data'
import {ComplexPermission} from '@/utils/permission/type'

const form = ref<any>({
  id: '',
  auth_type: 'CAS',
  config: {
    ldpUri: '',
    validateUrl: '',
    redirectUrl: ''
  },
  is_active: true
})

const authFormRef = ref()

const loading = ref(false)

const rules = reactive<FormRules<any>>({
  'config.ldpUri': [
    {
      required: true,
      message: t('views.system.authentication.cas.ldpUriPlaceholder'),
      trigger: 'blur'
    }
  ],
  'config.validateUrl': [
    {
      required: true,
      message: t('views.system.authentication.cas.validateUrlPlaceholder'),
      trigger: 'blur'
    }
  ],
  'config.redirectUrl': [
    {
      required: true,
      message: t('views.system.authentication.cas.redirectUrlPlaceholder'),
      trigger: 'blur'
    }
  ]
})

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      authApi.putAuthSetting(form.value.auth_type, form.value, loading).then((res) => {
        MsgSuccess(t('common.saveSuccess'))
      })
    }
  })
}

function getDetail() {
  authApi.getAuthSetting(form.value.auth_type, loading).then((res: any) => {
    if (res.data && JSON.stringify(res.data) !== '{}') {
      if (!res.data.config.validateUrl) {
        res.data.config.validateUrl = res.data.config.ldpUri
      }
      form.value = res.data
      if (!form.value.config.redirectUrl) {
        form.value.config.redirectUrl = window.location.origin + window.MaxKB.prefix + 'api/cas'
      }
    }
  })
}

onMounted(() => {
  getDetail()
})
</script>
<style lang="scss" scoped></style>
