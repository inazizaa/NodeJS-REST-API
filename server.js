var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');
  
    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var logger = require("./util/logging/winston-logger");

app.use(morgan('combined',{ "stream": logger.stream }));
logger.debug("Overriding 'Express' logger");


var customerRoute = require('./router/customer-route');
customerRoute(app);
 var accountRoute = require('./router/account-route');
 accountRoute(app);
var transactionRoute = require('./router/transaction-route');
transactionRoute(app);

app.listen(port);
logger.debug('Learn Node JS With Inas RESTful API server started on: ' + port);