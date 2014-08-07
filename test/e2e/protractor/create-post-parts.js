"use strict";

var signUpParts = require('./sign-up-parts.js');
var utils = require('./utils.js');
var loginFormObj = require('./objects/loginForm.js');

function clickSubmitNewPost(){
    element(by.css('.dpt-new-post-btn')).click();
}

function givenLoggedInAndOnSubmitNewPost() {
    var username = signUpParts.successfulSignUp();
    utils.tryToLogout();
    var loginForm = loginFormObj.instance();
    loginForm.get();
    loginForm.setLogin(username);
    loginForm.setPassword();
    loginForm.login();

    //And I had clicked on submit post button
    clickSubmitNewPost();
}

function createTextPost(postTitle, postText) {
    givenLoggedInAndOnSubmitNewPost();

    var textForm = element(by.id('submitTextForm'));
    textForm.element(by.id('textPostTitle')).sendKeys(postTitle);
    textForm.element(by.id('postText')).sendKeys(postText);

    //When I click on submit new text post
    textForm.element(by.css('.dpt-submit-text-post')).click();
}

module.exports = {
    clickSubmitNewPost : clickSubmitNewPost,
    givenLoggedInAndOnSubmitNewPost : givenLoggedInAndOnSubmitNewPost,
    createTextPost : createTextPost
};