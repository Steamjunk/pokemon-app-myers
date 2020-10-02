const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.pokemon.renderPokemonIndex);
router.get('/new', ctrl.pokemon.renderNewPokemon);
router.get('/:index', ctrl.pokemon.renderPokemonPage);
router.get('/:index/edit', ctrl.pokemon.renderPokemonEdit)

router.post('/', ctrl.pokemon.pokemonCatch);

router.delete('/:index', ctrl.pokemon.pokemonRelease);

router.put('/:index', ctrl.pokemon.pokemonEdit);

module.exports = router;
