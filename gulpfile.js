var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');

gulp.task('assets', function() {
  gulp.src([
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/firebase/firebase.js',
    'bower_components/angularfire/dist/angularfire.js',
    'bower_components/underscore/underscore-min.js',
    'app/js/modules.js',
    'app/js/**/*.js'
  ]).
    pipe(sourcemaps.init()).
    pipe(concat('application.js')).
    pipe(sourcemaps.write()).
    pipe(gulp.dest('app/dist/'));

  gulp.src('app/css/*.scss').
    pipe(sass()).
    pipe(sourcemaps.init()).
    pipe(concat('application.css')).
    pipe(sourcemaps.write()).
    pipe(gulp.dest('app/dist/'));
});

gulp.task('default', ['assets'])
