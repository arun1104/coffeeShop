'use strict';
const Logger = require('../../utilities/logger');
const dbLayer = require('../../utilities/mongodbLayer');
const constants = require('../../utilities/constants');
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
      let eventList = req.body;
      let dbOptions = { correlationId, collection: constants['ORDER_EVENTS_COLLECTION'], data: eventList};
      await this.db.insertManyDocs(dbOptions);
      let options = { correlationId, collection: constants['ORDERS_COLLECTION'], query: { id: req.swagger.params.orderId.value}};
      let existingOrder = await this.db.findOne(options);
      logger.info('existing order', existingOrder);
      let order = existingOrder || {
        id: req.swagger.params.orderId.value,
        totalAmountToBePaid: 0,
        items: [],
        payments: [],
        createdBy: eventList[0] ? eventList[0].userId : null,
      };
      eventList.forEach(event => {
        const eventHandler = this.actionMap.get(event.action);
        const result = eventHandler(event.details, order, correlationId);
        order.updatedBy = event.details.userId;
        logger.info('resultOfEachEvent', result);
        logger.info('orderState', order);
      });
      logger.info('orderState', order);
      options.data = order;
      await this.db.updateOrCreateDoc(options);
      res.status(200).send(order);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}
module.exports = new OrderEventsExpressHandler();
