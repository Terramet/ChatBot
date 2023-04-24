var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var https = require('https');
var routes = require('./router');
const fs = require('fs');

app.get('/', function(req, res){
   res.render('watson_chat');
});

app.set('view engine', 'pug');
app.set('views', './views');

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static('./public'));
app.use('/', routes);

https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: '26485'
}, app).listen(3000);
