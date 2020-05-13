'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isBanned: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Surname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Age: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      ProfilePicture: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};
