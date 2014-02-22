var https = require('https');
var express = require('express');
var fs = require('fs');
var keyFilePath = 'ssl/server.key';
var certFilePath = 'ssl/server.crt';
var app = express();
var cors = require('cors');

var port = 443 // standard https port
var options = {
  key: fs.readFileSync(keyFilePath, 'utf8'),
  cert: fs.readFileSync(certFilePath, 'utf8')
}
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(cors());
});

app.get('/', function(req, res) {
  res.send("Hello world!");
});

var server = https.createServer(options, app);
server.listen(port, function () {
  console.log('Secure server listening on port: ' + server.address().port + ' ' + server.address().address)
})
