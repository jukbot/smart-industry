module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
    '/images/*',
    '/data/*',
    '/js/*',
    '/src/*',
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],
  runtimeCaching: [
    {
      urlPattern: /\/images\//,
      handler: 'cacheFirst',
      options: {
        cache: {
          maxEntries: 100,
          name: 'images-cache'
        }
      }
    },
    {
      urlPattern: /\/data\/.*json/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 10,
          name: 'localize-cache'
        }
      }
    }
  ]
};
