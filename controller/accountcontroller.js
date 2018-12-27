var response = require('../model/res');
var accountDao = require('../dao/account-dao-sequelize');
var logger = require('../util/logging/winston-logger');
var util = require('util');


exports.accounts = function(req, res) {
    accountDao.getAll(function (error, rows){
        if(error){
            logger.error('error while select: '+error);
            response.err(error, res);
        } else{
            response.ok(rows, res)
        }
    });
};

exports.getById = function(req, res) {
    accountDao.getById(req.params['id'], function(err, data){
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        } 
        response.ok(data, res);
    });

};

exports.update = function(req, res) {
    logger.info('request for update :');
    logger.debug(req.body);
    accountDao.getById(req.body.accountNumber, function(err, data){//check account exists
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('account not found', res);
        }else{
            //if exists, then continue update
            accountDao.update(req.body.accountNumber, req.body, function(err, data){
                if(err){
                    logger.error('error call update : '+err);
                    response.err(error, res);
                } 
                response.ok('updated data : '+ data.accountNumber, res);
            });
        }
    });
};

exports.insert= function(req, res) {
    logger.info('request for insert :');
    logger.debug(req.body);
    accountDao.insert(req.body, function(err, data){
        if(err){
            logger.error('error call insert : '+err);
            response.err(err, res);
        } 
        response.ok('data inserted with id '+data.accountNumber, res);
    });
};

exports.del = function(req, res) {
    logger.info(util.format('deleting account id %s', req.params['id']));
    accountDao.getById(req.params['id'], function(err, data){//check account exists
        if(err){
            logger.error('error call getById : '+err);
            response.err(err, res);
        }  else if(data==null){
            response.datanotfound('account not found', res);
        }else{
            //if exists, continue delete
            accountDao.del(req.params['id'], function(err, data){
                if(err){
                    logger.error('error call delete : '+err);
                    response.err(error, res);
                } 
                response.ok('customer deleted with id : '+data, res);
            });
        }
    });
};
