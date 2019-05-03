/**
 * Authenticates requests with Okta access tokens.
 * 
 * @module auth
 * @description If an access token is authenticated, a user corresponding to the
 * token is fetched from RDS (or created if the user does not exist yet). The fetched
 * user instance is then stored in the session as `req.session.user`
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
 * Promise Wrapper function to req.session.regenerate
 * @function regenerateSessionPromise
 * @param {Request} req 
 * @returns {Promise}
 */
function regenerateSessionPromise(req) {
  return new Promise((resolve, reject) => {
    req.session.regenerate(function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * Auhthenticates a request against an access token.
 * @function this
 * @param req
 * @param res
 * 
 * @param next
 */
module.exports = function(req, res, next) {

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */

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