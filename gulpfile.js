const { series, parallel, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

function clean(cb) {
  console.log("clean")
  cb();
}

function css(cb) {
  console.log('css')
  cb();
}

function javascript(cb) {
    return src('scripts/templates/*.js')
    .pipe(rename({suffix: "-compiled"}))
    .pipe(dest('assets/'))
    .pipe(webpackStream())
}

exports.build = series(clean, parallel(css, javascript));