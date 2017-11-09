const prpl = require("prpl-server");
const express = require("express");

const app = express();

app.get("/api/launch", (req, res, next) => res.send("boom"));

app.get(
  "/*",
  prpl.makeHandler(".", {
    builds: [
      { name: "modern", browserCapabilities: ["es2015", "push"] },
      { name: "fallback" }
    ]
  })
);

app.get("/images/*", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000");
  next();
});

// Tell the app to listen for requests on port 8080
app.listen(8080, function() {
  console.info("Example app listening on port 8080!");
});
