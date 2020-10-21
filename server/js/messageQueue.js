const messages = []; // the storage unit for messages

module.exports.messages = messages;

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  console.log('Dequeing message');
  return messages.shift();
};
