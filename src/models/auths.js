const db = require('../config/connection');

const addUsers = async (data) => db.query(`INSERT INTO user SET ?`, data);

const getUserByUsername = async (username) =>
  db.query(`SELECT * FROM user WHERE username = ?`, username);

  
module.exports = {
  addUsers,
  getUserByUsername,
};
