/* eslint-env node */
module.exports = {
  staticFileGlobs: [
    'src/**/*',
    'manifest.json',
    'images/**/*',
    'data/**/*'
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    },
    {
      urlPattern: /https:\/\/fonts\.googleapis\.com.*/,
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'google-font-cache'
        }
      }
    },
    {
      urlPattern: /\/images\/.*/,
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
      handler: 'networkFirst',
      options: {
        cache: {
          maxEntries: 100,
          name: 'data-cache'
        }
      }
    }
  ],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/]
}
