'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Pokemons', [
      {
        name: "Bulbasaur",
        img: "http://img.pokemondb.net/artwork/bulbasaur.jpg",
        type1: "grass",
        type2: "poison"
      },
      {
        name: "Ivysaur",
        img: "http://img.pokemondb.net/artwork/ivysaur.jpg",
        type1: "grass",
        type2: "poison"
      },
      {
        name: "Venusaur",
        img: "http://img.pokemondb.net/artwork/venusaur.jpg",
        type1: "grass",
        type2: "poison"
      },
      {
        name: "Charmander",
        img: "http://img.pokemondb.net/artwork/charmander.jpg",
        type1: "fire"
      },
      {
        name: "Charmeleon",
        img: "http://img.pokemondb.net/artwork/charmeleon.jpg",
        type1: "fire"
      },
      {
        name: "Charizard",
        img: "http://img.pokemondb.net/artwork/charizard.jpg",
        type1: "fire",
        type2: "flying"
      },
      {
        name: "Squirtle",
        img: "http://img.pokemondb.net/artwork/squirtle.jpg",
        type1: "water"
      },
      {
        name: "Wartortle",
        img: "http://img.pokemondb.net/artwork/wartortle.jpg",
        type1: "water"
      },
      {
        name: "Blastoise",
        img: "http://img.pokemondb.net/artwork/blastoise.jpg",
        type1: "water"
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pokemons', null, {});
  }
};
