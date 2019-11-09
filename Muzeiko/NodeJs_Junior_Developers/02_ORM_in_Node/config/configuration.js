var express = require('express');
var path = require('path');
module.exports = {
    appConfig: function (app) {
        app.use(express.static(path.join(__dirname, '../views')));
        app.use(express.static(path.join(__dirname, '../public')));
        return app;
    }
}