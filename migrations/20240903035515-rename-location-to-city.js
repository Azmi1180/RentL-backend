'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Lapangans', 'location', 'city');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Lapangans', 'city', 'location');
  }
};
