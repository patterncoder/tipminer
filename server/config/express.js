
var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport');
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function (app, config) {

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');


    function compile(str, path) {
        return stylus(str).set('filename', path);

    }
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
        resave: true}));
    app.use(passport.initialize());
    app.use(passport.session());

    //app.configure(function () {
    //    app.set('port', process.env.PORT || 3000);
    //    app.set('views', config.rootPath + '/server/views');
    //    app.set('view engine', 'jade');
    //    app.use(express.logger('dev'));
    //    app.use(express.cookieParser());
    //    app.use(express.session({ secret: 'tipminer unicorns' }));
    //    app.use(passport.initialize());
    //    app.use(passport.session());
    //    app.use(express.bodyParser());
    //    app.use(stylus.middleware(
    //        {
    //            src: config.rootPath + '/public',
    //            compile: compile
    //        }
    //    ));
    //    app.use(express.static(config.rootPath + '/public'));

    //});

};