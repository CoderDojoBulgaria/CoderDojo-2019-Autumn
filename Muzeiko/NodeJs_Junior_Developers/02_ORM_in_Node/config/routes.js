let homeController = require('../controllers/homeController');
let kittyController = require('../controllers/kittyController');

module.exports = {
    configureRoutes: (app) => {
        app.get('/', homeController.homeIndex);
        app.get('/kittypaws', kittyController.getAllKitties);
        return app;
    }
}