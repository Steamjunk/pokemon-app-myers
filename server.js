const express = require('express');
const methodOverride = require('method-override');
const routes = require('./routes');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use('/pokemon', routes.pokemon);
app.use('/players', routes.players);
app.use('/teams', routes.teams);

app.listen(3000, () => {
    console.log('My server is up and running');
})
