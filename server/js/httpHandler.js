const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => {}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  // if (req.method === 'OPTIONS)
  // if (req,url === '/)
  // logic --> setHeaders --> call next()

  // if (req.method === 'GET)

  // if (req.url === '/)
  // send swim command

  // if (req.url === '/background')

  // if (req.url === 'POST)
  //

  res.writeHead(200, headers);
  console.log(messageQueue.messages);
  res.end(messageQueue.messages[0]);
  messageQueue.dequeue();
  next();
  // invoke next() at  the end of a request to help with testing!
};
