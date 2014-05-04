tarot-VI
========

The purpose of this project is to build the tarot app without scaffolding in order to learn. 

The client portion of the app is modeled after ngBolierplate, to include Grunt task runner, Bower front end package manager and E2E testing. Differences are application structure to include both server and client code base in one git repo, use of SASS over LESS and protractor over karma.

The server portion of the app is the API for the client. It will be using node with a NoSQL data store.

## Quick Start

Install Node.js and then:

```sh
$ git clone https://github.com/simplesthing/tarot-VI.git
$ cd tarot-VI
$ sudo npm -g install grunt-cli bower protractor
$ npm install
$ bower install
$ webdriver-manager update
$ grunt watch
```