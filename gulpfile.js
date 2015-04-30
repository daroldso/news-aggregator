var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
// var connect = require('gulp-connect');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('css', function () {
  gulp.src('source/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
  gulp.src('source/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
  gulp.src('build/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-vendors', function () {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/modernizr/modernizr.js'
  ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('image', function () {
  gulp.src('source/images/*')
    .pipe(imagemin({
      optimizationLevel: 2,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/images'));
});

gulp.task('refresh', function () {
  gulp.src('build/index.html')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
  gulp.watch('source/scss/*.scss', ['css']);
  // gulp.watch('source/jade/*.jade', ['html']);
  gulp.watch('build/js/*.js', ['js']);
  gulp.watch('build/index.html', ['refresh']);
});

// gulp.task('connect', function () {
  // connect.server({
  //   root: 'build',
  //   livereload: true,
  //   open: true
  // });
// });

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "build"
    }
  });
});

gulp.task('default', ['css', 'html', 'js']);
gulp.task('start', ['browser-sync', 'watch']);
// gulp.task('start', ['connect', 'watch']);