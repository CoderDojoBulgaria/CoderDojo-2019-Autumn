let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
module.exports = {
    appConfig: function (app) {
        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, '../views')));
        app.use(express.static(path.join(__dirname, '../public')));
        return app;
    }
}