const express = require('express');
const { urlencoded } = require('body-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const routerNav = require('./src/index');

require('dotenv').config();

const app = express();

logger.format(
  ':method :url :status :res[content-length] - :response-time ms :date[Asia/Jakarta]',
);

const { APP_PORT } = process.env;
app.listen(APP_PORT, () => {
  console.log(`Server listening on ${APP_PORT}`);
});

app.use(logger('combined'));
app.use(urlencoded({ limit: '5mb', extended: true, parameterLimit: 5000 }));
app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.text({ limit: '5mb' }));

app.use('/api/', routerNav);

app.use('/*', (req, res) =>
  res.status(404).send({
    code: 404,
    status: 'failed',
    message: `Invalid router ${req.originalUrl}`,
  }),
);

module.exports = app;
