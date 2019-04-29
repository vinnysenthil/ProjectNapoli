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
    })
  });

} catch {
  module.exports = Object.freeze({
    DB: Object.freeze({
      HOST:             process.env.DB_HOST,
      PORT:             process.env.DB_PORT,
      USERNAME:         process.env.DB_USERNAME,
      PASSWORD:         process.env.DB_PASSWORD
    })
  });
}
