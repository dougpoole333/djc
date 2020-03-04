const {watch, src, series, parallel, dest} = require('gulp');
const fs = require('fs')
const yaml = require('js-yaml');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const filePath = require('path');
var browserSync = require('browser-sync').create();

function getProps(cb) {
  var doc = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
  return doc
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

function browserSyncInit(){
 let props = getProps()
 browserSync.init({
    proxy: {
      target: `https://${props.development.store}?preview_theme_id=${props.development.theme_id}`
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
  watch(['./theme_reload']).on('all', function(){
    setTimeout(browserSync.reload, 1000)
  })
}

async function javascript(cb) {
    browserSyncInit()
    //watches template files
    watch(['./scripts/templates/*.js'], { ignoreInitial: false }).on('all', function(event, path){
      console.log(path)
      bundleTemplateFile(path)
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


  exports.watch = series(parallel(css, javascript));