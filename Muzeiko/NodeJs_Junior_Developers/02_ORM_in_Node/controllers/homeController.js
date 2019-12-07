const settings = require('../settings');
module.exports = {
    homeIndex: function (request, response) {
        let cookie = request.cookies[settings.cookieName];
        response.render('index', { username: cookie ? cookie : null});
    }
}