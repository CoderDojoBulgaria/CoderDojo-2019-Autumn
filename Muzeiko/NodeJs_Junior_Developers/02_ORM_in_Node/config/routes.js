let homeController = require('../controllers/homeController');
let kittyController = require('../controllers/kittyController');
let userController = require('../controllers/userController');

module.exports = {
    configureRoutes: (app) => {
        app.get('/', homeController.homeIndex);

        // Kitties
        app.get('/kittypaws', kittyController.getAllKitties);
        app.post('/kittyAdd', kittyController.kittyInsert);
        app.post('/kittyUpd', kittyController.kittyUpdate);
        app.post('/kittyDel', kittyController.kittyDelete);

        // Users
        app.post('/register', userController.register);
        app.post('/logIn', userController.logIn);
        app.post('/logOut', userController.logOut);
        return app;
    }
}