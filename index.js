const prpl = require("prpl-server");
const express = require("express");

const app = express();

app.get("/api/launch", (req, res, next) => res.send("boom"));

app.get(
  "/*",
  prpl.makeHandler(".", {
    entrypoint: "index.html",
    builds: [
      { name: "build", browserCapabilities: ["es2015", "push"], basePath: true }
    ]
  })
);

app.get("/images/*", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000");
  next();
});

app.get('/*', prpl.makeHandler('.', {
  builds: [ ... ],
  forwardErrors: true
}));

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).sendFile('src/view-404.html', {root: rootDir});
  } else {
    next();
  }
});

// Tell the app to listen for requests on port 8080
app.listen(8080, function() {
  console.info("Application is listening on port 8080!");
});
