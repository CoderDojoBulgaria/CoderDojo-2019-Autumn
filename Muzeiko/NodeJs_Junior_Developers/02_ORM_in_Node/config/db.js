const Sequelize = require('sequelize');
const settings = require('../settings');
const kittyEnttity = require('../entities/kittyEntity');
const userEnttity = require('../entities/userEntity');

const sequelize = new Sequelize(settings.logIn.database, settings.logIn.username, settings.logIn.password, settings.mysqlLogin);

module.exports = {
    dbConfig: (app) => {
        return new Promise(function(resolved, rejected) {
            kittyEnttity
                .kittyConfig(sequelize, Sequelize)
                .sync({ alter: false })
                .then(() => {
                    userEnttity
                        .userConfig(sequelize, Sequelize)
                        .sync({ alter: false })
                        .then(() => {
                            resolved(app);
                        })
                        .catch((err) => {
                            rejected(err);
                        })
                })
                .catch((err) => {
                    rejected(err);
                });
        });
    },
    DbSequelize: () => {
        return {
            sequelizeDb: sequelize,
            SequelizeDb: Sequelize
        }
    }
}