//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


app.post('/api/login', function (req, res) {
  console.log(req);
  res.send({'token': 'my-fake-token'});
});
