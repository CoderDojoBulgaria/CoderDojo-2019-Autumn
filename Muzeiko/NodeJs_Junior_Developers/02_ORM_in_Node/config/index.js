var express = require('express');
var config = require('./configuration');
var routes = require('./routes');
var db = require('./db');

module.exports = {
    configApp: function() {    
        return new Promise((resolved, rejected) => {
            var app = express();
            app = config.appConfig(app);
            app = routes.configureRoutes(app);
            app = db.dbConfig(app)
                .then((ds) => {
                    resolved(ds);
                })
                .catch((err) => {
                    rejected(err);
                });
        });
    }
}
