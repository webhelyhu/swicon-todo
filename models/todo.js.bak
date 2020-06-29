'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    todotitle: DataTypes.STRING,
    todobody: DataTypes.STRING,
    owner: DataTypes.INTEGER
  }, {});
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};