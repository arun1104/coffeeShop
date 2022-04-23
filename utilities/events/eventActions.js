'use strict';
const addProductAction = require('../../utilities/events/addProduct');
const constants = require('../../utilities/constants');
class EventActions {
  constructor() {
    this.registerHandlers = this.registerHandlers.bind(this);
  }

  async registerHandlers(actionMap){
    addProductAction.registerHandler(actionMap, constants.EVENT_ACTION_ADD_PRODUCT);
  }


}
module.exports = new EventActions();
