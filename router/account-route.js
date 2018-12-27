'use strict';

module.exports = function(app) {
    var controller = require('../controller/accountcontroller');

    app.route('/accounts').get(controller.accounts);
    app.route('/account').post(controller.insert);
    app.route('/account/:id').get(controller.getById);
    app.route('/account').put(controller.update);
    app.route('/account/:id').delete(controller.del);
};