const uuid = require('uuid/v4');

module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        idtrans:{
            field: 'idtrans',
            type: type.UUID,
            primaryKey: true,
            defaultValue: uuid()
        },
        type: {
            field: 'type',
            type: type.STRING
        },
        amountsign: {
            field: 'amountsign',
            type: type.STRING
        },
        amount: {
            field: 'amount',
            type: type.STRING
        },
        account_id:{
            field : 'account_id',
            type: type.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'accountId',
                key: 'account_id'
            }
        }
    }, {
        tableName : 'transaction',
        timestamps: false
    })
}