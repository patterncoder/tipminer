var gulp = require('gulp');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var karma = require('karma').server;

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('lint', function () {

    return gulp.src(['./public/app/**/*.js',
           './public/app/app.js',
           './server/**/*.js',
           './*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('ngAnnotate', function () {
    return gulp.src('./public/app/app.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'));
});

gulp.task('default',['lint', 'test', 'ngAnnotate']);