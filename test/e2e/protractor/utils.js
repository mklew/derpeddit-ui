module.exports = {
    tryToLogout: function tryToLogout() {
        element(by.id('logout-link')).getCssValue('display').then(function (v) {
            if (!/none.*/.test(v)) {
                element(by.id('logout-link')).click();
            }
            else {
                console.log('log out link is not visible')
            }
        });
    },
    randomUsername: function randomUsername() {
        function randomNumber() {
            return Math.floor((Math.random() * 90000000) + 1);
        }

        return 'John' + randomNumber() + '-' + randomNumber() + '-' + randomNumber()
    }
};