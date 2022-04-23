'use strict';
const assert = require('assert');
const mocha = require('mocha');
let sinon = require('sinon');
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
  let req = {
    correlationId: () => { return 'bsg262627'; },
    body: {name: 'test'},
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
  before(() => {

  });
  after(() => {
    sinon.restore();
  });

  it('should return valid values', async function() {
    try {

    } catch (err) {
      console.log(err);
    }
  });
});
