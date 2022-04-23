'use strict';
const Logger = require('../../utilities/logger');
const dbLayer = require('../../utilities/mongodbLayer');
const constants = require('../../utilities/constants');

class OrderEventsExpressHandler {
  constructor() {
    this.db = dbLayer;
    this.processOrderEvents = this.processOrderEvents.bind(this);
  }
  async processOrderEvents(req, res) {
    const correlationId = req.correlationId();
    const logger = new Logger(correlationId, 'processOrderEvents-OrderEventsExpressHandler', 'processOrderEvents');
    logger.info('Entry');
    try {
      let options = { correlationId, collection: constants['ORDER_EVENTS_COLLECTION']};
      let orders = await this.db.getDocs(options);
      logger.info('orders', orders);
      res.status(200).send(orders);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}
module.exports = new OrderEventsExpressHandler();
