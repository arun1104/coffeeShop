'use strict';
const Logger = require('../logger');

class Subscribe {
  constructor() {
    this.sendTimedEventToDevice = this.sendTimedEventToDevice.bind(this);
  }

  async sendToWebsocket(deviceId, payload){
    console.log(`Sending websocket message to device:${deviceId}`, `The message to convey is:${payload.message}`);
  }
  async sendTimedEventToDevice({deviceId, timeInMins, correlationId}) {
    const logger = new Logger(correlationId, 'sendTimedEventToDevice-Subscribe', 'sendTimedEventToDevice');
    logger.info('Entry');
    setTimeout(this.sendToWebsocket, timeInMins * 60 * 1000, deviceId, {message: 'Order is ready'});
  }

  async subscribeToNotification(payload){

  }
}
module.exports = new Subscribe();
