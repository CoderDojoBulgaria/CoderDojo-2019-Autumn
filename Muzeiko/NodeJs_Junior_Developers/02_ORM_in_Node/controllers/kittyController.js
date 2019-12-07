const kittyEntity = require('../entities/kittyEntity');
const settings = require('../settings');

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
        let createUser = request.cookies[settings.cookieName];
        if (createUser) {
            kittyEntity.DbKitty
                .create({
                    name: kittyName,
                    breed: kittyBreed,
                    price: kittyPrice,
                    create_user: createUser,
                    last_update_user: createUser
                })
                .then((kitty) => {
                })
                .catch((err) => {
                })
                .finally(() => {
                    response.redirect('/#kittypaws');
                });
        } else {
            response.redirect('/#kittypaws');
        }
    },
    kittyUpdate: (request, response) => {
        let kittyId = request.body.kittyId;
        let kittyName = request.body.kittyName;
        let kittyBreed = request.body.kittyBreed;
        let kittyPrice = request.body.kittyPrice;
        let updateUser = request.cookies[settings.cookieName];
        if (updateUser) {
            kittyEntity.DbKitty
                .update({
                    name: kittyName,
                    breed: kittyBreed,
                    price: kittyPrice,
                    last_update_user: updateUser
                }, {
                    where: {
                        id: kittyId
                    }
                })
                .finally(() => {
                    response.redirect('/#kittypaws');
                });
        } else {
            response.redirect('/#kittypaws');
        }
    },
    kittyDelete: (request, response) => {
        let kittyId = request.body.kittyId;
        let username = request.cookies[settings.cookieName];
        if (username) {
            kittyEntity.DbKitty
            .destroy({
                where: {
                    id: kittyId
                }
            })
            .finally(() => {
                response.redirect('/#kittypaws');
            });
        } else {
            response.redirect('/#kittypaws');
        }
    }
};