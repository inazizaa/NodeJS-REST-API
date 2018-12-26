var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    morgan = require('morgan');
    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var logger = require("./util/logging/winston-logger");

app.use(morgan('combined',{ "stream": logger.stream }));
logger.debug("Overriding 'Express' logger");


var customerRoute = require('./router/customer-route');
var AccountRoute = require('./router/account-route');
var TransactionRoute = require('./router/transaction-route');
customerRoute(app);
AccountRoute(app);
TransactionRoute(app);

app.listen(port);
//console.log('Learn Node JS With Inas RESTful API server started on: ' + port);
logger.debug('Learn Node JS With Inas RESTful API server started on: ' + port);