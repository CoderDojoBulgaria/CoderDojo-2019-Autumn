/* Ако при стартиране на приложението получавате грешка изпълнете следния sql в MySQL Workbench студиото

    ALTER USER '<използвания юзър>'@'localhost' 
    IDENTIFIED WITH mysql_native_password 
		    BY '<използваната парола>';
*/

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: '<използван юзър>',
    password: '<използвана парола>',
    database: 'shop_03'
});

connection.connect(() => {
    connection.query('SELECT * FROM `shop_03`.`products` WHERE `id` = 1', (err, prods, field) => {
        if (err) {
            console.log(err);
        } else {
            console.log(prods);
        }
    });
});
