tarot-VI
========

The purpose of this project is to build the tarot app without scaffolding in order to learn. 

The client portion of the app is based on ngBolierplate. It includes Grunt task runner, Bower front end package manager, karma for unit tests, Protractor for end to end tests, and node based SASS compilation.

The server portion of the app will be used for the API and to serve compiled static client code. It is built with node express and mongoDB.

## Client Code Quick Start

Install Node.js and then:

```sh
$ git clone https://github.com/simplesthing/tarot-VI.git
$ cd tarot-VI/client
$ sudo npm -g install grunt-cli bower protractor
$ npm install
$ bower install
$ grunt watch
```

## Running End to End Tests
```sh
$ webdriver-manager update
grunt e2e
```