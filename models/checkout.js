'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  // bang
  Checkout.init({
    booking_id: DataTypes.INTEGER,
    payment_method: DataTypes.STRING, 
    total_amount: DataTypes.FLOAT,
    payment_status: DataTypes.STRING,
    payment_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Checkout',
    timestamps: false,

  });

//   {
//     sequelize,
//     modelName: 'User',
//     tableName: 'Users',
//     timestamps: false,
// }
  return Checkout;
};