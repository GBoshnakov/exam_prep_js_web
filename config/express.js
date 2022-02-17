const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const userSession = require('../middlewares/userSession');

function configExpress(app) {
    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);

    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'mySecret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(userSession());
}

module.exports = configExpress;