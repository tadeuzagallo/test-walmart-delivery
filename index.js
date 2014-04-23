var express = require('express'),
    app = express();

app.get('/', function (req, res) {
  res.write('Hello, World!');
  res.end();
});

app.listen(8080);
