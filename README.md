tarot-VI
========

The purpose of this project is to build the tarot app without scaffolding in order to learn all the bits from the ground up. Naturally there is a good amount of open source code copying, but it has been done with the sole intent of learning the functionality.

The client portion of the app is based on [ngBolierplate](http://joshdmiller.github.io/ng-boilerplate/#/home). It includes Grunt task runner, Bower front end package manager, karma for unit tests, Protractor for end to end tests, node based SASS compilation. SVG animated icons is based on demo from [codrops](http://tympanus.net/codrops/2013/11/05/animated-svg-icons-with-snap-svg/).

The server portion of the app is used for the API and to serve compiled static client code. There was no boilerplate and it is rough as it is my first node application, it should be obvious that I am learning as I go. Authentication code is based on [angular-passport](https://github.com/DaftMonk/angular-passport), and currently still very much a work in progress.

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
The code will be copied over to the public folder in the server for livereloading during development.

## Running End to End Tests
```sh
$ webdriver-manager update
grunt e2e
```

## Server Code Quick Start

```sh
$ cd tarot-VI/server
$ npm install
$ forever start app.js
```

Since Card Database is not included with repo you would need to create your own card meanings based on mongoose schema.

Also required to generate local ssl certificates for https in development env, [stackoverflow link how-to](http://stackoverflow.com/questions/16610612/create-https-server-with-node-js).
