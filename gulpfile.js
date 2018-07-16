// Mike's Gulp Starter Workflow
'use strict';

// TO DO LIST: 
// 1.) Add production build function & seperate default
// 2.) JS Import doesn't work - can't go up a directory, need a replacement
// 3.) Imagemin - says it compressed images, isn't sending anything to dest folder??

// Require our stuff
var    gulp = require('gulp'),
browserSync = require('browser-sync').create(),
   partials = require('gulp-inject-partials'),
   cleanCSS = require('gulp-clean-css'),
   jsImport = require('gulp-js-import'),
   imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
     concat = require('gulp-concat'),
     uglify = require('gulp-uglify'),
     rename = require('gulp-rename'),
      gutil = require('gulp-util'),
       sass = require('gulp-sass'),
       maps = require('gulp-sourcemaps');


// Set those paths
const base_path = './',
            src = base_path + '_src',
           dist = base_path + 'build',
          paths = {
              js: src + '/js/*.js',
             img: src + '/img/*',
            html: src + '/html/*.html',
            scss: src + '/sass/app.scss'
          };


// Do stuff with HTML
gulp.task('makeHTML', function () {
    return gulp.src(paths.html)
        .pipe(partials({
            start: '<% {{path}} ',
              end: '%>',
           removeTags: true
           }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});


// Do stuff with SASS
gulp.task('makeCSS', () => {
    return gulp.src(paths.scss)
        .pipe(maps.init())
        .pipe(sass())
        .pipe(cleanCSS({compatibility: '*'}, {level: '2'}))
        .pipe(rename('styles.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(dist + '/assets'))
        .pipe(browserSync.stream());
});


// Do stuff with Javascript
gulp.task('makeJS', () => {
    return gulp.src(paths.js)
        .pipe(maps.init())
        .pipe(jsImport({hideConsole: false}))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename('scripts.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(dist + '/assets'))
        .pipe(browserSync.stream());
});


// Let's compress some images
gulp.task('compressIMG', () => {
    return gulp.src(paths.img)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        pipe(gulp.dest(dist + '/img'));
});


// Watch for changes and do stuff
gulp.task('watch' , () => {
    gulp.watch(paths.scss, ['makeCSS']);
    gulp.watch(paths.js, ['makeJS']);
    gulp.watch('./build/*.html').on('change', browserSync.reload);
});


// Setup a Gulp Server with Browser Sync
gulp.task('serve', ['makeHTML', 'makeCSS', 'makeJS'], function() {
    browserSync.init({
        server: './build/'
    });
    gulp.watch(src + '/sass/*.scss', ['makeCSS']);
    gulp.watch(paths.js, ['makeJS']);
    gulp.watch(paths.html, ['makeHTML']);
    gulp.watch(src + '/html/inc/*.html', ['makeHTML']); // pay attention to inc folder too
});


// Do this stuff by default
gulp.task('default', ['serve']);