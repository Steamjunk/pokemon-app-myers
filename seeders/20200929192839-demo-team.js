'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Teams', [
      {
        name: 'Instinct'
      },
      {
        name: 'Valor'
      },
      {
        name: 'Mystic'
      },
      {
        name: 'Team Rocket'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
