const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'The token is missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.id = decoded.id;
    req.company = decoded.company;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};