"use strict";

// Load plugins
import autoprefixer from "gulp-autoprefixer";
import browsersynclib from "browser-sync";
import cleanCSS from "gulp-clean-css";
import { deleteAsync as del } from "del";
import gulp from "gulp";
import header from "gulp-header";
import merge from "merge-stream";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import sass from 'gulp-dart-sass';

const browsersync = browsersynclib.create();
const { src, dest, watch, series, parallel } = gulp;
const { logError } = sass;

// Load package.json for banner
import pkg from './package.json' assert {type: 'json'};

// Set the banner content
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/StartBootstrap/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./public"
    },
    port: 8080
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./public/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = src('./node_modules/bootstrap/dist/**/*')
    .pipe(dest('./public/vendor/bootstrap'));
  // Font Awesome CSS
  var fontAwesomeCSS = src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
    .pipe(dest('./public/vendor/fontawesome-free/css'));
  // Font Awesome Webfonts
  var fontAwesomeWebfonts = src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
    .pipe(dest('./public/vendor/fontawesome-free/webfonts'));
  // jQuery Easing
  var jqueryEasing = src('./node_modules/jquery.easing/*.js')
    .pipe(dest('./public/vendor/jquery-easing'));
  // jQuery
  var jquery = src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(dest('./public/vendor/jquery'));
  // Simple Line Icons
  var simpleLineIconsFonts = src('./node_modules/simple-line-icons/fonts/**')
    .pipe(dest('./public/vendor/simple-line-icons/fonts'));
  var simpleLineIconsCSS = src('./node_modules/simple-line-icons/css/**')
    .pipe(dest('./public/vendor/simple-line-icons/css'));
  return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, jquery, jqueryEasing, simpleLineIconsFonts, simpleLineIconsCSS);
}

// CSS task
function css() {
  return src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(dest("./public/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(dest("./public/css"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  watch("./scss/**/*", css);
  watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = series(clean, modules);
const build = series(vendor, css);
const watchfn = series(build, parallel(watchFiles, browserSync));

// Export tasks
const _css = css;
export { _css as css };
const _clean = clean;
export { _clean as clean };
const _vendor = vendor;
export { _vendor as vendor };
const _build = build;
export { _build as build };
const _watch = watchfn;
export { _watch as watch };
const _default = build;
export { _default as default };
