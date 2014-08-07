var utils = require('./utils.js');

var signUpParts = require('./sign-up-parts.js');

describe('signup scenarios', function () {
    beforeEach(function () {
        browser.get('/');
        utils.tryToLogout();
    });

    afterEach(function () {
        utils.tryToLogout();
    });



    function clickSignUp() {
        element(by.css('.dpt-sign-up')).click();
    }

    function enterUsernameAndPass(username) {
        var form = element(by.id('signUpForm'));
        form.element(by.id('login')).sendKeys(username);
        form.element(by.id('password')).sendKeys('pass');
    }

    function clickSignUpBtn() {
        return element(by.css('.dpt-sign-up-btn')).click();
    }

    function successfulSignUp() {
        //And I clicked on a sign up link
        clickSignUp();
        //And I entered login and password
        var username = utils.randomUsername();
        var form = element(by.id('signUpForm'));
        enterUsernameAndPass(username);
        //And I repeated password once more matching previous input
        form.element(by.id('repeatPassword')).sendKeys('pass');

        //When I click on Sign up
        clickSignUpBtn();
        return username;
    }

    describe('Scenario: Successful signup', function () {
        //Given I am on a main page

        it('should signup successfully', function () {
            var username = signUpParts.successfulSignUp();

            //Then I should see "Submit new post" button
            expect(element(by.css('.dpt-new-post-btn:not(ng-hide)')).isPresent()).toBe(true);
            //And I should notice my name and logout link in the navbar
            expect(element(by.css('.dpt-greeting')).getText()).toMatch('.*' + username + '.*');
            //And I should notice that login&signup disappeared
            expect(element(by.css('.dpt-login-and-signup')).getCssValue('display')).toMatch('none.*');
        })
    });

    describe('Scenario: Password validation', function () {

        it('should report mismatched passwords', function () {
            clickSignUp();
            var username = utils.randomUsername();
            enterUsernameAndPass(username);
            var form = element(by.id('signUpForm'));
            form.element(by.id('repeatPassword')).sendKeys('NOT MATCHED');

            clickSignUpBtn();

            expect(form.element(by.id('dpt-passwords-do-not-match')).getText()).toEqual("Passwords didn't match");
        });
    });

    describe('Scenario: Missing fields validation', function () {
        it('should report missing fields', function () {
            clickSignUp();
            clickSignUpBtn();
            var er = element(by.id('dpt-required-login-error'));
            expect(er.getText()).toMatch('required');
            expect(er.getCssValue('display')).toNotMatch('none.*');
        });
    });

    //Scenario: Server side validation
    //Given I am on a main page
    //And I had successfully signed up before
    //And I clicked on a sign up link
    //And I entered same credentials as before
    //When I click on sign up
    //Then I should see error message from derpeddit
    describe('Scenario: Server side validation', function () {
        it('should report error', function () {
            var username = signUpParts.successfulSignUp();
            expect(element(by.css('.dpt-greeting')).getText()).toMatch('.*' + username + '.*');
            utils.tryToLogout();
            console.log('reusing usename', username);
            clickSignUp();
            enterUsernameAndPass(username);
            var e = element(by.id('dpt-sign-up-error'));
            expect(e.isPresent()).toBe(false);
            clickSignUpBtn().then(function(){
                expect(e.isPresent()).toBe(true);
            });

        });
    })
});
