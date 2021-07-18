"use strict";

// INCLUDES

// Gulp
const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");
const rename = require("gulp-rename");

// Markup
const htmlmin = require("gulp-htmlmin");

// Styles
var sass = require('gulp-sass')(require('sass'));
const cleanCSS = require("gulp-clean-css");
var concat = require("gulp-concat");

// Scripts
const uglify = require("gulp-uglify-es").default;
const babel = require("gulp-babel");

// Paths
const { paths } = require("./package.json");

// TASKS

// Delete ./dist/ folder
const clean = () => del(paths.generic.dest);
exports.clean = clean;
exports.clean.description = "Delete dist/ folder";

// Markup
// Minify markup and place in ./dist/
const markup = () =>
  src(paths.markup.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.markup.dest));

// Styles
// minify and place in ./dist/css
const styles = () =>
  src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(concat("main.min.css"))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());

// Scripts
// Minify scripts and place in ./dist/js
const scripts = () =>
  src(paths.scripts.src)
  .pipe(babel({presets: ['@babel/preset-env'] })) 
  .pipe(dest(paths.scripts.dest));
    
// Lib Scripts
const libScripts = () =>
src(paths.libScripts.src)
  .pipe(dest(paths.libScripts.dest));


// Build
const build = parallel(markup, styles, scripts, libScripts);
exports.build = series(clean, build);
exports.build.description = "Clean, build ";

// Watch
const watchFiles = done => {
  browserSync.init({ server: { baseDir: paths.generic.dest } });
  watch(paths.markup.src).on("change", series(markup, browserSync.reload));
  watch(paths.styles.src, styles);
  watch(paths.scripts.src).on("change", series(scripts, browserSync.reload));
  // watch(paths.assets.src).on("change", series(assets, browserSync.reload));
  done();
};

watchFiles.displayName = "Watch";
exports.default = series(clean, build, watchFiles);
exports.default.description = "Clean, build, watch src/ folder";
