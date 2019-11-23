const kittyEntity = require('../entities/kittyEntity');

module.exports = {
    getAllKitties: (request, response) => {
        kittyEntity.DbKitty
            .findAll()
            .then(function (prods) {
                let result = prods ? prods : [];
                response.json(result);
            });
    },
    kittyInsert: (request, response) => {
        let kittyName = request.body.kittyName;
        let kittyBreed = request.body.kittyBreed;
        let kittyPrice = request.body.kittyPrice;
        kittyEntity.DbKitty
            .create({
                name: kittyName,
                breed: kittyBreed,
                price: kittyPrice
            })
            .then((kitty) => {
            })
            .catch((err) => {
            })
            .finally(() => {
                response.redirect('/#kittypaws');
            });

    }
};