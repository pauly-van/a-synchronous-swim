const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keyPressHandler = require('./keyPressHandler.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => {}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // console.log(req);
  res.writeHead(200, headers);
  keyPressHandler.initialize((message) => res.end(message));
  next(); // invoke next() at  the end of a request to help with testing!
};
