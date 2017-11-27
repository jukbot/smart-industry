const functions = require('firebase-functions');
const capabilities = require('browser-capabilities');
const rp = require('request-promise');
const request = require('request');

/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

exports.serve = functions.https.onRequest((req, res) => {
  const baseUrl = 'https://' + functions.config().firebase.authDomain;

  // Fetch the hosted polymer.json to read the build configuration
  return rp({
    uri: baseUrl + '/polymer.json',
    json: true,
  }).then((config) => {
    // Find a build that matches the client browser capabilities
    const client = capabilities.browserCapabilities(req.headers['user-agent']);
    console.log(client);
    let builds = config.builds.filter((build) => {
      if (!build.browserCapabilities) {
        return true;
      }
      for (const c of build.browserCapabilities) {
        if (!client.has(c)) {
          return false;
        }
      }
      return true;
    });
    console.log(builds);
    // Sort the builds so that the one with most requirements,
    // which is assumed to be "best" build, is served first.
    builds.sort((build1, build2) => {
      const size1 = (build1.browserCapabilities || []).length;
      const size2 = (build2.browserCapabilities || []).length;
      return size2 - size1;
    });

    // Fetch the appropriate index.html for the chosen build
    // request(baseUrl + '/' + builds[0].name + '/index.html')
    request(baseUrl + '/index.html')
      .on('response', (res) => {
        // Tell Firebase Hosting to cache the result based on user-agent
        // Unfortunately this is the only way so far to make sure each
        // user gets served the appropriate version
        res.headers['Vary'] = 'user-agent';
      })
      .pipe(res);
  });
});
