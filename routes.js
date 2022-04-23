'use strict';
const productHandlers = require('./controllers/products/productsHandler');
module.exports = {
  getProducts: productHandlers.getProducts,
};
