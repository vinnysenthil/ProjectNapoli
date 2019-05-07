/**
 * Authenticates requests with Okta access tokens.
 * 
 * @module auth
 * @description If an access token is authenticated, a user may access backend routes.
 * 
 */
const RuntimeVars = require('../services/RuntimeVars');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer:     RuntimeVars.OKTA.ISSUER,
  clientId:   RuntimeVars.OKTA.CLIENTID,
  assertClaims: {
    aud: "api://default",
    cid: RuntimeVars.OKTA.CLIENTID
  }
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}