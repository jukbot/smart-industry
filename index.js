import { prpl } from "prpl-server";
import { express } from "express";

const app = express();
const rootDir = "/";

// This serves static files from the specified directory
app.use(express.static(__dirname + "/build"));

app.get("/api/launch", (req, res, next) => res.send("boom"));

app.get(
  "/*",
  prpl.makeHandler(".", {
    builds: [
      {
        name: "modern",
        browserCapabilities: ["es2015", "push"],
        basePath: true
      },
      { name: "fallback" }
    ],
    forwardErrors: true
  })
);

app.get("/images/*", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=31536000");
  next();
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).sendFile("src/view-404.html", { root: rootDir });
  } else {
    next();
  }
});

// Tell the app to listen for requests on port 8080
const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
  c4swd;
});
