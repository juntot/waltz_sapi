const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const express = require('express');//, cookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()

const app = express();

var whitelist = ['http://127.0.0.1:80', 'http://example2.com']
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let request =  require('request');
const cj = request.jar();
request = request.defaults({jar: cj});


// const cookie = request.cookie('B1SESSION=004cb67e-b0cc-11eb-8000-20677ce77e84;HttpOnly; CompanyDB=TESTAPBW; HttpOnly; ROUTEID=.node1; path=/b1s');
// const url = 'http://www.google.com';
let cookie = '';

// START =============================================================================================================
const host = process.env.API_HOST
app.use(express.static(__dirname + '/build'));
// or =================================================================================================================
app.all('/', (req, res)=>{
  res.sendFile(path.join(__dirname + '/build', 'index.html'));
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
      console.log((result.headers['set-cookie']).join(""), body);
      // cj.setCookie('Cookie', (result.headers['set-cookie']).join(""))
      cj.setCookie((result.headers['set-cookie']).join(""));
      
      res.send({user: body.SessionId});
    });

});


app.all('/api', (req, res)=>{
  let {method, url, data = {}} = req.body;
  
  
  let uri = `${host}/${url}`;
  
  // cj.setCookie(cookie, uri);
  console.log('getcookie', cj.getCookieString(uri))
  
  let options = {
      method: method,
      json: true,
      uri : uri,
      body: data,
      jar: cj,
      rejectUnauthorized: false, // This doesn't work,
      insecure: true,
  };

  request(options, (err, result, body)=>{
    if(err) console.log(err);
    
    res.send(result.body);
  });
  

});



/*
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
*/



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