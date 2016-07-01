import connect from 'express';
import { File, transformFile } from 'babel-core';
import { readFile, readFileSync } from 'fs';

const app = connect();
const babel_opts = JSON.parse(readFileSync('package.json')).babel;

babel_opts.plugins = ['babel-plugin-transform-es2015-modules-systemjs'];

app.get(/.*\.js$/, (req, res, next) => {
  const path = `public${req.path}`;
  
  if (req.query['original'] !== undefined) {
    return readFile(path, next);
  }
  
  transformFile(path, babel_opts, (err, result) => {
    if (err) {
      return next(err);
    }
    
    res.end(result.code);
  });
});

app.use(connect.static("public"));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
