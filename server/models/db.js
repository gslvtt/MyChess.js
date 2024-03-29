require('dotenv').config()
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DIALECT = 'postgres';

const config = {
  host: DB_HOST,
  dialect: DIALECT
};

const dbConnection = new Sequelize(DB_NAME, USER, PASSWORD, config);
const files = fs.readdirSync(__dirname);
const db = {};

for (const file of files) {
  if (file !== 'db.js') {
    const model = require(path.join(__dirname, file))(dbConnection, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.dbConnection = dbConnection;
db.Sequelize = Sequelize;


module.exports = db;