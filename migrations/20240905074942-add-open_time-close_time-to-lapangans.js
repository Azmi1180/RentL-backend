'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Lapangans', 'open_time', {
      type: Sequelize.TIME,
      allowNull: false,
      after: 'description'  
    });

    await queryInterface.addColumn('Lapangans', 'close_time', {
      type: Sequelize.TIME,
      allowNull: false,
      after: 'open_time'  
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lapangans', 'open_time');

    await queryInterface.removeColumn('Lapangans', 'close_time');
  }
};
