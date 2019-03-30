// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Getting the current time when accessing the 'api/timestamp/' route
app.get('/api/timestamp', function(req, res){
  res.json({'unix': Date.now(), 'utc': new Date().toUTCString()})
});

app.get('/api/timestamp/:time_str', function(req, res){
  let date_str = req.params.time_str
  if (new Date(date_str) !== "Invalid Date" && !isNaN(new Date(date_str))){
    res.json({'unix': new Date(date_str).getTime() , 'utc': new Date(date_str).toUTCString()})
  }
  else {
    res.json({"error": "Invalid Date"})
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});