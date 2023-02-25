const { Router } = require('express');
const authController = require('../controllers/auths');
const validator = require('../middlewares/validator');
const { access: userAccess } = require('../middlewares/access')
const router = Router();

router
  .post(
    '/login',
    userAccess,
    validator.ruleLogin(),
    validator.validation,
    authController.login,
  )
  .post(
    '/register',
    userAccess,
    validator.ruleRegister(),
    validator.validation,
    authController.register,
  );
module.exports = router;
