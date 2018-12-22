var response = require('../model/customer');
var customerDao = require('../dao/customerdao');
var logger = require('../util/logging/winston-logger');
var util = require('util');


exports.customers = function(req, res) {
    customerDao.getAll(function (error, rows){
        if(error){
            logger.error('error while select: '+error);
            response.err(error, res);
        } else{
            response.ok(rows, res)
        }
    });
};

exports.getCustomerById = function(req, res) {
    customerDao.getById(req.params['id'], function(err, data){
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        } 
        response.ok(data, res);
    });

};

exports.updateCustomer = function(req, res) {
    logger.info('request for update :');
    logger.debug(req.body);
    customerDao.getById(req.body.customerNumber, function(err, data){//check customer exists
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('customer not found', res);
        }else{
            //if exists, then continue update
            customerDao.update(req.body.customerNumber, req.body, function(err, data){
                if(err){
                    logger.error('error call update : '+err);
                    response.err(error, res);
                } 
                response.ok('updated data : '+ data.message, res);
            });
        }
    });
};


exports.insertCustomer=function(req, res){
    logger.info('request for insert :');
    logger.debug(req.body);
    customerDao.insert(req.body, function(err, data){
        if(err){
            logger.error('error call insert : '+err);
            response.err(err, res);
        }
        response.ok('data inserted with id '+data.insertId, res);
    });
};

exports.del = function(req, res) {
    logger.info(util.format('deleting customer id %s', req.params['id']));
    customerDao.getById(req.params['id'], function(err, data){//check customer exists
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        }  else if(data==null){
            response.datanotfound('customer not found', res);
        }else{
            //if exists, continue delete
            customerDao.del(req.params['id'], function(err, data){
                if(err){
                    logger.error('error call delete : '+err);
                    response.err(error, res);
                } 
                response.ok(data, res);
            });
        }
    });
};