'use strict'

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
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

  Comment.associate = function (models) {
    Comment.belongsTo(models.User);
  } 
  return Comment;
}

