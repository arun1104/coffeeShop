'use strict';
const Logger = require('../../utilities/logger');
const constants = require('../../utilities/constants');
const dbLayer = require('../../utilities/mongodbLayer');
class ProductsExpressHandler {
  constructor() {
    this.db = dbLayer;
    this.getProducts = this.getProducts.bind(this);
  }

  async getProducts(req, res) {
    const correlationId = req.correlationId();
    const logger = new Logger(correlationId, 'getProducts-ProductsExpressHandler', 'getProducts');
    logger.info('Entry');
    try {
      let options = { correlationId, collection: constants['PRODUCTS_COLLECTION']};
      let products = await this.db.getDocs(options);
      logger.info('products', products);
      res.status(200).send(products);
    } catch (err) {
      logger.error(err);
      res.status(500).send({ message: 'ClientId or entity does not exists' });
    }
  }
}

module.exports = new ProductsExpressHandler();
