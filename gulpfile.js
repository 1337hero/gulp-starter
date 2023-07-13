// Mike's Gulp Starter Workflow
'use strict';

// Plugins
const gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    partials = require('gulp-inject-partials'),
    jsImport = require('gulp-js-import'),
    purgecss = require('gulp-purgecss'),
    cssnano = require('cssnano'),
    htmlmin = require('gulp-htmlmin'),
    postcss = require('gulp-postcss'),
    concat = require('gulp-concat'),
    config = require('./config'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean-css'),
    webp = require('gulp-webp'),
    maps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass'));

// File Paths
const base = './',
    src = base + 'dev',
    dest = base + 'dist',
    paths = {
        js: src + '/js/app.js',
        img: src + '/img/*.{jpg,png,svg,gif,ico,webp}',
        html: src + '/html/*.html',
        scss: src + '/sass/app.scss',
        fonts: src + '/fonts/*'
    };

// SASS => CSS
function css() {
    return gulp.src(paths.scss)
        .pipe(maps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(clean()) // for minifying the file
        .pipe(rename('styles.css'))
        .pipe(maps.write())
        .pipe(gulp.dest(dest + '/css'))
        .pipe(browserSync.stream());
}

// HTML Partials
function html() {
    return gulp.src(paths.html)
        .pipe(partials({
            start: '<% {{path}} ',
            end: '%>',
            removeTags: true
        }))
        .pipe(nunjucksRender({data: config}))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.stream());
}

// Copy Fonts
function fonts() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dest + '/fonts'));
}

// Do stuff with Images
function img() {
    return gulp.src(paths.img)
        .pipe(webp())
        .pipe(gulp.dest(dest + '/img'));
}

// Do Javascript Stuff 
function js() {
    return gulp.src(paths.js)
        .pipe(maps.init())
        .pipe(jsImport({hideConsole: false}))
        .pipe(concat('scripts.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(dest + '/js'))
        .pipe(browserSync.stream());
}

// Watch for changes & do stuff
function watchFiles() {
    gulp.watch(src + '/sass/**', css);
    gulp.watch(src + '/html/**', html);
    gulp.watch(src + '/js/**', js);
}

// Run a server 
function server() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watchFiles(); // Move watchFiles() here to avoid running it twice
    browserSync.watch(dest + '/**/*.*').on('change', browserSync.reload);
}

// Purge CSS
function purgecssRejected() {
    return gulp.src('dev/sass/*.scss')
        .pipe(rename({
            suffix: '.rejected'
        }))
        .pipe(purgecss({
            content: ['dev/html/*.html'],
        }))
        .pipe(gulp.dest('build/css'));
}
gulp.task('purgecss-rejected', gulp.series(purgecssRejected));

// Complex tasks
const dev = gulp.parallel(html, css, js, fonts, img, server);
const build = gulp.series(html, css, js, fonts, img);

// Export tasks
exports.default = dev;
exports.dev = dev;
exports.build = build;

exports.img = img;