'use strict'
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
  return User;
}


// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
