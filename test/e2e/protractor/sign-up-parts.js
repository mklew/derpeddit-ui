var utils = require('./utils.js');

module.exports = {
    successfulSignUp: function successfulSignUp() {
        function clickSignUpBtn() {
            return element(by.css('.dpt-sign-up-btn')).click();
        }

        function enterUsernameAndPass(username) {
            var form = element(by.id('signUpForm'));
            form.element(by.id('login')).sendKeys(username);
            form.element(by.id('password')).sendKeys('pass');
        }

        function clickSignUp() {
            element(by.css('.dpt-sign-up')).click();
        }


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
};






