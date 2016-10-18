var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');


var jsPath = [
    '/PATHTO/js/file.js',
    '/PATHTO/js/tools/*.js'
];

var cssPath = [
    '/PATHTO/css/core.css',
    '/PATHTO/css/*.css'
];

var htmlPath = [
    '/PATHTO/templates/index.html',
    '/PATHTO/templates/*.html'
];

gulp.task('minifyCss', function(done) {
    gulp.src(cssPath)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'))
        .on('end', done);
});

gulp.task('minifyJs', function(done) {
    gulp.src(jsPath)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .on('end', done);
});

gulp.task('minifyHtml', function(done){
    gulp.src(htmlPath)
        .pipe(concat('main.html'))
        .pipe(gulp.dest('./dist/'))
        .on('end', done);
});

gulp.task('default', ['minifyCss', 'minifyJs']);
