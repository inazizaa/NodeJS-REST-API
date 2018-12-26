var response = require('../model/transaction');
var transactionDao = require('../dao/transactiondao');
var logger = require('../util/logging/winston-logger');
var util = require('util');

exports.transactions = function(req, res) {
    transactionDao.getAll(function (error, rows){
        if(error){
            logger.error('error while select: '+error);
            // console.log('error while select: '+error);
            response.error(error, res);
        } else{
            response.ok(rows, res)
        }
    });
};

exports.getTransactionById = function(req, res) {
    transactionDao.getById(req.params['id'], function(error, data){
        if(error){
            logger.error('error call getById : '+err);
            // console.log('error call getById : '+error);
            response.error(error, res);
        } 
        response.ok(data, res);
    });

};

exports.updateTransaction = function(req, res) {
    logger.info('request for update :');
    logger.debug(req.body);
    transactionDao.getById(req.body.id, function(err, data){
        if(err){
            logger.error('error call getById : '+error);
            // console.log('error call getById : '+error);
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('transaction not found', res);
        }else{
            //if exists, then continue update
            transactionDao.update(req.body.id, req.body, function(err, data){
                if(err){
                    logger.error('error call update : '+error);
                    // console.log('error call update : '+error);
                    response.err(error, res);
                } 
                response.ok('updated data : '+ data.message, res);
                // response.ok('updated data : '+ data.id, res);
            });
        }
    });
};


exports.insertTransaction=function(req, res){
    logger.info('request for insert :');
    logger.debug(req.body);
    transactionDao.insert(req.body, function(error, data){
        if(err){
            logger.error('error call insert : '+error);
            // console.log('error call insert : '+error);
            response.err(err, res);
        }
        response.ok('data inserted with id '+data.id, res);
      //  response.ok('data inserted with id '+data.id, res);
    });
};

exports.del = function(req, res) {
    logger.info(util.format('deleting customer id %s', req.params['id']));
    transactionDao.getById(req.params['id'], function(err, data){
        if(err){
            logger.error('error call getById : '+err);
            // console.log('error call getById : '+error);
            response.err(err, res);
        }  else if(data==null){
            response.datanotfound('transaction not found', res);
        }else{
            //if exists, continue delete
            transactionDao.del(req.params['id'], function(err, data){
                if(err){
                    logger.error('error call delete : '+err);
                    // console.log('error call delete : '+error);
                    response.err(error, res);
                } 
                response.ok(data, res);
                //response.ok('transaction deleted with id : '+data, res);
            });
        }
    });
};