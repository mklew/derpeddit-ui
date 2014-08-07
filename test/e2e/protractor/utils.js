function randomNumber() {
    return Math.floor((Math.random() * 90000000) + 1);
}

function getNewestPost() {
    element(by.id('newestPosts')).click();
    return element.all(by.repeater('post in postsIndex.posts')).first();
}

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
        return 'John' + randomNumber() + '-' + randomNumber() + '-' + randomNumber()
    },
    randomComment: function(){
        return "Woohoo" + randomNumber();
    },
    getNewestPost: getNewestPost
};