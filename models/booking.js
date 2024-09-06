'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Define associations here if needed
      Booking.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Booking.belongsTo(models.Lapangan, { foreignKey: 'lapangan_id', as: 'lapangan' });
    }
  }

  Booking.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lapangan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      booking_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'Bookings',
      timestamps: false,
    }
  );

  return Booking;
};
