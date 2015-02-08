var gulp = require('gulp');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var karma = require('karma').server;
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var util = require('gulp-util');

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('lint', function () {

    return gulp.src(['./public/app/**/*.js',
           './public/app/app.js',
           //'./public/js/*.js', //jshint no likey the uglified files
           './server/**/*.js',
           './*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify', function () {
    return gulp.src(['./public/app/**/*.js',
           './public/app/*.js'
    ])
    .pipe(ngAnnotate())

    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename('all_min.js'))
    .pipe(uglify({mangle: false}).on('error', util.log))  //need to figure out why this breaks the code
    .pipe(gulp.dest('./public/js'));
});

//gulp.task('ngAnnotate', function () {
//    return gulp.src('./public/app/app.js')
//        .pipe(ngAnnotate())
//        .pipe(gulp.dest('dist'));
//});

//gulp.task('default', ['lint', 'minify', 'test']);
gulp.task('default', ['lint', 'minify']);
//gulp.task('default', function () {
//    gulp.run('lint');
//    gulp.run('minify');
//});