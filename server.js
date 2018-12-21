var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var customerRoute = require('./router/customer-route');
customerRoute(app);

app.listen(port);
console.log('Learn Node JS With Inas RESTful API server started on: ' + port);