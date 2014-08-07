var utils = require('./utils.js');

var loginFormObj = require('./objects/loginForm.js');

var signUpParts = require('./sign-up-parts.js');

describe('Create post scenarios', function(){
    beforeEach(function () {
        browser.get('/');
        utils.tryToLogout();
    });

    beforeEach(function() {
        var loginForm = loginFormObj.instance();
    });

    function clickSubmitNewPost(){
        element(by.css('.dpt-new-post-btn')).click();
    }

    describe('Scenario: Create a text post', function(){
        it('should see posts text and title', function () {
            var username = signUpParts.successfulSignUp();
            utils.tryToLogout();
            var loginForm = loginFormObj.instance();
            loginForm.get();
            loginForm.setLogin(username);
            loginForm.setPassword();
            loginForm.login();

            //And I had clicked on submit post button
            clickSubmitNewPost();

            //And I have entered post title and text
            var textForm = element(by.id('submitTextForm'));
            var postTitle = 'Awesome content inside';
            var postText = 'Barnabus "Barney" Stinson';
            textForm.element(by.id('textPostTitle')).sendKeys(postTitle);
            textForm.element(by.id('postText')).sendKeys(postTitle);

            //When I click on submit new text post
            textForm.element(by.css('.dpt-submit-text-post')).click();

            //Then I should see posts text and title
            expect(element(by.css('.dpt-post-title')).getText()).toMatch(postTitle);
            expect(element(by.css('.dpt-post-text')).getText()).toMatch(postText);
        });
    });

    describe('Scenario: Create a link post', function () {

    });

});
//Scenario: Create a text post
//Given I am on a main page
//And I had logged in
//And I had clicked on submit post button
//And I have entered post title and text
//When I click on submit new text post
//Then I should see posts text and title
//
//Scenario: Create a link post
//Given I am on a main page
//And I had logged in
//And I had clicked on submit post button
//And I had selected submit link tab
//And I have entered post title and URL
//When I click on submit new link post
//Then I should see posts title
//And it should notice that title is a href link with URL I specified
