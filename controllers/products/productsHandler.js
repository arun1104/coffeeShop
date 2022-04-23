'use strict';
const Logger = require('../../utilities/logger');
const constants = require('../../utilities/constants');
const dbLayer = require('../../utilities/mongodbLayer');
const {clientSchema} = require('./hapiSchemas/schemas');
const {v4: uuidv4} = require('uuid');

class ProductsExpressHandler {
  constructor() {

  }

}

module.exports = new ProductsExpressHandler();
