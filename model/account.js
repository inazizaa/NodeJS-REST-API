const uuid = require('uuid/v4');

module.exports = (sequelize, type) => {
    return sequelize.define('accountId', {
        accountNumber: {
            field:'accountNumber',
            type: type.UUID,
            primaryKey: true,
            defaultValue: uuid()
        },
        openDate: {
            field:'openDate',
            type: type.DATE
        },
        balance: {
            field:'balance',
            type: type.STRING
        },
       customerNumber: {
            field : 'customer_id',
            type: type.INTEGER,
            onDelete: 'CASCADE',
            references:{
                model:'customerId',
                key: 'customerNumber'
              }
            } 
    }, {
        tableName: 'account',
        timestamps: false
    })
}