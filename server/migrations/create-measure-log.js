'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('measure_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      traniee_id: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.FLOAT
      },
      chest_perimeter: {
        type: Sequelize.FLOAT
      },
      hip_perimeter: {
        type: Sequelize.FLOAT
      },
      bicep_perimeter: {
        type: Sequelize.FLOAT
      },
      thigh_perimeter: {
        type: Sequelize.FLOAT
      },
      waist_perimeter: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('measure_logs');
  }
};