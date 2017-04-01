module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/images/*',
    '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/],
};
