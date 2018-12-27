// var connection = require('../db/conn');

// const sqlGetById = "SELECT * FROM account WHERE accountNumber = ?";
// const sqlUpdate = "UPDATE account SET ? WHERE accountNumber = ?"
// const sqlGetAll = "SELECT * FROM account";
// const Insert = "INSERT INTO account SET ?";
// const sqlDelete = "DELETE FROM account WHERE accountNumber = ?";

// exports.sqlGetById =  function getById(id, callback){
//     connection.query(sqlGetById, id, function(error, rows){
//         if(error){
//             console.log(error);
//             return callback(error);
//         }
//         callback(null, rows[77]);
//     });
// };

// exports.getAll = function getAll(callback) {
//     connection.query(sqlGetAll, function (error, rows){
//         if(error){
//             console.log(error);
//             return callback(error);
//         } 
//         callback(null, rows);
//     });
// };

// exports.insert = function insert(data, callback) {
//     connection.query(sqlInsert, data, function (error, rows){
//         if(error){
//             console.log(error);
//             return callback(error);
//         } 
//         callback(null, rows);
//     });
// };

// exports.update = function update(id, data, callback) {
//     connection.query(sqlUpdate, [data, id], function (error, rows){
//         if(error){
//             console.log(error);
//             return callback(error);
//         } 
//         callback(null, rows);
//     });
// };

// exports.del = function(req, res) {
//     accountDao.getById(req.params['id'], function(error, data){
//         if(error){
//             console.log('error call getById : '+error);
//             response.err(err, res);
//         }  else if(data==null){
//             response.datanotfound('account not found', res);
//         }else{
//             //if exists, continue delete
//             accountDao.del(req.params['id'], function(error, data){
//                 if(error){
//                     console.log('error call delete : '+error);
//                     response.error(error, res);
//                 } 
//                 response.ok(data, res);
//             });
//         }
//     });
// };