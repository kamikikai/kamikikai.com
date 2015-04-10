'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
//var runSequence = require('run-sequence');
//var exec = require('child_process').exec;
//var spawn = require('child_process').spawn;
//var path = require('path');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles', function () {
  return gulp.src('app/styles/styles.less')
    .pipe($.less({
      paths: ['app/styles']
    }))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('jade', function () {
  return gulp.src('app/*.jade')
    .pipe($.jade({
      locals: {}
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['jade', 'styles'], function (cb) {
  browserSync({
    server: {
      baseDir: ['dist']
    },
    open: true
  }, function () {
    gulp.watch(['app/**/*.jade'], ['jade']);
    gulp.watch(['dist/**/*.html'], [browserSync.reload]);
    gulp.watch(['app/**/*.less'], ['styles']);
    gulp.watch(['dist/**/*.css'], [browserSync.reload]);
    cb();
  });
});
