var gulp = require('gulp'),
    concat = require('gulp-concat'),
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
    pipe(concat('application.js')).
    pipe(gulp.dest('app/dist/'));
});

gulp.task('compile_stylesheets', function() {
  gulp.src(paths.css).
    pipe(sass()).
    pipe(concat('application.css')).
    pipe(gulp.dest('app/dist/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['compile_scripts']),
  gulp.watch(paths.css, ['compile_stylesheets'])
})

gulp.task('build', ['compile_scripts', 'compile_stylesheets'])
gulp.task('default', ['watch', 'compile_scripts', 'compile_stylesheets'])
