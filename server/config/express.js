var express = require('express');
var stylus = require('stylus');
var passport = require('passport');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function (app, config) {
    function compile(str, path) {
            return stylus(str).set('filename', path);
        }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(stylus.middleware(
                {
                    src: config.rootPath + '/public',
                    compile: compile
                }
            ));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(config.rootPath + '/public'));
    app.use(session({
        secret: 'tipminer unicorns',
        saveUninitialized: true,
        resave: true,
        cookie: {maxAge:1200000}
        }));
    app.use(passport.initialize());
    app.use(passport.session());

};