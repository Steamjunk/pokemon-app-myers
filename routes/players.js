const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.players.renderPlayerIndex);
router.get('/signup', ctrl.players.renderPlayerSignUp);
router.get('/login', ctrl.players.renderPlayerLogin)
router.get('/:index', ctrl.players.renderPlayerPage);

router.post('/signup', ctrl.players.playerSignUp);
router.post('/login', ctrl.players.playerLogin);

router.delete('/:index', ctrl.players.playerDelete);

router.put('/:index', ctrl.players.playerLogOut)
router.put('/:index/edit', ctrl.players.playerEdit)
router.put('/:index/catch', ctrl.players.playerPokemonCatch)
router.put('/:index/release', ctrl.players.playerPokemonRelease)


module.exports = router;
