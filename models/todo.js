'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init({
    todoId: {
      primaryKey:true,
      type: DataTypes.INTEGER,
      autoIncrement:true
    },
    userId: DataTypes.INTEGER,
    todo: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    time: DataTypes.BIGINT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.associate = function(models){
    Todo.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  }
  return Todo;
};