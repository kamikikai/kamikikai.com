'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var del = require('del');
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
var env = 'dev';

gulp.task('styles', function () {
  return gulp.src('app/styles/styles.less')
    .pipe($.less({
      paths: ['app/styles', 'app/bower_components']
    }))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.csso())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('jade', function () {
  return gulp.src('app/*.jade')
    .pipe($.inject(gulp.src('app/images/logo.svg'), {
      transform: function (filepath, file, i, length) {
        return file.contents.toString();
      },
      name: 'app/images/logo'
    }))
    .pipe($.inject(gulp.src(mainBowerFiles({filter: '**/*.js'}), {read: false}), {relative: true}))
    .pipe($.jade({
      locals: {
        env: env
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts:bower', function () {
  return gulp.src(mainBowerFiles({filter: '**/*.js'}))
    .pipe($.concat('vender.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/*.js')
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('copy', function () {
  return gulp.src([
    'app/**/*',
    '!app/*.js',
    '!app/*.jade',
    '!app/**/*.less'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('copy:dist', function () {
  return gulp.src([
    'app/**/*',
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
    gulp.watch(['dist/**/*.{html,css,js,svg}'], browserSync.reload);
    cb();
  });
});

gulp.task('clean', del.bind(null, ['dist/*']));

gulp.task('default', ['del'], function (cb) {
  env = 'prod';
  runSequence(['jade', 'styles', 'scripts', 'scripts:bower', 'copy:dist'], cb);
});
