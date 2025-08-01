export default {
  title: 'System',
  subTitle: 'Syetem Settings',
  test: 'Test Connection',
  testSuccess: 'Successful',
  testFailed: 'Test connection failed',
  password: 'Password',
  authentication: {
    title: 'Login Authentication',
    ldap: {
      title: 'LDAP',
      address: 'LDAP Address',
      serverPlaceholder: 'Please enter LDAP address',
      bindDN: 'Bind DN',
      bindDNPlaceholder: 'Please enter Bind DN',
      ou: 'User OU',
      ouPlaceholder: 'Please enter user OU',
      ldap_filter: 'User Filter',
      ldap_filterPlaceholder: 'Please enter user filter',
      ldap_mapping: 'LDAP Attribute Mapping',
      ldap_mappingPlaceholder: 'Please enter LDAP attribute mapping',
      enableAuthentication: 'Enable LDAP Authentication',
    },
    cas: {
      title: 'CAS',
      ldpUri: 'ldpUri',
      ldpUriPlaceholder: 'Please enter ldpUri',
      validateUrl: 'Validation Address',
      validateUrlPlaceholder: 'Please enter validation address',
      redirectUrl: 'Callback Address',
      redirectUrlPlaceholder: 'Please enter callback address',
      enableAuthentication: 'Enable CAS Authentication',
    },
    oidc: {
      title: 'OIDC',
      authEndpoint: 'Auth Endpoint',
      authEndpointPlaceholder: 'Please enter auth endpoint',
      tokenEndpoint: 'Token Endpoint',
      tokenEndpointPlaceholder: 'Please enter token endpoint',
      userInfoEndpoint: 'User Information Endpoint',
      userInfoEndpointPlaceholder: 'Please enter user information endpoint',
      clientId: 'Client ID',
      clientIdPlaceholder: 'Please enter client ID',
      scopePlaceholder: 'Please enter scope',
      clientSecret: 'Client Secret',
      clientSecretPlaceholder: 'Please enter client secret',
      logoutEndpoint: 'Logout Endpoint',
      logoutEndpointPlaceholder: 'Please enter logout endpoint',
      redirectUrl: 'Redirect URL',
      redirectUrlPlaceholder: 'Please enter redirect URL',
      enableAuthentication: 'Enable OIDC Authentication',
    },

    oauth2: {
      title: 'OAuth2',
      authEndpoint: 'Auth Endpoint',
      authEndpointPlaceholder: 'Please enter auth endpoint',
      tokenEndpoint: 'Token Endpoint',
      tokenEndpointPlaceholder: 'Please enter token endpoint',
      userInfoEndpoint: 'User Information Endpoint',
      userInfoEndpointPlaceholder: 'Please enter user information endpoint',
      scope: 'Scope',
      scopePlaceholder: 'Please enter scope',
      clientId: 'Client ID',
      clientIdPlaceholder: 'Please enter client ID',
      clientSecret: 'Client Secret',
      clientSecretPlaceholder: 'Please enter client secret',
      redirectUrl: 'Redirect URL',
      redirectUrlPlaceholder: 'Please enter redirect URL',
      filedMapping: 'Field Mapping',
      filedMappingPlaceholder: 'Please enter field mapping',
      enableAuthentication: 'Enable OAuth2 Authentication',
    },
    scanTheQRCode: {
      title: 'Scan the QR code',
      wecom: 'WeCom',
      dingtalk: 'DingTalk',
      lark: 'Lark',
      effective: 'Effective',
      alreadyTurnedOn: 'Turned On',
      notEnabled: 'Not Enabled',
      validate: 'Validate',
      validateSuccess: 'Successful',
      validateFailed: 'Validation failed',
      validateFailedTip: 'Please fill in all required fields and ensure the format is correct',
      appKeyPlaceholder: 'Please enter APP key',
      appSecretPlaceholder: 'Please enter APP secret',
      corpIdPlaceholder: 'Please enter corp ID',
      agentIdPlaceholder: 'Please enter agent ID',
      callbackWarning: 'Please enter a valid URL address',
      larkQrCode: 'Lark Scan Code Login',
      dingtalkQrCode: 'DingTalk Scan Code Login',
      setting: ' Setting',
      access: 'Access',
    },
  },
  email: {
    title: 'Email Settings',
    smtpHost: 'SMTP Host',
    smtpHostPlaceholder: 'Please enter SMTP host',
    smtpPort: 'SMTP Port',
    smtpPortPlaceholder: 'Please enter SMTP port',
    smtpUser: 'SMTP User',
    smtpUserPlaceholder: 'Please enter SMTP user',
    sendEmail: "Sender's Email",
    sendEmailPlaceholder: "Please enter the sender's email",
    smtpPassword: 'SMTP Password',
    smtpPasswordPlaceholder: 'Please enter SMTP password',
    enableSSL: 'Enable SSL (if the SMTP port is 465, you usually need to enable SSL)',
    enableTLS: 'Enable TLS (if the SMTP port is 587, you usually need to enable TLS)',
  },
  resourceAuthorization: {
    title: 'Resource Authorization',
    member: 'Member',
    permissionSetting: 'Permission Setting',
    setting: {
      management: 'management',
      check: 'check',
      authorization: 'authorization',
    },
    priority: {
      label: 'Resource permission priority',
      role: 'Role',
    },
  },
  resource_management: {
    label: 'Resource Management',
    type: 'Type',
    management: 'management',
  },
}
