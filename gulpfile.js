var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    fs = require('fs'),
    paths = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));

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
