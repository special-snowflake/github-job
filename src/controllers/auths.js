const authsService = require('../services/auths');
const resHelper = require('../helpers/response');

const login = async (req, res) => {
  try {
    const response = await authsService.login(req.body);
    return resHelper.response(res, 'Login Succes.', 200, response);
  } catch (error) {
    return resHelper.response(res, error.message, 400, [], [], 'failed');
  }
};

const register = async (req, res) => {
  try {
    const response = await authsService.register(req.body);
    return resHelper.response(res, 'Register Succes.', 200, response);
  } catch (error) {
    return resHelper.response(res, error.message, 400, [], [], 'failed');
  }
};
module.exports = {
  login,
  register,
};
