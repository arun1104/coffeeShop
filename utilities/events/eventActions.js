'use strict';
const addProductAction = require('../../utilities/events/addProduct');
const paymentAction = require('./payment');
const constants = require('../../utilities/constants');
class EventActions {
  constructor() {
    this.registerHandlers = this.registerHandlers.bind(this);
  }

  async registerHandlers(actionMap){
    addProductAction.registerHandler(actionMap, constants.EVENT_ACTION_ADD_PRODUCT);
    paymentAction.registerHandler(actionMap, constants.EVENT_ACTION_PAYMENT);
  }


}
module.exports = new EventActions();
