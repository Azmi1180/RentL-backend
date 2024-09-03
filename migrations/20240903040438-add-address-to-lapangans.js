'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Lapangans', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'city'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lapangans', 'address');
  }
};
