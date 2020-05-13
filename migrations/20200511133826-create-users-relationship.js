'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UsersRelationships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId1: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      UserId2: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      WaitingUser1: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      WaitingUser2: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UsersRelationships');
  }
};
