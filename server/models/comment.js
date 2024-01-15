'use strict'
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
  return User;
}