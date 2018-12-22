'use strict';

module.exports = function(app) {
    var controller = require('../controller/accountcontroller');

    app.route('/accounts').get(controller.accounts);
    app.route('/account').post(controller.insertAccount);
    app.route('/account/:id').get(controller.getAccountById);
    app.route('/account').put(controller.updateAccount);
    app.route('/account/:id').delete(controller.del);
};