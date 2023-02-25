const mysql = require('mysql');
const { promisify } = require('util');

require('dotenv').config();
const pool = mysql.createPool({
  connectionLimit: process.env.DB_POOL_SIZE || 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000,
  timezone: '+07:00',
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else if (connection) {
    console.log(`Connected to Database ${process.env.DB_PORT}`);
    connection.release();
  }
});

pool.query = promisify(pool.query);

module.exports = pool;
