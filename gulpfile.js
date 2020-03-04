const {watch, src, series, parallel, dest} = require('gulp');
const fs = require('fs')
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const filePath = require('path');
const livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();

var WebpackDevServer = require("webpack-dev-server");

function clean(cb) {
  cb();
}

function css(cb) {
  console.log('css')
  cb();
}

function returnJSWebpackConfig(path){
  return {
    entry: {
      [filePath.parse(path).name]: "./" + path
    },
    output: {
      filename: '[name]-compiled.js',
      path: __dirname + '/assets'
    }, 
    mode: "production"
  }
}

function bundleTemplateFile(path){
  let config = returnJSWebpackConfig(path)
  return src(path)
    .pipe(webpackStream(config))
    .pipe(dest('assets'))
}

async function javascript(cb) {
    browserSync.init({
        proxy: {
          target: "https://bismuth-themekit.myshopify.com?preview_theme_id=91305705517"
        },
        snippetOptions: {
          rule: {
              match: /<\/body>/i,
              fn: function (snippet, match) {
                  return snippet + match;
              }
          }
      },
    });
    //watches template files
    watch(['./scripts/templates/*.js'], { ignoreInitial: false }).on('all', function(event, path){
      console.log(path)
      bundleTemplateFile(path)
      setTimeout(() => {browserSync.reload()}, 1000)
    })
    //watches modules
    watch(['./scripts/components/*.js']).on('all', function(event, path){
      let moduleName = filePath.parse(path).name
      fs.readdir("./scripts/templates/", function (err, files) {
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            fs.readFile("./scripts/templates/" + file, function (err, data) {
              if (err) throw err;
              if(data.indexOf(moduleName) >= 0){
               bundleTemplateFile("scripts/templates/" + file)
              }
            });
        });
    });
    })

  }


  exports.build = series(clean, parallel(css, javascript));