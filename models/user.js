'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
    static associate(models) {
    // Define associations here if needed
    }
}

User.init({
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        modelName: 'User',
        tableName: 'Users',
        timestamps: false,
    }
);

module.exports = User;
