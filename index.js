const prpl = require("prpl-server");
const express = require("express");

const app = express();

app.get("/api/launch", (req, res, next) => res.send("boom"));

app.get(
  "/*",
  prpl.makeHandler(".", {
    builds: [
      { name: "build/default", browserCapabilities: ["es2015", "push"], basePath: true }
    ]
  })
);

app.get("/images/*", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000");
  next();
});

// Tell the app to listen for requests on port 8080
app.listen(8080, function() {
  console.info("Application is listening on port 8080!");
});
