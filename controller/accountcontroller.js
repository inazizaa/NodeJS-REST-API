var response = require('../model/account');
var accountDao = require('../dao/accountDao');

exports.accounts = function(req, res) {
    accountDao.getAll(function (error, rows){
        if(error){
            console.log('error while select: '+error);
            response.error(error, res);
        } else{
            response.ok(rows, res)
        }
    });
};

exports.getAccountById = function(req, res) {
    accountDao.getById(req.params['id'], function(error, data){
        if(error){
            console.log('error call getById : '+error);
            response.error(error, res);
        } 
        response.ok(data, res);
    });

};

exports.updateAccount = function(req, res) {
    accountDao.getById(req.body.accountNumber, function(error, data){
        if(error){
            console.log('error call getById : '+error);
            response.error(error, res);
        } else if(data==null){
            response.datanotfound('account not found', res);
        }else{
            //if exists, then continue update
            accountDao.update(req.body.accountNumber, req.body, function(error, data){
                if(error){
                    console.log('error call update : '+error);
                    response.error(error, res);
                } 
                response.ok('updated data : '+ data.message, res);
            });
        }
    });
};


exports.insertAccount=function(req, res){
    accountDao.insert(req.body, function(error, data){
        if(error){
            console.log('error call insert : '+error);
            response.error(error, res);
        }
        response.ok('data inserted with id '+data.insertId, res);
    });
};

exports.del = function(req, res) {
    accountDao.getById(req.params['id'], function(error, data){
        if(error){
            console.log('error call getById : '+error);
            response.error(error, res);
        }  else if(data==null){
            response.datanotfound('account not found', res);
        }else{
            //if exists, continue delete
            accountDao.del(req.params['id'], function(error, data){
                if(error){
                    console.log('error call delete : '+error);
                    response.error(error, res);
                } 
                response.ok(data, res);
            });
        }
    });
};