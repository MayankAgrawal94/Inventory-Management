const express = require('express');
const bodyParser = require('body-parser'); // call body-parser here to parse body request from frontend 
var fileUpload = require('express-fileupload');  // call express-fileupload here to accept file in the form of multipart data  from frontend 

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json({limit:'50mb'}));  // here we try to set body request can accept requested data from frontend upto 50Mb

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' })); // here we try to set body request can accept requested data from frontend as urlencoded and upto 50Mb
app.use(fileUpload()); // here enable app to use fileupload

// Configuring the database
require("./config/env")
require('./shared/dbConnection')

// Middleware
const middleware = require('./shared/middleware');


var port = process.env.PORT || 3010;        // set our port and port must be enable on server 

var router = express.Router();    // call Router methode to enable api can accept multiple routes  

app.all('/*', function(req, res,next) {

  var allowedOrigins = [
    'http://localhost:4200'
  ];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH");

  if ( 
    req.url =='/' || 
      req.url=='/usersLogin'
        // || req.url == '/ForTestinglogin' 
            ){
                next()
  } else {
      middleware.authCheck(req, function(AUTH_CB){
        if(AUTH_CB.error == false){
          req.body.usr_id = AUTH_CB.body.usr_id
          next()
        }else{
          return res.status(AUTH_CB.error_code).send({
            error: AUTH_CB.error,
            message: AUTH_CB.message
          });
        }
      })
  }

});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Inventory Management Service application.\nLogin Quicky.\nWatch all your stocks."});
});

// Require routes
require('./app/routes/userLogin.routes')(app);
require('./app/routes/product.routes')(app);


// listen for requests
const server = app.listen(port, () => console.log("'Inventory Management Service' application is listening on port " + port));