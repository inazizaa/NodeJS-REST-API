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
        accountNumber:{ //harus sama sama di java karena bagian dari accountID
            field : 'account_id',
            type: type.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'accountId', //harus sama kaya model java dan penamaan di nodejs
                key: 'accountNumber' 
            }
        }
    }, {
        tableName : 'transaction',
        timestamps: false
    })
}