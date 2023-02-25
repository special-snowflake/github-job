const { Router } = require('express');
const jobController = require('../controllers/job');
const validator = require('../middlewares/validator');
const { access: userAccess } = require('../middlewares/access');
const authenticateToken = require('../middlewares/authentication');
const router = Router();

router.get(
  '/',
  userAccess,
  authenticateToken,
  validator.getData(),
  validator.validation,
  jobController.getDataJob,
);
module.exports = router;
