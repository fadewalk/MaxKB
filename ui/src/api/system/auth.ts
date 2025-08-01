import {Result} from '@/request/Result'
import {get, post, put} from '@/request/index'
import {type Ref} from 'vue'

const prefix = '/system/auth'
/**
 * 获取认证设置
 */
const getAuthSetting: (auth_type: string, loading?: Ref<boolean>) => Promise<Result<any>> = (auth_type, loading) => {
  return get(`${prefix}/${auth_type}/detail`, undefined, loading)
}

/**
 * ldap连接测试
 */
const postAuthSetting: (data: any, loading?: Ref<boolean>) => Promise<Result<any>> = (
  data,
  loading
) => {
  return post(`${prefix}/connection`, data, undefined, loading)
}

/**
 * 修改邮箱设置
 */
const putAuthSetting: (auth_type: string, data: any, loading?: Ref<boolean>) => Promise<Result<any>> = (
  auth_type,
  data,
  loading
) => {
  return put(`${prefix}/${auth_type}/info`, data, undefined, loading)
}

export default {
  getAuthSetting,
  postAuthSetting,
  putAuthSetting
}
