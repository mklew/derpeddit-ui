var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

describe('index page scenarios', function() {
    beforeEach(function(){
        browser.get('http://localhost:9000/');
    });

    function postsSortedByScore() {
        var posts = element.all(by.repeater('post in postsIndex.posts'));

        posts.get(0).element(by.model('post.score')).getAttribute('value').then(function(s1){
            posts.get(1).element(by.model('post.score')).getAttribute('value').then(function(s2){
                expect(parseInt(s1) >= parseInt(s2)).toBe(true);
            })
        })
    }

    describe('Scenario: Index page', function(){
        it('should see posts sorted by vote score', function() {
            postsSortedByScore()
        });

        it('should notice that top link is highlighted', function(){
            expect(hasClass(element(by.id('topPosts')),'active'));
        });
    });

    describe('Scenario: Newest posts', function(){

        //When I click on a newest posts link
        beforeEach(function(){
            element(by.id('newestPosts')).click();
        });

        it('should see posts sorted by submit time', function(){
            var posts = element.all(by.repeater('post in postsIndex.posts'));

            posts.get(0).evaluate('post.created').then(function(c1){
                posts.get(1).evaluate('post.created').then(function(c2){
                    expect(Date.parse(c1) >= Date.parse(c2)).toBe(true);
                })
            });
        });

        it('should notice that newest link is highlighted', function(){
            expect(hasClass(element(by.id('newestPosts')),'active'));
        });
    });

    describe('Scenario: Top posts', function(){
        //And I have previously clicked on a newest post link
        beforeEach(function(){
            element(by.id('newestPosts')).click();
            element(by.id('topPosts')).click();
        });

        //When I click on a top posts link

        it('I should see posts sorted by vote score', function(){
            postsSortedByScore()
        });

        it('I should notice that top link is highlighted', function(){
            expect(hasClass(element(by.id('topPosts')),'active'));
        });
    });

});