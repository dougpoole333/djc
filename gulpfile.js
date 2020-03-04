const {watch, src, series, parallel, dest} = require('gulp');
const fs = require('fs')
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const livereload = require('gulp-livereload');
var bs = require('browser-sync').create(); 

function clean(cb) {
  cb();
}

function css(cb) {
  console.log('css')
  cb();
}


async function javascript(cb) {
    bs.init({
        target: "bismuth-themekit.myshopify.com/" // makes a proxy for localhost:8080
    });
    watch(['./scripts/templates/*.js'], async function() {
    var files = await fs.readdirSync('./scripts/templates/').map(el => './scripts/templates/' + el);
      return src(files)
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(dest('./assets'))
    }).on('change', bs.reload)
  }

  exports.build = series(clean, parallel(css, javascript));