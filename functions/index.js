const express = require('express');
const prpl = require('prpl-server');
const functions = require('firebase-functions');
const rendertron = require('rendertron-middleware');
const config = require('./build/polymer.json');

const app = express();

app.use(rendertron.makeMiddleware({
  proxyUrl: 'https://render-tron.appspot.com/render',
  injectShadyDom: true,
}));

app.get('*', prpl.makeHandler('./build', config));

exports.app = functions.https.onRequest(app);