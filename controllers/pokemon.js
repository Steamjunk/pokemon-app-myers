const Pokemon = require('../models').Pokemon;
const Player = require('../models').Player;


const renderPokemonIndex = (req, res) => {
    Pokemon.findAll({
        order: [
            ['id','ASC']
        ]
    })
    .then(pokemon => {
        res.render('pokemon/index.ejs', {
            pokemon: pokemon
        });
    });
}

const renderNewPokemon = (req, res) => {
    res.render('pokemon/new.ejs');
}

const renderPokemonPage = (req, res) => {
    Pokemon.findByPk(req.params.index, {
        include: [
            {
                model: Player,
                attributes: ['id', 'name']
            }
        ]
    })
    .then(pokemon => {
        res.render('pokemon/show.ejs', {
            pokemon: pokemon
        });
    });
}

const renderPokemonEdit = (req, res) => {
    Pokemon.findByPk(req.params.index)
    .then(pokemon => {
        Player.findAll()
        .then(allPlayers => {
            res.render('pokemon/edit.ejs', {
                pokemon: pokemon,
                players: allPlayers
            });
        });
    });
}

// data manipulators
const pokemonCatch = (req, res) => {
    Pokemon.create(req.body)
    .then(newPokemon => {
        res.redirect('/pokemon');
    });
}

const pokemonRelease = (req, res) => {
    Pokemon.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/pokemon');
    });
}

const pokemonEdit = (req, res) => {
    Pokemon.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedPokemon => {
        Player.findByPk(req.body.player)
        .then(foundPlayer => {
            Pokemon.findByPk(req.params.index)
            .then(foundPokemon => {
                foundPokemon.addPlayer(foundPlayer);
                res.redirect(`/pokemon/${req.params.index}`);
            });
        });
    });
}

module.exports = {
    renderPokemonIndex,
    renderNewPokemon,
    renderPokemonPage,
    renderPokemonEdit,
    pokemonCatch,
    pokemonRelease,
    pokemonEdit
}
