const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class User extends Model { }
module.exports = {
    userConfig: function (sequelize, Sequelize) {
        User.init({
            username: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            salt: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'user'
        });
        return sequelize;
    },
    DbUser: User
}