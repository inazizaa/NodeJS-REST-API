module.exports = (sequelize,type) => {
    return sequelize.define('transaction', {
        idtrans: {
            field: 'idtrans',
            type: type.INTEGER,
            primaryKey: true,
            autoIntcrement: true
        },
        amountSign: {
            field: 'amountSign',
            type: type.STRING
        },
        amount: {
            field: 'amount',
            type: type.STRING
        },
        type: {
            field: 'type',
            type: type.STRING
        },
        accountId: {
            field: 'accountId',
            type: type.INTEGER
        }
    },{
       tableName: 'transaction',
       timestamps: false 
    })
}