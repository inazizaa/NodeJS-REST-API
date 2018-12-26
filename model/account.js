module.exports = (sequelize, type) => {
    return sequelize.define('account', {
        accountNumber: {
            field:'accountNumber',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        openDate: {
            field:'openDate',
            type: type.DATE
        },
        balance: {
            field:'balance',
            type: type.STRING
        },
        customerId: {
            field:'customerId',
            type: type.INTEGER
        }
    }, {
        tableName: 'account',
        timestamps: false
    })
}