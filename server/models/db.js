const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const config = {
  host: 'localhost',
  dialect: 'postgres'
};

const dbConnection = new Sequelize('mychess', 'bradipusr', 'codehype', config);
console.log(dbConnection);

const files = fs.readdirSync(__dirname);
console.log(files);

const db = {};

for (const file of files) {
  if (file !== 'db.js') {
    const model = require(path.join(__dirname, file))(dbConnection, Sequelize.DataTypes);
    db[model.name] = model;
    console.log(model.name);
  }
}


// for (const model in db) {
//   if (db[model].associate) db[model].associate(db);
// }

db.dbConnection = dbConnection;
db.Sequelize = Sequelize;


module.exports = db;