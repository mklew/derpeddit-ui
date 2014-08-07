"use strict";

var LoginForm = function () {
    this.loginInput = element(by.id('loginForm')).element(by.id('login'));
    this.passwordInput = element(by.id('loginForm')).element(by.id('password'));

    this.get = function () {
        browser.get('/');
        element(by.css('.dpt-login')).click();
    };

    this.setLogin = function (login) {
        this.loginInput.sendKeys(login);
    };

    this.setPassword = function (password) {
        var pass = password || 'pass';
        this.passwordInput.sendKeys(pass);
    };

    this.login = function () {
        return element(by.css('.dpt-login-btn')).click();
    }
};

module.exports = {
    instance: function () {
        return new LoginForm();
    }
};

