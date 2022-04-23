'use strict';
const Logger = require('../../utilities/logger');
class AddProductEvent {
  constructor() {
    this.processEvent = this.processEvent.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
  }

  async registerHandler(actionMap, actionName){
    actionMap.set(actionName, this.processEvent);
  }

  async processEvent(event, order, correlationId) {
    const logger = new Logger(correlationId, 'processEvent-AddProductEvent', 'processEvent');
    logger.info('Entry');
    try {
      const quantity = event.quantity;
      const sellingPrice = event.sellingPrice;
      const totalSellingPrice = (quantity * sellingPrice);
      const discountPerQuantity = (event.discountInPercent * 0.01) * sellingPrice;
      const totalDiscount = discountPerQuantity * quantity;
      const taxPerQuantity = (event.taxInPercent * 0.01) * sellingPrice;
      const totalTax = taxPerQuantity * quantity;
      const amountToPay = totalSellingPrice + totalTax - totalDiscount;
      order.totalAmountToBePaid += amountToPay;
      const result = {productId: event.productId, quantity, totalSellingPrice, totalTax, totalDiscount, amountToPay};
      order.items.push(result);
      return { processed: true, result};
    } catch (err) {
      logger.error(err);
      return { processed: false};
    }
  }
}
module.exports = new AddProductEvent();
