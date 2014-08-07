var utils = require('./utils.js');

describe('Create post scenarios', function(){
    beforeEach(function () {
        browser.get('/');
        utils.tryToLogout();
    });

    beforeEach(function() {

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
