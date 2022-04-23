'use strict';
const Logger = require('../../utilities/logger');
const dbLayer = require('../../utilities/mongodbLayer');
// const constants = require('../../utilities/constants');
const eventActions = require('../../utilities/events/eventActions');

class OrderEventsExpressHandler {
  constructor() {
    this.actionMap = new Map();
    eventActions.registerHandlers(this.actionMap);
    this.db = dbLayer;
    this.processOrderEvents = this.processOrderEvents.bind(this);
  }
  async processOrderEvents(req, res) {
    const correlationId = req.correlationId();
    const logger = new Logger(correlationId, 'processOrderEvents-OrderEventsExpressHandler', 'processOrderEvents');
    logger.info('Entry');
    try {
      // let options = { correlationId, collection: constants['ORDER_EVENTS_COLLECTION']};
      let eventList = req.body;
      let order = {
        id: req.swagger.params.orderId.value,
        totalAmountToBePaid: 0,
      };
      eventList.forEach(event => {
        const eventHandler = this.actionMap.get(event.action);
        const result = eventHandler(event.details, order, correlationId);
        logger.info('resultOfEachEvent', result);
        logger.info('orderState', order);
      });
      logger.info('orderState', order);
      res.status(200).send(order);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}
module.exports = new OrderEventsExpressHandler();
