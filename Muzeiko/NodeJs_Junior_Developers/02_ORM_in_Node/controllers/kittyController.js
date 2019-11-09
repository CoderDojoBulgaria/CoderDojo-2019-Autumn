const kittyEntity = require('../entities/kittyEntity');

module.exports = {
    getAllKitties: (request, response) => {
        kittyEntity.DbKitty.findAll()
            .then(function (prods) {
                let result = prods ? prods : [];
                response.json(result);
            });
    }
};