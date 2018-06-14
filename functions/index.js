const functions = require("firebase-functions");
const prpl = require("prpl-server");
const express = require("express");
const rendertron = require("rendertron-middleware");

const app = express();

app.use(
  rendertron.makeMiddleware({
    proxyUrl: "https://render-tron.appspot.com/render",
    injectShadyDom: true
  })
);

app.get("/*", prpl.makeHandler("./build", require("./build/polymer.json")));

exports.app = functions.https.onRequest(app);
