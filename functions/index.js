const rendertron = require('rendertron-middleware')
const app = require('express')()
const compression = require('compression')
const prpl = require('prpl-server')
const functions = require('firebase-functions')
const config = require('./build/polymer.json')

const rendertronMiddleware = rendertron.makeMiddleware({
  proxyUrl: 'https://render-tron.appspot.com/render',
  injectShadyDom: true
})

app.use(compression())
app.use((req, res, next) => {
  req.headers['host'] = 'yellotalk-adminapp.firebaseapp.com'
  return rendertronMiddleware(req, res, next)
})

app.get('/*', prpl.makeHandler('./build', config))

exports.app = functions.https.onRequest(app)
