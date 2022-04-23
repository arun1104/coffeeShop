'use strict';
const productHandlers = require('./controllers/products/productsHandler');
const orderHandlers = require('./controllers/orders/ordersHandler');
const orderEventHandlers = require('./controllers/orderEvents/orderEventsHandler');
module.exports = {
  getProducts: productHandlers.getProducts,
  getOrders: orderHandlers.getOrders,
  processOrderEvents: orderEventHandlers.processOrderEvents,
};
