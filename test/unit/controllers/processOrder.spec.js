'use strict';
const assert = require('assert');
const mocha = require('mocha');
let sinon = require('sinon');
const orderEventHandlers = require('./../../../controllers/orderEvents/orderEventsHandler');
sinon = sinon.createSandbox();
let describe;
let it;
let before;
let after;
if (mocha.describe) {
  describe = mocha.describe;
  it = mocha.it;
  before = mocha.before;
  after = mocha.after;
} else {
  describe = global.describe;
  it = global.it;
  // eslint-disable-next-line no-unused-vars
  before = global.before;
  // eslint-disable-next-line no-unused-vars
  after = global.after;
}

describe('createOrder positive suit', async function() {
  const reqBody = [
    {
      id: '1qw22',
      action: 'ADD_PRODUCT',
      orderId: 'testorder',
      details: {
        quantity: 1,
        sellingPrice: 10,
        discountInPercent: 10,
        taxInPercent: 50,
        productId: 'huys',
        categoryId: 'none',
        timeToPrepareInMins: 1,
      },
    },
  ];
  let req = {
    correlationId: () => { return 'bsg262627'; },
    body: reqBody,
    swagger: {params: {orderId: {value: 'testorder'}}},
  };
  let res = {
    code: '',
    data: {},
    status: function(v){
      this.code = v;
      return this;
    },
    send: function(v){ this.data = v; },
  };
  let insertManyDocsMock, findOneMock, updateOrCreateMock;
  before(() => {
    insertManyDocsMock = sinon.stub(orderEventHandlers.db, 'insertManyDocs');
    findOneMock = sinon.stub(orderEventHandlers.db, 'findOne');
    updateOrCreateMock = sinon.stub(orderEventHandlers.db, 'updateOrCreateDoc');

  });
  after(() => {
    sinon.restore();
  });

  it('should return processed order if there is no existing order present', async function() {
    insertManyDocsMock.resolves([]);
    findOneMock.resolves(null);
    updateOrCreateMock.resolves({});
    try {
      await orderEventHandlers.processOrderEvents(req, res);
      assert.equal(res.data.totalAmountToBePaid, 14);

    } catch (err) {
      console.log(err);
      throw err;
    }
  });
});
