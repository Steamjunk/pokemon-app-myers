const Team = require('../models').Team;



const renderTeamsHomePage = (req, res) => {
    Team.findAll()
    .then(teams => {
        res.render('teams/index.ejs', {
            teams: teams
        });
    })
}



module.exports = {
    renderTeamsHomePage
}