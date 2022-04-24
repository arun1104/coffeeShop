'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({}, { strict: false, timestamps: true });
mongoose.model('users', userSchema, 'users');

const productSchema = new Schema({}, { strict: false, timestamps: true });
mongoose.model('products', productSchema, 'products');

const orderSchema = new Schema({}, { strict: false, timestamps: true });
mongoose.model('orders', orderSchema, 'orders');

const orderEventSchema = new Schema({}, { strict: false, timestamps: true });
mongoose.model('orderEvents', orderEventSchema, 'orderEvents');

const orderItemSchema = new Schema({}, { strict: false, timestamps: true });
mongoose.model('orderItems', orderItemSchema, 'orderItems');
