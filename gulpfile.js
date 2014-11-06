var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');

var paths = {
  js: [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/firebase/firebase.js',
    'bower_components/angularfire/dist/angularfire.js',
    'bower_components/underscore/underscore-min.js',
    'app/js/modules.js',
    'app/js/**/*.js'
  ],
  css: 'app/css/*.scss'
}

gulp.task('compile_scripts', function() {
  gulp.src(paths.js).
    pipe(sourcemaps.init()).
    pipe(concat('application.js')).
    pipe(sourcemaps.write()).
    pipe(gulp.dest('app/dist/'));
});

gulp.task('compile_stylesheets', function() {
  gulp.src(paths.css).
    pipe(sass()).
    pipe(sourcemaps.init()).
    pipe(concat('application.css')).
    pipe(sourcemaps.write()).
    pipe(gulp.dest('app/dist/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['compile_scripts']),
  gulp.watch(paths.css, ['compile_stylesheets'])
})

gulp.task('default', ['watch', 'compile_scripts', 'compile_stylesheets'])
