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

function createLinkPost(postTitle, postLink) {
    givenLoggedInAndOnSubmitNewPost();
    //And I had selected submit link tab
    element(by.css('.dpt-to-new-link')).click();

    //And I have entered post title and URL
    var linkForm = element(by.id('submitLinkForm'));
    linkForm.element(by.id('linkPostTitle')).sendKeys(postTitle);
    linkForm.element(by.id('postLink')).sendKeys(postLink);

    //When I click on submit new link post
    linkForm.element(by.css('.dpt-submit-link-post')).click();
}

function commentOnPost(createdPost) {
    createdPost.element(by.css('.dpt-comments-link')).click();
    var comment = utils.randomComment();
    element(by.id('commentText')).sendKeys(comment);

    //When I click on comment button
    element(by.css('.dpt-submit-comment')).click();
}


function createTextPostWithComments(postTitle, postText) {
    createTextPost(postTitle, postText);
    var createdPost = utils.getNewestPost();
    commentOnPost(createdPost);
}

function createLinkPostWithComments(postTitle, postLink) {
    createLinkPost(postTitle, postLink);
    var createdPost = utils.getNewestPost();
    commentOnPost(createdPost);
}

module.exports = {
    clickSubmitNewPost: clickSubmitNewPost,
    givenLoggedInAndOnSubmitNewPost: givenLoggedInAndOnSubmitNewPost,
    createTextPost: createTextPost,
    createLinkPost: createLinkPost,
    createTextPostWithComments: createTextPostWithComments,
    createLinkPostWithComments: createLinkPostWithComments
};