var gulp = require('gulp');

// MODULES
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var jsMinify = require('gulp-uglify');
var cssMinify = require('gulp-cssmin');
var rename = require('gulp-rename');

//----------
// TASKS
//----------

// PARSE HTML, MINIFY, AND COPY TO NEW LOCATION
gulp.task('html', function() {
  return gulp.src('index-staging.html')
    .pipe(useref())
    .pipe(gulpif(['js/*.js','js/**/*.js'], jsMinify()))
    .pipe(gulpif('css/*.css', cssMinify()))
    .pipe(gulpif('index-staging.html', rename('index.html')))
    .pipe(gulp.dest(''));
});

// MINIFY USERMAP.JS
gulp.task('js', function() {
  return gulp.src('js/usermap.js')
    .pipe(jsMinify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('js/'));
})

// RUN PARSE HTML TASK
gulp.task('default', ['html','js'], function() {});
