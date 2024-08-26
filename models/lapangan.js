'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lapangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lapangan.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    type: DataTypes.STRING,
    price_per_hour: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Lapangan',
  });
  return Lapangan;
};