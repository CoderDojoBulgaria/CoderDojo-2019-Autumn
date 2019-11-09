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
            }
        }, {
            sequelize,
            modelName: 'kitty'
        });
        return sequelize;
    },
    DbKitty: Kitty
}