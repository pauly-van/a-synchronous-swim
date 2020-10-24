const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const formidable = require('formidable');
const util = require('util');
var request = require('request').defaults({ encoding: null });

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'js/background.jpg');
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
      req.on('error', function (e) {
        console.log(e.message);
      });

      // set image data as buffer

      let imageData = Buffer.alloc(0);
      req.on('data', function (chunk) {
        imageData = Buffer.concat([imageData, chunk]);
      });

      req.on('end', function () {
        const finalData = multipart.getFile(imageData).data;
        fs.writeFile(__dirname + '/background.jpg', finalData, function (err) {
          if (err) throw err;
          res.writeHead(200, headers);
          res.end();
          next();
        });
      });

      /*
      const form = new formidable.IncomingForm();
      const fileDirectory = exports.backgroundImageFile;

      form.parse(req);

      form.on('fileBegin', (name, file) => {
        file.path = __dirname + '/background.jpg';
      });

      */

      // setTimeout(() => {

      // }, 2000);
    }
  }

  // invoke next() at  the end of a request to help with testing!
};
