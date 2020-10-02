'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Players', [
      {
        name: 'Chris Myers',
        username: 'cmyers',
        password: 'password',
        teamId: 1
      },
      {
        name: 'Ash Ketchum',
        username: 'ash',
        password: 'pikachu',
        teamId: 2
      },
      {
        name: 'Misty',
        username: 'Misty',
        password: 'staryu',
        teamId: 3
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Players', null, {});
  }
};
