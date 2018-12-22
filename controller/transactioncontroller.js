var response = require('../model/transaction');
var transactionDao = require('../dao/transactiondao');

exports.transactions = function(req, res) {
    transactionDao.getAll(function (error, rows){
        if(error){
            console.log('error while select: '+error);
            response.error(error, res);
        } else{
            response.ok(rows, res)
        }
    });
};

exports.getTransactionById = function(req, res) {
    transactionDao.getById(req.params['id'], function(error, data){
        if(error){
            console.log('error call getById : '+error);
            response.error(error, res);
        } 
        response.ok(data, res);
    });

};

exports.updateTransaction = function(req, res) {
    transactionDao.getById(req.body.idtrans, function(error, data){
        if(error){
            console.log('error call getById : '+error);
            response.error(error, res);
        } else if(data==null){
            response.datanotfound('transaction not found', res);
        }else{
            //if exists, then continue update
            transactionDao.update(req.body.istrans, req.body, function(error, data){
                if(error){
                    console.log('error call update : '+error);
                    response.error(error, res);
                } 
                response.ok('updated data : '+ data.message, res);
            });
        }
    });
};


exports.insertTransaction=function(req, res){
    transactionDao.insert(req.body, function(error, data){
        if(error){
            console.log('error call insert : '+error);
            response.error(error, res);
        }
        response.ok('data inserted with id '+data.insertId, res);
    });
};

exports.del = function(req, res) {
    transactionDao.getById(req.params['id'], function(error, data){
        if(error){
            console.log('error call getById : '+error);
            response.error(error, res);
        }  else if(data==null){
            response.datanotfound('transaction not found', res);
        }else{
            //if exists, continue delete
            transactionDao.del(req.params['id'], function(error, data){
                if(error){
                    console.log('error call delete : '+error);
                    response.error(error, res);
                } 
                response.ok(data, res);
            });
        }
    });
};