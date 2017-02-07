var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');

gulp.task('sass', function () {
  gulp.src('css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});
 
gulp.task('autoprefixer', function () {
    return gulp.src('css/*.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        flexbox: true,
        cascade: false
      }))
      .pipe(rename('dev.min.css'))
      .pipe(gulp.dest('css/css'));
});

gulp.task('minify-css', function() {
  return gulp.src('css/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/css'))
    .pipe(livereload());
});
 
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('css/**/*.scss', ['sass']);
  gulp.watch('css/*.css', ['autoprefixer'] );
  gulp.watch('css/css/*.css', ['minify-css'] );

});




