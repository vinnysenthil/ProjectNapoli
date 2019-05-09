export default {
  oidc: {
    clientId: "0oaklp0zjhYuM9yoE0h7",
    issuer: "https://dev-489491.oktapreview.com/oauth2/default",
    redirectUri: `${window.location.origin}/implicit/callback`, /// ,aybe 8080???
    scope: "openid profile email"
  },
  resourceServer: {
    messagesUrl: `${window.location.origin}/api/messages`
  }
};
