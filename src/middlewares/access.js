const resHelper = require('../helpers/response');

require('dotenv').config();

const access = (req, res, next) => {
  const { KEY } = process.env;
  const { api_key } = req.headers;
  if (api_key === undefined || api_key !== KEY) {
    return resHelper.response(res, 'Invalid Key.', 401);
  }

  return next();
};

module.exports = { access };
