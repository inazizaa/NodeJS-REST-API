const {Transaction, Account } = require('../db/sequelize');
var logger = require('../util/logging/winston-logger');
var res = require('../model/res')

exports.getById = function getById(id, callback){
    Transaction.findById(id)
    .then((transaction) => {
        return callback(null, transaction);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.getAll = function getAll(whereClause, callback) {
    Transaction.findAll({
        where: whereClause,
        include:[Account]
    })
    .then((transactions) => {
        return callback(null, transactions);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
    let transaction = data;
    if(transaction.account == null && transaction.accountId==null){
        res.json('account kosong');
    }else{
        if(transaction.accountNumber == null){
            transaction.accountNumber = transaction.accountId.accountNumber;
        }
    }

    Transaction.create(transaction)
    .then(transaction => {
        return callback(null, transaction);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.update = function update(id, data, callback){
    let transaction = data;
    if(transaction.account==null && transaction.account_id==null){
        res.json('account kosong');
    }else{
        if(transaction.account_id==null){
            transaction.account_id = transaction.account.accountNumber;
        }
    }

    Transaction.update(data, {
        where: {id: data.id },
        returning: true,
        plain: true
    })
    .then(result => {
        logger.info('result update:');
        logger.info(result);
        return callback(null, data);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.delTransaction = function delTransaction(id, callback) {
    Transaction.destroy({
        where: { id: id}
    })
    .then(result => {
        logger.info('result update:');
        logger.info(result);
        return callback(null, id);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};