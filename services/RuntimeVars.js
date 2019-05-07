/**
 * Defines all secret runtime variables.
 * @module RuntimeVars
 */

var yaml = require('js-yaml');
const fs = require('fs');
const manifestLocation = 'build/manifest/manifest.yaml';

// If safeloading fails, it will throw an exception. No need to catch it here,
// since we shouldn't attempt to run the microservice anyway.
try {
  const manifest = yaml.safeLoad(fs.readFileSync(manifestLocation, 'utf8'));
  
  module.exports = Object.freeze({
    DB: Object.freeze({
      HOST:             manifest.db.host,
      PORT:             manifest.db.port,
      USERNAME:         manifest.db.username,
      PASSWORD:         manifest.db.password
    }),
    OKTA: Object.freeze({
      ISSUER:             manifest.okta.issuer,
      CLIENTID:           manifest.okta.clientid,
      TOKEN:              manifest.okta.token,
      ORG:                manifest.okta.org
    }),
    TWITTER: Object.freeze({
      CONSUMER_KEY:         manifest.twitter.consumerkey,
      CONSUMER_SECRET:      manifest.twitter.consumersecret,
      ACCESS_TOKEN_KEY:     manifest.twitter.accesstokenkey,
      ACCESS_TOKEN_SECRET:  manifest.twitter.accesstokensecret
    })
  });

} catch {
  module.exports = Object.freeze({
    DB: Object.freeze({
      HOST:             process.env.DB_HOST,
      PORT:             process.env.DB_PORT,
      USERNAME:         process.env.DB_USERNAME,
      PASSWORD:         process.env.DB_PASSWORD
    }),
    OKTA: Object.freeze({
      ISSUER:           process.env.OKTA_ISSUER,
      CLIENTID:         process.env.OKTA_CLIENTID,
      TOKEN:            process.env.OKTA_TOKEN,
      ORG:              process.env.OKTA_ORG
    }),
    TWITTER: Object.freeze({
      CONSUMER_KEY:         process.env.CONSUMER_KEY,
      CONSUMER_SECRET:      process.env.CONSUMER_SECRET,
      ACCESS_TOKEN_KEY:     process.env.ACCESS_TOKEN_KEY,
      ACCESS_TOKEN_SECRET:  process.env.ACCESS_TOKEN_SECRET
    })
  });
}
