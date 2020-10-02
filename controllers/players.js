// const bcrypt = require('bcryptjs');
const Player = require('../models').Player;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;


let loggedInPlayer;

const renderPlayerIndex = (req, res) => {
    Player.findAll()
    .then(players => {
        res.render('players/index.ejs', {
            players: players,
            loggedInPlayer: loggedInPlayer
        });
    })
}

const renderPlayerSignUp = (req, res) => {
    res.render('players/signUp.ejs');
}

const renderPlayerLogin = (req, res) => {
    res.render('players/logIn.ejs')
}

const renderPlayerPage = (req, res) => {
    Player.findByPk(req.params.index, {
        include: [
            {
                model: Team,
                attributes: ['id', 'name']
            },
            {
                model: Pokemon
            }
        ]
    })
    .then(player => {
        if(player.id == loggedInPlayer.id) {
            Team.findAll()
            .then(allTeams => {
                Pokemon.findAll()
                .then(allPokemon => {
                    res.render('players/showPlayer.ejs', {
                        player: player,
                        teams: allTeams,
                        pokemon: allPokemon
                    });
                });
            });
        } else {
        // rrender different version of player page open to public
            res.redirect(`/players`)
        }
    })
    .catch(err => {
        res.redirect(`/players`)
    });
}


const playerSignUp = (req, res) => {
    Player.create(req.body)
    .then(newPlayer => {
        loggedInPlayer = newPlayer;
        res.redirect(`/players/${newPlayer.id}`);
    })
}

const playerLogin = (req, res) => {
    Player.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    .then(foundUser => {
        loggedInPlayer = foundUser;
        res.redirect(`/players/${foundUser.id}`);
    })
    .catch(err => {
        res.redirect('/players/login');

    })
}

const playerDelete = (req, res) => {
    Player.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/players');
    })
}

const playerLogOut = (req, res) => {
    loggedInPlayer = null;
    res.redirect('/players');
}

const playerEdit = (req, res) => {
    Player.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedUser => {
        res.redirect(`/players/${req.params.index}`);
    })
}

const playerPokemonCatch = (req, res) => {
    Player.findByPk(req.params.index)
    .then(foundPlayer => {
        Pokemon.findByPk(req.body.pokemon)
        .then(foundPokemon => {
            foundPlayer.addPokemon(foundPokemon);
            res.redirect(`/players/${req.params.index}`);
        });
    });
}

const playerPokemonRelease = (req, res) => {
    if(req.body) {
        console.log(req.body);
        console.log(typeof(req.body.pokemon));

        
        Player.findByPk(req.params.index)
        .then(foundPlayer => {
            Pokemon.findByPk(req.body.pokemon)
            .then(foundPokemon => {
                foundPlayer.removePokemon(foundPokemon);
                res.redirect(`/players/${req.params.index}`);
            });
        });
    }
}

module.exports = {
    renderPlayerIndex,
    renderPlayerSignUp,
    renderPlayerLogin,
    renderPlayerPage,
    playerSignUp,
    playerLogin,
    playerDelete,
    playerLogOut,
    playerEdit,
    playerPokemonCatch,
    playerPokemonRelease
}