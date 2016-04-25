var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var minify = require('gulp-minify');
var fileName =  'saveHtmlToPdf' ;

var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");


gulp.task('compress', function (cb) {
  pump([
        gulp.src('dist/'+fileName+'.js') ,
      uglify(),
      rename({
      suffix: '.min'
    }),
      gulp.dest('dist')
        
    ],
    cb
  );
});


gulp.task('concat', function() {
  return gulp.src('src/*.js')
   // .pipe(sourcemaps.init())
      .pipe(concat(fileName+'.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});