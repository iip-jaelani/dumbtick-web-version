'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      start_time: {
        type: Sequelize.STRING
      },
      end_time: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      deskription: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      url_maps: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('events');
  }
};