const userEntity = require('../entities/userEntity');
const crypto = require("crypto");
const settings = require('../settings');

module.exports = {
    register: (request, response) => {
        let username = request.body.username;
        let password = request.body.password;
        const salt = crypto.randomBytes(16).toString('hex');
        password = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        userEntity.DbUser
            .findOne({
                where: {
                    username: username
                }
            })
            .then((usr) => {
                if (!usr) {
                    userEntity.DbUser
                        .create({
                            username: username,
                            password: password,
                            salt: salt
                        })
                        .then((usr) => {
                            if (usr) {
                                response.cookie(settings.cookieName, usr.username, { maxAge: 4 * (60 * (60 * 1000)), httpOnly: true });
                            }
                        })
                        .catch((err) => {
                        })
                        .finally(() => {
                            response.redirect('/');
                        });
                } else {
                    response.redirect('/');
                }
            })
            .catch((err) => {
                response.redirect('/');
            });
    },
    logIn: (request, response) => {
        let username = request.body.username;
        let password = request.body.password;
        let prevUrl = request.body.prevUrl;
        userEntity.DbUser
            .findOne({
                where: {
                    username: username
                }
            })
            .then((usr) => {
                if (usr) {
                    password = crypto.pbkdf2Sync(password, usr.salt, 1000, 64, 'sha512').toString('hex');
                    if (password == usr.password) {
                        response.cookie(settings.cookieName, usr.username, { maxAge: 4 * (60 * (60 * 1000)), httpOnly: true });
                    }
                }
                response.redirect(`/${prevUrl ? prevUrl : ''}`);
            })
            .catch((err) => {
                response.redirect(`/${prevUrl ? prevUrl : ''}`);
            });
    },
    logOut: (request, response) => {
        let prevUrl = request.body.prevUrl;
        if (request.cookies[settings.cookieName]) {
            response.cookie(settings.cookieName, null, { maxAge: -1, httpOnly: true })
        }
        response.redirect(`/${prevUrl ? prevUrl : ''}`);
    }
};