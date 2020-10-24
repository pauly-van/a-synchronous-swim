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

  if (req.method === 'OPTIONS') {
    if (req.url === '/') {
      //setHeaders
      res.writeHead(200, headers);
      res.end();
      next();
    }
  }

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      res.end(messageQueue.messages[0]);
      messageQueue.dequeue();
      next();
    } else if (req.url === '/background.jpg') {
      fs.readFile(exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
          res.end('404 Not Found');
          next();
          // throw err;
        } else {
          {
            console.log(data);
            res.writeHead(200, headers);
            res.end(data);
            next();
          }
        }
      });
    }
  }

  if (req.method === 'POST') {
    if (req.url === '/') {
      // send swim command
    }
    if (req.url === '/background') {
      // do something
    }
  }

  // invoke next() at  the end of a request to help with testing!
};
