/* eslint-env node */
module.exports = {
  staticFileGlobs: [
    'manifest.json',
    'images/**/*',
    'data/**/*',
    'bower_components/webcomponentsjs/webcomponents-loader.js',
    'bower_components/app-storage/app-indexeddb-mirror/*.js',
  ],
  runtimeCaching: [
    {
      urlPattern: /\/bower_components\/webcomponentsjs\/.*.js/,
      handler: 'fastest',
      options: {
        cache: {
          name: 'webcomponentsjs-polyfills-cache',
        },
      },
    },
    {
      urlPattern: /\/data\/images\/.*/,
      handler: 'cacheFirst',
      options: {
        cache: {
          maxEntries: 100,
          name: 'images-cache',
        },
      },
    },
    {
      urlPattern: /\/data\/.*json/,
      handler: 'networkFirst',
      options: {
        cache: {
          maxEntries: 100,
          name: 'data-cache',
        },
      },
    },
  ],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],
};
