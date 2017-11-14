import { prpl } from 'prpl-server'
import { express } from 'express'

const app = express();
const rootDir = '/';

app.get('/api/launch', (req, res, next) => res.send('boom'));

app.get(
  '/*',
  prpl.makeHandler('.', {
    entrypoint: 'index.html',
    builds: [
      {name: 'modern', browserCapabilities: ['es2015', 'push'], basePath: true},
    ],
  })
);

app.get('/images/*', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  next();
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).sendFile('src/view-404.html', {root: rootDir});
  } else {
    next();
  }
});

// Tell the app to listen for requests on port 8080
app.listen(8080, function() {
  Console.log('Application is listening on port 8080!');
});
