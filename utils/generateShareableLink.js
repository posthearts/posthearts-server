const crypto = require('crypto');

const generateShareableLink = () => {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = generateShareableLink;