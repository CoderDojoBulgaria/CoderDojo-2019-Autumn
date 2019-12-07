const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Kitty extends Model { }
module.exports = {
    kittyConfig: function (sequelize, Sequelize) {
        Kitty.init({
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            breed: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            create_user: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_update_user: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'kitty'
        });
        return sequelize;
    },
    DbKitty: Kitty
}