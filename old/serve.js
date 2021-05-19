const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const express = require('express');//, cookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser')

var cors = require('cors')
require('dotenv').config()

const app = express();

var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors())
app.use(cookieParser());

let request =  require('request');
request = request.defaults({jar: true});
const j = request.jar();

// const cookie = request.cookie('B1SESSION=004cb67e-b0cc-11eb-8000-20677ce77e84;HttpOnly; CompanyDB=TESTAPBW; HttpOnly; ROUTEID=.node1; path=/b1s');
// const url = 'http://www.google.com';


// START =============================================================================================================
const host = process.env.API_HOST
// app.use(express.static(__dirname + '/public'));
// or =================================================================================================================
app.all('/', (req, res)=>{
  res.sendFile(path.join(__dirname + '/public', 'index.html'));
});


app.all('/login', (req, res)=>{
    //res.send('he world');

    let options = {
        method: "POST",
        json: true,
        uri : `${host}/Login`,
        body: {
            "UserName": "manager",
            "Password": "test",
            "CompanyDB": "TESTAPBW"
        },
        rejectUnauthorized: false, // This doesn't work,
        insecure: true,
    };

    request(options, (err, result, body)=>{
      if(err) console.log(err);
      console.log((result.headers['set-cookie']).join(""));
      res.cookie('Cookie', (result.headers['set-cookie']).join(""))
      res.send(result);
    });

});

app.all('/api', (req, res)=>{
  let url = `${host}/Branches`;
  let cookie = req.cookies['Cookie'];
  // res.send('aw')
  // return;
  // const cookie = request.cookie('B1SESSION=004cb67e-b0cc-11eb-8000-20677ce77e84;HttpOnly; CompanyDB=TESTAPBW; HttpOnly; ROUTEID=.node1; path=/b1s');
  j.setCookie(cookie, url);
  let options = {
      method: "GET",
      json: true,
      uri : url,
      // jar: j,
      body: {},
      rejectUnauthorized: false, // This doesn't work,
      insecure: true,
  };
  

  request(options, (err, result, body)=>{
    if(err) console.log(err);
    res.send(result);
  });

});

// const options = {
//   pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
//   passphrase: 'sample'
// };

http.createServer( app,  (req, res) => {
  // res.writeHead(200);
  // res.end('hello world\n');
  console.log('PORT: ', process.env.HTTP_PORT)
}).listen(process.env.HTTP_PORT);


https.createServer( app,  (req, res) => {
  // res.writeHead(200);
  // res.end('hello world\n');
  console.log('SSL PORT: ', process.env.SSL_PORT)
}).listen(process.env.SSL_PORT);