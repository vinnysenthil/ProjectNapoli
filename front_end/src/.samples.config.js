export default {
  oidc: {
    clientId: "0oaklp0zjhYuM9yoE0h7",
    issuer: "https://dev-489491.oktapreview.com/oauth2/default",
    redirectUri: "http://localhost:8080/implicit/callback", /// ,aybe 8080???
    scope: "openid profile email"
  },
  resourceServer: {
    messagesUrl: "http://localhost:172/api/messages"
  }
};
