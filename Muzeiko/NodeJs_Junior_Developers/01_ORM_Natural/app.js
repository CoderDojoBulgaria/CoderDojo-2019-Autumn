// Sequelize ORM

/* Ако при стартиране на приложението получавате грешка изпълнете следния sql в MySQL Workbench студиото

    ALTER USER '<използвания юзър>'@'localhost' 
    IDENTIFIED WITH mysql_native_password 
		    BY '<използваната парола>';
*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop_03', '<използван юзър>', '<използвана парола>', {
    host: 'localhost',
    dialect: 'mysql'
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const Model = Sequelize.Model;
class Product extends Model { }
Product.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'product'
});

sequelize
    .sync({ force: true })
    .then(() => {
        Product
            .create({ name: 'milk', price: 3.14 })
            .then((prd) => {
                Product.findAll({
                    where: {
                        id: 1
                    }
                }).then(function (prods) {
                    console.log(prods[0] ? prods[0].dataValues : []);
                });
            });
    });