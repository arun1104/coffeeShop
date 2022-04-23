'use strict';
const Logger = require('../logger');
const constants = require('../constants');
const subscribe = require('../notifications/subscribe');
class PaymentEvent {
  constructor() {
    this.processEvent = this.processEvent.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
  }

  async registerHandler(actionMap, actionName){
    actionMap.set(actionName, this.processEvent);
  }

  async processEvent(event, order, correlationId) {
    const logger = new Logger(correlationId, 'processEvent-CompletePaymentEvent', 'processEvent');
    logger.info('Entry');
    let result = {};
    try {
      if (!order.amountReceived && event.amountPaid >= order.totalAmountToBePaid){
        order.amountReceived = event.amountPaid;
        order.amountPendingToCustomer = order.amountReceived - order.totalAmountToBePaid;
        order.status = constants.ORDER_STATUS_PAID;
        order.amountPending = 0;
        result = {paymentId: event.paymentId, amountPending: 0,
          amountReceived: event.amountPaid, paymentTakenBy: event.userId, paymentTime: Date.now()};
        this.subscribeToNotification({deviceId: event.deviceId, timeInMins: order.totalTimeToPrepare, correlationId});
      } else if ((order.amountReceived + event.amountPaid) >= order.totalAmountToBePaid){
        order.status = constants.ORDER_STATUS_PAID;
        order.amountReceived += event.amountPaid;
        order.amountPendingToCustomer = order.amountReceived - order.totalAmountToBePaid;
        order.amountPending = 0;
        result = {paymentId: event.paymentId, amountPending: 0,
          amountReceived: order.amountReceived, paymentTakenBy: event.userId, paymentTime: Date.now()};
        this.subscribeToNotification({deviceId: event.deviceId, timeInMins: order.totalTimeToPrepare, correlationId});
      } else if (event.amountPaid < order.totalAmountToBePaid){
        order.status = constants.ORDER_STATUS_PARTIALLY_PAID;
        order.amountReceived += event.amountPaid;
        order.amountPending = order.totalAmountToBePaid - event.amountPaid;
        result = {paymentId: event.paymentId, amountPending: order.amountPending,
          amountReceived: order.amountReceived, paymentTakenBy: event.userId, paymentTime: Date.now()};
      }
      order.payments.push(result);
      return { processed: true, result};
    } catch (err) {
      logger.error(err);
      return { processed: false};
    }
  }

  async subscribeToNotification(payload){
    subscribe.sendTimedEventToDevice(payload);
  }
}
module.exports = new PaymentEvent();
