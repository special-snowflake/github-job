const {
  body,
  query,
  validationResult,
  param,
  header,
} = require('express-validator');

const resHelper = require('../helpers/response');

const validation = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const message = errors.errors[0].msg;
  return resHelper.response(res, message, 401);
};

const ruleLogin = () => [
  body('username').notEmpty().withMessage('username is required'),
  body('password').notEmpty().withMessage('password required'),
];

const ruleRegister = () => [
  body('username').notEmpty().withMessage('username is required'),
  body('password').notEmpty().withMessage('password required'),
  body('fullname').notEmpty().withMessage('fullname required'),
];
const getData = () => [
  query('search').optional(),
  query('location').optional(),
  query('fulltime')
    .optional()
    .notEmpty()
    .withMessage('fullname required')
    .isIn([true, false])
    .withMessage('fulltime only accept falue true or false'),
];

const getDetail = () => [param('id').notEmpty().withMessage('id is required')];

module.exports = {
  validation,
  ruleLogin,
  ruleRegister,
  getData,
  getDetail,
};
