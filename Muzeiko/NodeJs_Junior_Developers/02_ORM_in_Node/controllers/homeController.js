module.exports = {
    homeIndex: function (request, response) {
        response.sendFile('/index.html');
    }
}