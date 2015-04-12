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
      paths: ['app/styles', 'app/bower_components']
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

gulp.task('scripts', function () {
  return gulp.src('app/scripts/*.js')
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('copy', function () {
  return gulp.src([
    'app/*',
    '!app/*.js',
    '!app/*.jade',
    '!app/**/*.less',
    '!app/bower_components'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('serve', ['jade', 'styles', 'scripts', 'copy'], function (cb) {
  browserSync({
    server: {
      baseDir: ['dist']
    },
    open: !!~process.argv.indexOf('--open')
  }, function () {
    gulp.watch(['app/**/*.jade'], ['jade']);
    gulp.watch(['app/**/*.less'], ['styles']);
    gulp.watch(['app/**/*.js'], ['scripts']);
    gulp.watch(['dist/**/*.{html,css,js}'], browserSync.reload);
    cb();
  });
});
