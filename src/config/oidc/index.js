export const oidcSettings = {
  authority: 'http://localhost:12001',
  clientId: 'personalcenterclient',
  redirectUri: 'http://localhost:12101/sign-in-callback',
  responseType: 'code',
  scope: 'openid profile IdentityServerApi communityservice',

  // post_logout_redirect_uri: 'http://localhost:18101/sign-out-callback',
  silentRedirectUri: 'http://localhost:12101/oidc-silent-renew', // 设置静默续订回调
  // automaticSilentRenew: true, // 如果为true，oidc-client将在令牌即将到期时尝试更新令牌
  // automaticSilentSignin: true // 如果为true，则vuex-oidc将尝试以静默方式在公共路线上登录未经身份验证的用户。默认为true
}
