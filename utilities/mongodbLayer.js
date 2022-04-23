'use strict';
const Logger = require('../utilities/logger');
const Mongoose = require('mongoose');
require('./mongooseSchemas');

class DBLayer {
  constructor() {
    this.Mongoose = Mongoose;
    this.getDocs = this.getDocs.bind(this);
    this.createDoc = this.createDoc.bind(this);
    this.findOne = this.findOne.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.updateOrCreateDoc = this.updateOrCreateDoc.bind(this);
    this.insertManyDocs = this.insertManyDocs.bind(this);
  }

  async insertManyDocs(options){
    const logger = new Logger(options.correlationId, 'insertManyDocs-mongodbLayer', 'insertManyDocs');
    logger.info('Entry', options);
    try {
      let model = this.Mongoose.model(options.collection);
      let result = await model.insertMany(options.data);
      result = JSON.parse(JSON.stringify(result));
      return result;
    } catch (err) {
      logger.error(err);
      throw (new Error(' DB error'));
    }
  }

  async findOne(options) {
    const logger = new Logger(options.correlationId, 'findOne-mongodbLayer', 'findOne');
    logger.info('Entry', options);
    try {
      let model = this.Mongoose.model(options.collection);
      let doc = await model.findOne(options.query);
      doc = JSON.parse(JSON.stringify(doc));
      return doc;
    } catch (err){
      logger.error(err);
      throw (new Error(' DB error'));
    }
  }

  async updateOrCreateDoc(options) {
    const logger = new Logger(options.correlationId, 'updateDoc-mongodbLayer', 'updateDoc');
    try {
      let model = this.Mongoose.model(options.collection);
      let result = await model.findOneAndUpdate(options.query, options.data, { upsert: true, new: true });
      result = JSON.parse(JSON.stringify(result));
      return result;
    } catch (err) {
      logger.error(err);
      throw (new Error(' DB error'));
    }
  }

  async getDocs(options) {
    const logger = new Logger(options.correlationId, 'getDocs-mongodbLayer', 'getDocs');
    logger.info('Entry', options);
    try {
      let model = this.Mongoose.model(options.collection);
      let doc = await model.find(options.query);
      doc = JSON.parse(JSON.stringify(doc));
      return doc;
    } catch (err){
      logger.error(err);
      throw (new Error(' DB error'));
    }

  }

  async createDoc(options) {
    const logger = new Logger(options.correlationId, 'createDoc-mongodbLayer', 'createDoc');
    try {
      let Model = this.Mongoose.model(options.collection);
      let newDoc = new Model(options.data);
      let result = JSON.parse(JSON.stringify(newDoc));
      await newDoc.save();
      return result;
    } catch (err) {
      logger.error(err);
      throw (new Error(' DB error'));
    }
  }

  async updateDoc(options, correlationId, modelName) {
    const logger = new Logger(correlationId, 'updateDoc-mongodbLayer', 'updateDoc');
    try {
      let model = this.Mongoose.model(modelName);
      let result = await model.findOneAndUpdate(options.query, options.data, { new: true });
      result = JSON.parse(JSON.stringify(result));
      return result;
    } catch (err) {
      logger.error(err);
      throw (new Error(' DB error'));
    }
  }
}

module.exports = new DBLayer();
