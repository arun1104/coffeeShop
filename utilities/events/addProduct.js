'use strict';
const Logger = require('../../utilities/logger');
const constants = require('../../utilities/constants');
class AddProductEvent {
  constructor() {
    this.processEvent = this.processEvent.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
  }

  async registerHandler(actionMap, actionName){
    actionMap.set(actionName, this.processEvent);
  }

  setPreparationTime(quantity, timeToPrepare, order){
    const totalTimeToPrepare = timeToPrepare * quantity;
    order.totalTimeToPrepare = !!order.totalTimeToPrepare + totalTimeToPrepare;
  }

  async processEvent(event, order, correlationId) {
    const logger = new Logger(correlationId, 'processEvent-AddProductEvent', 'processEvent');
    logger.info('Entry');
    try {
      const quantity = event.quantity;
      if (event.timeToPrepareInMins){
        this.setPreparationTime(quantity, event.timeToPrepareInMins, order);
      }

      const sellingPrice = event.sellingPrice;
      const totalSellingPrice = (quantity * sellingPrice);
      const discountPerQuantity = (event.discountInPercent * 0.01) * sellingPrice;
      const totalDiscount = discountPerQuantity * quantity;
      const taxPerQuantity = (event.taxInPercent * 0.01) * sellingPrice;
      const totalTax = taxPerQuantity * quantity;
      const amountToPay = totalSellingPrice + totalTax - totalDiscount;
      order.totalAmountToBePaid += amountToPay;
      order.status = constants.ORDER_STATUS_IN_PROGRESS;
      const result = {productId: event.productId, quantity, totalSellingPrice, totalTax, totalDiscount,
        amountToPay, addedBy: event.userId, addedAt: Date.now()};
      order.items.push(result);
      return { processed: true, result};
    } catch (err) {
      logger.error(err);
      return { processed: false};
    }
  }
}
module.exports = new AddProductEvent();
