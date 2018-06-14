/* eslint-env node */
module.exports = {
  staticFileGlobs: [
    'index.html',
    'manifest.json',
    'images/**/*',
    'data/**/*',
    'bower_components/webcomponentsjs/*.js'
  ],
  runtimeCaching: [
    {
      urlPattern: /https:\/\/fonts\.googleapis\.com.*/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'google-font-cache',
        },
      },
    },
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
      urlPattern: /\/images\/.*/,
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
