var HomePage = function() {
  this.home = element(by.id('home'));

  this.get = function() {
    browser.get('index.html');
  };  
};

describe( 'Navigate to home page', function() {
  it ( 'should allow navigation to the home page', function() {
    var homePage = new HomePage();

    homePage.get();
    expect(homePage.home.getText()).toEqual('Tarot VI');

  }); 
});