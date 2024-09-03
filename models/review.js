"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Relasi dengan User
      Review.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // Relasi dengan Lapangan
      Review.belongsTo(models.Lapangan, {
        foreignKey: "lapangan_id",
        as: "lapangan",
      });
    }
  }

  Review.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      lapangan_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Lapangans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "Reviews",
      timestamps: false, 
    }
  );

  return Review;
};
