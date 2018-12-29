const { Account, Customer } = require('../db/sequelize');
var logger = require('../util/logging/winston-logger');

exports.getById = function getById(id, callback) {
    Account.findById(id)
    .then((account) => {
        return callback(null, account);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.getAll = function getAll(whereClause, callback) {
    Account.findAll({
        where : whereClause,
        include:[Customer]
    })
    .then((accounts) => {
        return callback(null, accounts);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.insert = function insert(data, callback) {
    let account = data;
    if(account.customer==null && account.customer_id==null){
        res.json('customer kosong');
    }else{
        if(account.customer_id==null){
            account.customer_id = account.customerId.customerNumber;
        }
    }

    Account.create(account)
    .then(account => {
        return callback(null, account);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.update = function update(id, data, callback) {
    let account = data;
    if(account.customer==null && account.customer_id==null){
        res.json('customer kosong');
    }else{
        if(account.customer_id==null){
            account.customer_id = account.customerId.customerNumber;
        }
    }
    
    Account.update(data, {
        where: { accountNumber: data.accountNumber },
        returning: true,
        plain: true
      })
    .then(result => {
        logger.info('result  update:');
        logger.info(result);
        return callback(null, data);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.del = function del(id, callback) {
    Account.destroy({
        where: { accountNumber: id }
      })
    .then(result => {
        logger.info('result  update:');
        logger.info(result);
        return callback(null, id);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};