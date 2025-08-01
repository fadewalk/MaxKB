import {Permission, Role, Edition} from '@/utils/permission/type'
// class Operate(Enum):
//     """
//      一个权限组的操作权限
//     """
//     READ = 'READ'
//     EDIT = "READ+EDIT"
//     CREATE = "READ+CREATE"
//     DELETE = "READ+DELETE"
//     """
//     使用权限
//     """
//     USE = "USE"
//     IMPORT = "READ+IMPORT"
//     EXPORT = "READ+EXPORT"  # 导入导出
//     DEBUG = "READ+DEBUG"  # 调试
//     SYNC = "READ+SYNC"  # 同步
//     GENERATE = "READ+GENERATE"  # 生成
//     ADD_MEMBER = "READ+ADD_MEMBER"  # 添加成员
//     REMOVE_MEMBER = "READ+REMOVE_MEMBER"  # 添加成员
//     VECTOR = "READ+VECTOR"  # 向量化
//     MIGRATE = "READ+MIGRATE"  # 迁移
//     RELATE = "READ+RELATE"  # 关联
//     USER_GROUP = "READ+USER_GROUP"  # 用户组
//     ANNOTATION = "READ+ANNOTATION"  # 标注
//     CLEAR_POLICY = "READ+CLEAR_POLICY"
const PermissionConst = {

  APPLICATION: new Permission('APPLICATION'),
  KNOWLEDGE: new Permission('KNOWLEDGE'),
  TOOL: new Permission('TOOL'),
  MODEL: new Permission('MODEL'),

  USER_READ: new Permission('USER_MANAGEMENT:READ'),
  USER_CREATE: new Permission('USER_MANAGEMENT:READ+CREATE'),
  USER_EDIT: new Permission('USER_MANAGEMENT:READ+EDIT'),
  USER_DELETE: new Permission('USER_MANAGEMENT:READ+DELETE'),

  WORKSPACE_USER_RESOURCE_PERMISSION_READ: new Permission(
    'WORKSPACE_USER_RESOURCE_PERMISSION:READ',
  ),
  WORKSPACE_USER_RESOURCE_PERMISSION_EDIT: new Permission(
    'WORKSPACE_USER_RESOURCE_PERMISSION:READ+EDIT',
  ),

  WORKSPACE_ROLE_READ: new Permission('WORKSPACE_ROLE:READ'),
  WORKSPACE_ROLE_ADD_MEMBER: new Permission('WORKSPACE_ROLE:READ+ADD_MEMBER'),
  WORKSPACE_ROLE_REMOVE_MEMBER: new Permission('WORKSPACE_ROLE:READ+REMOVE_MEMBER'),

  WORKSPACE_READ: new Permission('WORKSPACE:READ'),
  WORKSPACE_CREATE: new Permission('WORKSPACE:READ+CREATE'),
  WORKSPACE_EDIT: new Permission('WORKSPACE:READ+EDIT'),
  WORKSPACE_DELETE: new Permission('WORKSPACE:READ+DELETE'),
  WORKSPACE_ADD_MEMBER: new Permission('WORKSPACE:READ+ADD_MEMBER'),
  WORKSPACE_REMOVE_MEMBER: new Permission('WORKSPACE:READ+REMOVE_MEMBER'),

  WORKSPACE_WORKSPACE_READ: new Permission('WORKSPACE_WORKSPACE:READ'),
  WORKSPACE_WORKSPACE_ADD_MEMBER: new Permission('WORKSPACE_WORKSPACE:READ+ADD_MEMBER'),
  WORKSPACE_WORKSPACE_REMOVE_MEMBER: new Permission('WORKSPACE_WORKSPACE:READ+REMOVE_MEMBER'),

  WORKSPACE_CHAT_USER_READ: new Permission('WORKSPACE_CHAT_USER:READ'),
  WORKSPACE_CHAT_USER_CREATE: new Permission('WORKSPACE_CHAT_USER:READ+CREATE'),
  WORKSPACE_CHAT_USER_EDIT: new Permission('WORKSPACE_CHAT_USER:READ+EDIT'),
  WORKSPACE_CHAT_USER_DELETE: new Permission('WORKSPACE_CHAT_USER:READ+DELETE'),
  WORKSPACE_CHAT_USER_GROUP: new Permission('WORKSPACE_CHAT_USER:READ+USER_GROUP'),

  WORKSPACE_USER_GROUP_READ: new Permission('WORKSPACE_USER_GROUP:READ'),
  WORKSPACE_USER_GROUP_CREATE: new Permission('WORKSPACE_USER_GROUP:READ+CREATE'),
  WORKSPACE_USER_GROUP_EDIT: new Permission('WORKSPACE_USER_GROUP:READ+EDIT'),
  WORKSPACE_USER_GROUP_DELETE: new Permission('WORKSPACE_USER_GROUP:READ+DELETE'),
  WORKSPACE_USER_GROUP_ADD_MEMBER: new Permission('WORKSPACE_USER_GROUP:READ+ADD_MEMBER'),
  WORKSPACE_USER_GROUP_REMOVE_MEMBER: new Permission('WORKSPACE_USER_GROUP:READ+REMOVE_MEMBER'),

  CHAT_USER_AUTH_READ: new Permission('CHAT_USER_AUTH:READ'),
  CHAT_USER_AUTH_EDIT: new Permission('CHAT_USER_AUTH:READ+EDIT'),

  CHAT_USER_READ: new Permission('CHAT_USER:READ'),
  CHAT_USER_CREATE: new Permission('CHAT_USER:READ+CREATE'),
  CHAT_USER_SYNC: new Permission('CHAT_USER:READ+SYNC'),
  CHAT_USER_EDIT: new Permission('CHAT_USER:READ+EDIT'),
  CHAT_USER_DELETE: new Permission('CHAT_USER:READ+DELETE'),
  CHAT_USER_GROUP: new Permission('CHAT_USER:READ+USER_GROUP'),

  USER_GROUP_READ: new Permission('USER_GROUP:READ'),
  USER_GROUP_CREATE: new Permission('USER_GROUP:READ+CREATE'),
  USER_GROUP_EDIT: new Permission('USER_GROUP:READ+EDIT'),
  USER_GROUP_DELETE: new Permission('USER_GROUP:READ+DELETE'),
  USER_GROUP_ADD_MEMBER: new Permission('USER_GROUP:READ+ADD_MEMBER'),
  USER_GROUP_REMOVE_MEMBER: new Permission('USER_GROUP:READ+REMOVE_MEMBER'),

  ROLE_READ: new Permission('ROLE:READ'),
  ROLE_CREATE: new Permission('ROLE:READ+CREATE'),
  ROLE_EDIT: new Permission('ROLE:READ+EDIT'),
  ROLE_DELETE: new Permission('ROLE:READ+DELETE'),
  ROLE_ADD_MEMBER: new Permission('ROLE:READ+ADD_MEMBER'),
  ROLE_REMOVE_MEMBER: new Permission('ROLE:READ+REMOVE_MEMBER'),

  KNOWLEDGE_READ: new Permission('KNOWLEDGE:READ'),
  KNOWLEDGE_CREATE: new Permission('KNOWLEDGE:READ+CREATE'),
  KNOWLEDGE_SYNC: new Permission('KNOWLEDGE:READ+SYNC'),
  KNOWLEDGE_VECTOR: new Permission('KNOWLEDGE:READ+VECTOR'),
  KNOWLEDGE_EDIT: new Permission('KNOWLEDGE:READ+EDIT'),
  KNOWLEDGE_EXPORT: new Permission('KNOWLEDGE:READ+EXPORT'),
  KNOWLEDGE_DELETE: new Permission('KNOWLEDGE:READ+DELETE'),
  KNOWLEDGE_GENERATE: new Permission('KNOWLEDGE:READ+GENERATE'),

  KNOWLEDGE_DOCUMENT_READ: new Permission('KNOWLEDGE_DOCUMENT:READ'),
  KNOWLEDGE_DOCUMENT_CREATE: new Permission('KNOWLEDGE_DOCUMENT:READ+CREATE'),
  KNOWLEDGE_DOCUMENT_DELETE: new Permission('KNOWLEDGE_DOCUMENT:READ+DELETE'),
  KNOWLEDGE_DOCUMENT_EDIT: new Permission('KNOWLEDGE_DOCUMENT:READ+EDIT'),
  KNOWLEDGE_DOCUMENT_SYNC: new Permission('KNOWLEDGE_DOCUMENT:READ+SYNC'),
  KNOWLEDGE_DOCUMENT_MIGRATE: new Permission('KNOWLEDGE_DOCUMENT:READ+MIGRATE'),
  KNOWLEDGE_DOCUMENT_VECTOR: new Permission('KNOWLEDGE_DOCUMENT:READ+VECTOR'),
  KNOWLEDGE_DOCUMENT_GENERATE: new Permission('KNOWLEDGE_DOCUMENT:READ+GENERATE'),
  KNOWLEDGE_DOCUMENT_EXPORT: new Permission('KNOWLEDGE_DOCUMENT:READ+EXPORT'),
  KNOWLEDGE_DOCUMENT_DOWNLOAD_SOURCE_FILE: new Permission('KNOWLEDGE_DOCUMENT:READ+DOWNLOAD'),

  KNOWLEDGE_PROBLEM_READ: new Permission('KNOWLEDGE_PROBLEM:READ'),
  KNOWLEDGE_PROBLEM_CREATE: new Permission('KNOWLEDGE_PROBLEM:READ+CREATE'),
  KNOWLEDGE_PROBLEM_EDIT: new Permission('KNOWLEDGE_PROBLEM:READ+EDIT'),
  KNOWLEDGE_PROBLEM_RELATE: new Permission('KNOWLEDGE_PROBLEM:READ+RELATE'),
  KNOWLEDGE_PROBLEM_DELETE: new Permission('KNOWLEDGE_PROBLEM:READ+DELETE'),

  MODEL_READ: new Permission('MODEL:READ'),
  MODEL_CREATE: new Permission('MODEL:READ+CREATE'),
  MODEL_EDIT: new Permission('MODEL:READ+EDIT'),
  MODEL_DELETE: new Permission('MODEL:READ+DELETE'),

  APPLICATION_READ: new Permission('APPLICATION:READ'),
  APPLICATION_EXPORT: new Permission('APPLICATION:READ+EXPORT'),
  APPLICATION_DELETE: new Permission('APPLICATION:READ+DELETE'),
  APPLICATION_EDIT: new Permission('APPLICATION:READ+EDIT'),
  APPLICATION_CREATE: new Permission('APPLICATION:READ+CREATE'),
  APPLICATION_IMPORT: new Permission('APPLICATION:READ+IMPORT'),
  APPLICATION_SETTING: new Permission('APPLICATION:READ+SETTING'),
  APPLICATION_DEBUG: new Permission('APPLICATION:READ+DEBUG'),
  APPLICATION_TO_CHAT: new Permission('APPLICATION:READ+TO_CHAT'),

  APPLICATION_OVERVIEW_READ: new Permission('APPLICATION_OVERVIEW:READ'),
  APPLICATION_OVERVIEW_EMBEDDED: new Permission('APPLICATION_OVERVIEW:READ+EMBED'),
  APPLICATION_OVERVIEW_ACCESS: new Permission('APPLICATION_OVERVIEW:READ+ACCESS'),
  APPLICATION_OVERVIEW_DISPLAY: new Permission('APPLICATION_OVERVIEW:READ+DISPLAY'),
  APPLICATION_OVERVIEW_API_KEY: new Permission('APPLICATION_OVERVIEW:READ+API_KEY'),
  APPLICATION_OVERVIEW_PUBLIC: new Permission('APPLICATION_OVERVIEW:READ+PUBLIC_ACCESS'),

  APPLICATION_CHAT_LOG_READ: new Permission('APPLICATION_CHAT_LOG:READ'),
  APPLICATION_CHAT_LOG_ANNOTATION: new Permission('APPLICATION_CHAT_LOG:READ+ANNOTATION'),
  APPLICATION_CHAT_LOG_EXPORT: new Permission('APPLICATION_CHAT_LOG:READ+EXPORT'),
  APPLICATION_CHAT_LOG_CLEAR_POLICY: new Permission('APPLICATION_CHAT_LOG:READ+CLEAR_POLICY'),
  APPLICATION_CHAT_LOG_ADD_KNOWLEDGE: new Permission('APPLICATION_CHAT_LOG:READ+ADD_KNOWLEDGE'),

  APPLICATION_ACCESS_READ: new Permission('APPLICATION_ACCESS:READ'),
  APPLICATION_ACCESS_EDIT: new Permission('APPLICATION_ACCESS:READ+EDIT'),

  APPLICATION_CHAT_USER_READ: new Permission('APPLICATION_CHAT_USER:READ'),
  APPLICATION_CHAT_USER_EDIT: new Permission('APPLICATION_CHAT_USER:READ+EDIT'),

  KNOWLEDGE_CHAT_USER_READ: new Permission('KNOWLEDGE_CHAT_USER:READ'),
  KNOWLEDGE_CHAT_USER_EDIT: new Permission('KNOWLEDGE_CHAT_USER:READ+EDIT'),

  SHARED_TOOL_READ: new Permission('SYSTEM_TOOL:READ'),
  SHARED_TOOL_CREATE: new Permission('SYSTEM_TOOL:READ+CREATE'),
  SHARED_TOOL_EDIT: new Permission('SYSTEM_TOOL:READ+EDIT'),
  SHARED_TOOL_DELETE: new Permission('SYSTEM_TOOL:READ+DELETE'),
  SHARED_TOOL_IMPORT: new Permission('SYSTEM_TOOL:READ+IMPORT'),
  SHARED_TOOL_EXPORT: new Permission('SYSTEM_TOOL:READ+EXPORT'),
  SHARED_TOOL_DEBUG: new Permission('SYSTEM_TOOL:READ+DEBUG'),

  SHARED_MODEL_READ: new Permission('SYSTEM_MODEL:READ'),
  SHARED_MODEL_CREATE: new Permission('SYSTEM_MODEL:READ+CREATE'),
  SHARED_MODEL_EDIT: new Permission('SYSTEM_MODEL:READ+EDIT'),
  SHARED_MODEL_DELETE: new Permission('SYSTEM_MODEL:READ+DELETE'),

  SHARED_KNOWLEDGE_READ: new Permission('SYSTEM_KNOWLEDGE:READ'),
  SHARED_KNOWLEDGE_CREATE: new Permission('SYSTEM_KNOWLEDGE:READ+CREATE'),
  SHARED_KNOWLEDGE_EDIT: new Permission('SYSTEM_KNOWLEDGE:READ+EDIT'),
  SHARED_KNOWLEDGE_SYNC: new Permission('SYSTEM_KNOWLEDGE:READ+SYNC'),
  SHARED_KNOWLEDGE_VECTOR: new Permission('SYSTEM_KNOWLEDGE:READ+VECTOR'),
  SHARED_KNOWLEDGE_EXPORT: new Permission('SYSTEM_KNOWLEDGE:READ+EXPORT'),
  SHARED_KNOWLEDGE_GENERATE: new Permission('SYSTEM_KNOWLEDGE:READ+GENERATE'),
  SHARED_KNOWLEDGE_DELETE: new Permission('SYSTEM_KNOWLEDGE:READ+DELETE'),

  SHARED_KNOWLEDGE_DOCUMENT_READ: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ'),
  SHARED_KNOWLEDGE_DOCUMENT_CREATE: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+CREATE'),
  SHARED_KNOWLEDGE_DOCUMENT_EDIT: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+EDIT'),
  SHARED_KNOWLEDGE_DOCUMENT_DELETE: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+DELETE'),
  SHARED_KNOWLEDGE_DOCUMENT_SYNC: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+SYNC'),
  SHARED_KNOWLEDGE_DOCUMENT_VECTOR: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+VECTOR'),
  SHARED_KNOWLEDGE_DOCUMENT_GENERATE: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+GENERATE'),
  SHARED_KNOWLEDGE_DOCUMENT_MIGRATE: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+MIGRATE'),
  SHARED_KNOWLEDGE_DOCUMENT_EXPORT: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+EXPORT'),
  SHARED_KNOWLEDGE_DOCUMENT_DOWNLOAD_SOURCE_FILE: new Permission('SYSTEM_KNOWLEDGE_DOCUMENT:READ+DOWNLOAD'),

  SHARED_KNOWLEDGE_PROBLEM_READ: new Permission('SYSTEM_KNOWLEDGE_PROBLEM:READ'),
  SHARED_KNOWLEDGE_PROBLEM_CREATE: new Permission('SYSTEM_KNOWLEDGE_PROBLEM:READ+CREATE'),
  SHARED_KNOWLEDGE_PROBLEM_EDIT: new Permission('SYSTEM_KNOWLEDGE_PROBLEM:READ+EDIT'),
  SHARED_KNOWLEDGE_PROBLEM_DELETE: new Permission('SYSTEM_KNOWLEDGE_PROBLEM:READ+DELETE'),

  SHARED_KNOWLEDGE_HIT_TEST_READ: new Permission('SYSTEM_KNOWLEDGE_HIT_TEST:READ'),
  KNOWLEDGE_HIT_TEST_READ: new Permission('KNOWLEDGE_HIT_TEST:READ'),

  SHARED_KNOWLEDGE_CHAT_USER_READ: new Permission('SYSTEM_KNOWLEDGE_CHAT_USER:READ'),
  SHARED_KNOWLEDGE_CHAT_USER_EDIT: new Permission('SYSTEM_KNOWLEDGE_CHAT_USER:READ+EDIT'),

  TOOL_CREATE: new Permission('TOOL:READ+CREATE'),
  TOOL_EDIT: new Permission('TOOL:READ+EDIT'),
  TOOL_READ: new Permission('TOOL:READ'),
  TOOL_DELETE: new Permission('TOOL:READ+DELETE'),
  TOOL_DEBUG: new Permission('TOOL:READ+DEBUG'),
  TOOL_IMPORT: new Permission('TOOL:READ+IMPORT'),
  TOOL_EXPORT: new Permission('TOOL:READ+EXPORT'),

  RESOURCE_TOOL_CREATE: new Permission('SYSTEM_RESOURCE_TOOL:READ+CREATE'),
  RESOURCE_TOOL_EDIT: new Permission('SYSTEM_RESOURCE_TOOL:READ+EDIT'),
  RESOURCE_TOOL_READ: new Permission('SYSTEM_RESOURCE_TOOL:READ'),
  RESOURCE_TOOL_DELETE: new Permission('SYSTEM_RESOURCE_TOOL:READ+DELETE'),
  RESOURCE_TOOL_DEBUG: new Permission('SYSTEM_RESOURCE_TOOL:READ+DEBUG'),
  RESOURCE_TOOL_IMPORT: new Permission('SYSTEM_RESOURCE_TOOL:READ+IMPORT'),
  RESOURCE_TOOL_EXPORT: new Permission('SYSTEM_RESOURCE_TOOL:READ+EXPORT'),

  RESOURCE_KNOWLEDGE_READ: new Permission('SYSTEM_RESOURCE_KNOWLEDGE:READ'),
  RESOURCE_KNOWLEDGE_CREATE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE:READ+CREATE'),
  RESOURCE_KNOWLEDGE_SYNC: new Permission('SYSTEM_RESOURCE_KNOWLEDGE:READ+SYNC'),
  RESOURCE_KNOWLEDGE_VECTOR: new Permission('SYSTEM_RESOURCE_KNOWLEDGE:READ+VECTOR'),
  RESOURCE_KNOWLEDGE_EDIT: new Permission('SYSTEM_RESOURCE_KNOWLEDGE:READ+EDIT'),
  RESOURCE_KNOWLEDGE_EXPORT: new Permission('SYSTEM_RESOURCE_KNOWLEDGE:READ+EXPORT'),
  RESOURCE_KNOWLEDGE_DELETE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE:READ+DELETE'),
  RESOURCE_KNOWLEDGE_GENERATE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE:READ+GENERATE'),

  RESOURCE_KNOWLEDGE_DOCUMENT_READ: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ'),
  RESOURCE_KNOWLEDGE_DOCUMENT_CREATE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+CREATE'),
  RESOURCE_KNOWLEDGE_DOCUMENT_DELETE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+DELETE'),
  RESOURCE_KNOWLEDGE_DOCUMENT_EDIT: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+EDIT'),
  RESOURCE_KNOWLEDGE_DOCUMENT_SYNC: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+SYNC'),
  RESOURCE_KNOWLEDGE_DOCUMENT_MIGRATE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+MIGRATE'),
  RESOURCE_KNOWLEDGE_DOCUMENT_VECTOR: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+VECTOR'),
  RESOURCE_KNOWLEDGE_DOCUMENT_GENERATE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+GENERATE'),
  RESOURCE_KNOWLEDGE_DOCUMENT_EXPORT: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+EXPORT'),
  RESOURCE_KNOWLEDGE_DOCUMENT_DOWNLOAD_SOURCE_FILE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_DOCUMENT:READ+DOWNLOAD'),

  RESOURCE_KNOWLEDGE_PROBLEM_READ: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_PROBLEM:READ'),
  RESOURCE_KNOWLEDGE_PROBLEM_CREATE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_PROBLEM:READ+CREATE'),
  RESOURCE_KNOWLEDGE_PROBLEM_EDIT: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_PROBLEM:READ+EDIT'),
  RESOURCE_KNOWLEDGE_PROBLEM_RELATE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_PROBLEM:READ+RELATE'),
  RESOURCE_KNOWLEDGE_PROBLEM_DELETE: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_PROBLEM:READ+DELETE'),

  RESOURCE_KNOWLEDGE_CHAT_USER_READ: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_CHAT_USER:READ'),
  RESOURCE_KNOWLEDGE_CHAT_USER_EDIT: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_CHAT_USER:READ+EDIT'),
  RESOURCE_KNOWLEDGE_HIT_TEST: new Permission('SYSTEM_RESOURCE_KNOWLEDGE_HIT_TEST:READ'),

  RESOURCE_APPLICATION_READ: new Permission('SYSTEM_RESOURCE_APPLICATION:READ'),
  RESOURCE_APPLICATION_EDIT: new Permission('SYSTEM_RESOURCE_APPLICATION:READ+EDIT'),
  RESOURCE_APPLICATION_DEBUG: new Permission('SYSTEM_RESOURCE_APPLICATION:READ+DEBUG'),
  RESOURCE_APPLICATION_IMPORT: new Permission('SYSTEM_RESOURCE_APPLICATION:READ+IMPORT'),
  RESOURCE_APPLICATION_EXPORT: new Permission('SYSTEM_RESOURCE_APPLICATION:READ+EXPORT'),
  RESOURCE_APPLICATION_DELETE: new Permission('SYSTEM_RESOURCE_APPLICATION:READ+DELETE'),

  RESOURCE_APPLICATION_OVERVIEW_READ: new Permission('SYSTEM_RESOURCE_APPLICATION_OVERVIEW:READ'),
  RESOURCE_APPLICATION_OVERVIEW_EMBED: new Permission('SYSTEM_RESOURCE_APPLICATION_OVERVIEW:READ+EMBED'),
  RESOURCE_APPLICATION_OVERVIEW_ACCESS: new Permission('SYSTEM_RESOURCE_APPLICATION_OVERVIEW:READ+ACCESS'),
  RESOURCE_APPLICATION_OVERVIEW_DISPLAY: new Permission('SYSTEM_RESOURCE_APPLICATION_OVERVIEW:READ+DISPLAY'),
  RESOURCE_APPLICATION_OVERVIEW_API_KEY: new Permission('SYSTEM_RESOURCE_APPLICATION_OVERVIEW:READ+API_KEY'),
  RESOURCE_APPLICATION_OVERVIEW_PUBLIC: new Permission('SYSTEM_RESOURCE_APPLICATION_OVERVIEW:READ+PUBLIC_ACCESS'),

  RESOURCE_APPLICATION_CHAT_LOG_READ: new Permission('SYSTEM_RESOURCE_APPLICATION_CHAT_LOG:READ'),
  RESOURCE_APPLICATION_CHAT_LOG_ANNOTATION: new Permission('SYSTEM_RESOURCE_APPLICATION_CHAT_LOG:READ+ANNOTATION'),
  RESOURCE_APPLICATION_CHAT_LOG_EXPORT: new Permission('SYSTEM_RESOURCE_APPLICATION_CHAT_LOG:READ+EXPORT'),
  RESOURCE_APPLICATION_CHAT_LOG_CLEAR_POLICY: new Permission('SYSTEM_RESOURCE_APPLICATION_CHAT_LOG:READ+CLEAR_POLICY'),
  RESOURCE_APPLICATION_CHAT_LOG_ADD_KNOWLEDGE: new Permission('SYSTEM_RESOURCE_APPLICATION_CHAT_LOG:READ+ADD_KNOWLEDGE'),

  RESOURCE_APPLICATION_ACCESS_READ: new Permission('SYSTEM_RESOURCE_APPLICATION_ACCESS:READ'),
  RESOURCE_APPLICATION_ACCESS_EDIT: new Permission('SYSTEM_RESOURCE_APPLICATION_ACCESS:READ+EDIT'),

  RESOURCE_APPLICATION_CHAT_USER_READ: new Permission('SYSTEM_RESOURCE_APPLICATION_CHAT_USER:READ'),
  RESOURCE_APPLICATION_CHAT_USER_EDIT: new Permission('SYSTEM_RESOURCE_APPLICATION_CHAT_USER:READ+EDIT'),

  RESOURCE_MODEL_READ: new Permission('SYSTEM_RESOURCE_MODEL:READ'),
  RESOURCE_MODEL_EDIT: new Permission('SYSTEM_RESOURCE_MODEL:READ+EDIT'),
  RESOURCE_MODEL_DELETE: new Permission('SYSTEM_RESOURCE_MODEL:READ+DELETE'),
 
  APPEARANCE_SETTINGS_READ: new Permission('APPEARANCE_SETTINGS:READ'),
  APPEARANCE_SETTINGS_EDIT: new Permission('APPEARANCE_SETTINGS:READ+EDIT'),

  LOGIN_AUTH_READ: new Permission('LOGIN_AUTH:READ'),
  LOGIN_AUTH_EDIT: new Permission('LOGIN_AUTH:READ+EDIT'),

  EMAIL_SETTING_READ: new Permission('EMAIL_SETTING:READ'),
  EMAIL_SETTING_EDIT: new Permission('EMAIL_SETTING:READ+EDIT'),

  OPERATION_LOG_READ: new Permission('OPERATION_LOG:READ'),
  OPERATION_LOG_EXPORT: new Permission('OPERATION_LOG:READ+EXPORT'),

  ABOUT_READ: new Permission('OTHER:READ'),
  SWITCH_LANGUAGE: new Permission('OTHER:READ+EDIT'),
  CHANGE_PASSWORD: new Permission('OTHER:READ+CREATE'),
  SYSTEM_API_KEY_EDIT: new Permission('OTHER:READ+DELETE'),

  APPLICATION_WORKSPACE_USER_RESOURCE_PERMISSION_READ: new Permission(
    'APPLICATION_WORKSPACE_USER_RESOURCE_PERMISSION:READ',
  ),
  KNOWLEDGE_WORKSPACE_USER_RESOURCE_PERMISSION_READ: new Permission(
    'KNOWLEDGE_WORKSPACE_USER_RESOURCE_PERMISSION:READ',
  ),
  TOOL_WORKSPACE_USER_RESOURCE_PERMISSION_READ: new Permission(
    'TOOL_WORKSPACE_USER_RESOURCE_PERMISSION:READ',
  ),
  MODEL_WORKSPACE_USER_RESOURCE_PERMISSION_READ: new Permission(
    'MODEL_WORKSPACE_USER_RESOURCE_PERMISSION:READ',
  ),
  APPLICATION_WORKSPACE_USER_RESOURCE_PERMISSION_EDIT: new Permission(
    'APPLICATION_WORKSPACE_USER_RESOURCE_PERMISSION:READ+EDIT',
  ),
  KNOWLEDGE_WORKSPACE_USER_RESOURCE_PERMISSION_EDIT: new Permission(
    'KNOWLEDGE_WORKSPACE_USER_RESOURCE_PERMISSION:READ+EDIT',
  ),
  TOOL_WORKSPACE_USER_RESOURCE_PERMISSION_EDIT: new Permission(
    'TOOL_WORKSPACE_USER_RESOURCE_PERMISSION:READ+EDIT',
  ),
  MODEL_WORKSPACE_USER_RESOURCE_PERMISSION_EDIT: new Permission(
    'MODEL_WORKSPACE_USER_RESOURCE_PERMISSION:READ+EDIT',
  ),
}
const RoleConst = {
  ADMIN: new Role('ADMIN'),
  WORKSPACE_MANAGE: new Role('WORKSPACE_MANAGE'),
  USER: new Role('USER'),
  EXTENDS_ADMIN: new Role('EXTENDS_ADMIN'),
  EXTENDS_WORKSPACE_MANAGE: new Role('EXTENDS_WORKSPACE_MANAGE'),
  EXTENDS_USER: new Role('EXTENDS_USER'),
}
const EditionConst = {
  IS_PE: new Edition('X-PACK-PE'),
  IS_EE: new Edition('X-PACK-EE'),
  IS_CE: new Edition('X-PACK-CE'),
}
export {PermissionConst, RoleConst, EditionConst}
