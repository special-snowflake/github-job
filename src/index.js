const { Router } = require('express');

const authRouter = require('./routes/auths');
const jobRouter = require('./routes/job');

const router = Router();

router.use('/auths', authRouter).use('/jobs', jobRouter);

module.exports = router;
