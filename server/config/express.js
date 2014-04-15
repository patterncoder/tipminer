
var express = require('express')
    ,stylus = require('stylus')
    ,passport = require('passport');


module.exports = function (app, config){




        function compile(str, path){
            return stylus(str).set('filename', path);

        }

        app.configure(function(){
            app.set('port', process.env.PORT || 3000);
            app.set('views', config.rootPath + '/server/views' );
            app.set('view engine', 'jade');
            app.use(express.logger('dev'));
            app.use(express.cookieParser());
            app.use(express.session({secret: 'tipminer unicorns'}));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(express.bodyParser());
            app.use(stylus.middleware(
                {
                    src: config.rootPath + '/public',
                    compile: compile
                }
            ));
            app.use(express.static(config.rootPath + '/public'));

        });

}