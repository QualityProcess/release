//Install express server
const express = require('express');
const app = express();
var https = require('https');
const path = require('path');

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

app.use(forceSSL());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});



var httpsServer = https.createServer(app);

// Start the app by listening on the default Heroku port
httpsServer.listen(process.env.PORT || 8080);
