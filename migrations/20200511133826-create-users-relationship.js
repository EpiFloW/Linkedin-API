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
      userId1: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId2: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      waitingUser1: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      waitingUser2: {
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
