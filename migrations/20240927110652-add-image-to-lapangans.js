'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Lapangans', 'image', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'close_time'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lapangans', 'image');
  }
};
