let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
module.exports = {
    appConfig: function (app) {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname, '../views')));
        app.use(express.static(path.join(__dirname, '../public')));
        return app;
    }
}