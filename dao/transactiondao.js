var connection = require('../db/conn');

const sqlGetById = "SELECT * FROM transaction WHERE idtrans = ?";
const sqlUpdate = "UPDATE transaction SET ? WHERE idtrans = ?"
const sqlGetAll = "SELECT * FROM transaction";
const Insert = "INSERT INTO transaction SET ?";
const sqlDelete = "DELETE FROM transaction WHERE idtrans = ?";

exports.sqlGetById =  function getById(id, callback){
    connection.query(sqlGetById, id, function(error, rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows[77]);
    });
};

exports.getAll = function getAll(callback) {
    connection.query(sqlGetAll, function (error, rows){
        if(error){
            console.log(error);
            return callback(error);
        } 
        callback(null, rows);
    });
};

exports.insert = function insert(data, callback) {
    connection.query(sqlInsert, data, function (error, rows){
        if(error){
            console.log(error);
            return callback(error);
        } 
        callback(null, rows);
    });
};

exports.update = function update(id, data, callback) {
    connection.query(sqlUpdate, [data, id], function (error, rows){
        if(error){
            console.log(error);
            return callback(error);
        } 
        callback(null, rows);
    });
};

exports.del = function(req, res) {
    transactionDao.getById(req.params['id'], function(error, data){
        if(error){
            console.log('error call getById : '+error);
            response.err(err, res);
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