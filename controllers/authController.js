const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateJWT = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.googleAuth = (req, res) => {
  const token = generateJWT(req.user);
  res.json({ token });
};