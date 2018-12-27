var response = require('../model/res');
var transactionDao = require('../dao/transaction-dao-sequelize');
var logger = require('../util/logging/winston-logger');
var util = require('util');

exports.transactions = function(req, res){
    transactionDao.getAll(function (error, rows){
        if(error){
            logger.error('error while select: '+error);
            response.err(ress, err);
        } else {
         res.json(rows)
            // response.ok(rows, res);
        }
    });
};

exports.getTransactionById = function(req, res){
    transactionDao.getById(req.params['id'], function(err, data){
        if(err){
            logger.error('error while select: '+error);
            response.err(err, res);
        }
        response.ok(data, res);
    });
};

exports.updateTransaction = function(req, res){
    logger.info('request for update :');
    logger.debug(req.body);
    transactionDao.getById(req.body.id, function(err, data){ //check transaction exists
        if(err){
            logger.error('error call getById: '+error);
            response.err(err, res);
        }else if(data == null){
            response.datanotfound('transaction not found', res);
        } else {
            //if exists, then continue update
        transactionDao.update(req.body.id, req.body, function(err, data){
            if(err){
                logger.error('error call update: '+error);
                response.err(error, res);
            }
            response.ok('updated data : '+ data.id, res);
            });
        }
    });
};

exports.insertTransaction = function(req, res){
    logger.info('request for insert :');
    logger.debug(req.body);
    transactionDao.insert(req.body, function(err, data){
        if(err){
            logger.error('error while select: '+err);
            response.err(err, res);
        }
        response.ok('data inserted with id '+data.id, res);
    });
};

exports.delTransaction = function(req, res) {
    logger.info(util.format('deleting transaction id %s', req.params['id']));
    transactionDao.getById(req.params['id'], function(err, data){ //check transaction exists
        if(err){
            logger.error('error call getById: '+err);
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('transaction not found', res);
        } else{
            //if exists, continue delete
            transactionDao.delTransaction(req.params['id'], function(err, data){
                if(err){
                    logger.error('error while select: '+err);
                    response.err(error, res);
                }
                response.ok('transaction deleted with id : '+data, res);
            });
        }
    });
};