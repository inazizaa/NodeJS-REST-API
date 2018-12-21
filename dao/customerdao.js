var connection = require('../db/conn');

const sqlGetById = "SELECT * FROM customer WHERE customerNumber = ?";
const sqlUpdate = "UPDATE customer SET ? WHERE customerNumber = ?";
const sqlGetAll = "SELECT * FROM customer";
const sqlInsert = "INSERT INTO customer SET ?";
const sqlDelete = "DELETE FROM customer WHERE customerNumber = ?";

exports.getById = function getById(id, callback) {
    connection.query(sqlGetById,id, function (error, rows){
        if(error){
            console.log(error);
            return callback(error);
        } 
        callback(null, rows[0]);
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
    customerDao.getById(req.params['id'], function(err, data){//check customer exists
        if(err){
            console.log('error call getById : '+err);
            response.err(err, res);
        }  else if(data==null){
            response.datanotfound('customer not found', res);
        }else{
            //if exists, continue delete
            customerDao.del(req.params['id'], function(err, data){
                if(err){
                    console.log('error call delete : '+err);
                    response.err(error, res);
                } 
                response.ok(data, res);
            });
        }
    });
};