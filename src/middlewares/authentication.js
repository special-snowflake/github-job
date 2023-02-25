const jwt = require('jsonwebtoken');
const resHelper = require('../helpers/response');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  if (!token) {
    return resHelper.response(
      res,
      'Authentication failed: Missing token.',
      401,
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return resHelper.response(
        res,
        'Authentication failed: Invalid token.',
        401,
      );
    }
    req.user = decodedToken;
    next();
  });
};

module.exports = authenticateToken;
