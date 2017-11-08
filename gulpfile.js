var gulp = require('gulp');
var fileInline = require('gulp-file-inline');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
//拷贝预加载图片
gulp.task('cp-src', function(cb) {
  gulp.src(['./html/splash.png'])
  .pipe(gulp.dest('./build/web-mobile/')
  .on('end', cb));
});
//样式合并
gulp.task('concat-css', ['cp-src'], function(cb) {
  gulp.src(['./build/web-mobile/style-mobile.css', './html/loading.css'])
  .pipe(concat('style-mobile.css'))
  .pipe(gulp.dest('./build/web-mobile/')
  .on('end', cb));
});
gulp.task('htmlmin', ['concat-css'], function(cb) {
  gulp.src('./html/index.html')
  .pipe(gulp.dest('./build/web-mobile/')
  .on('end', cb));
});
gulp.task('resRev',['htmlmin'], function (cb) {
  gulp.src(['', '']);
});
gulp.task('default',['resRev'], function(cb) {
  gulp.src(['', './build/web-mobile/index.html'])
      .pipe(revCollector())
      .pipe(gulp.dest('./build/web-mobile/'));
  gulp.src(['./build/web-mobile/*.json', './build/web-mobile/main*.js'])
      .pipe(revCollector({
        replaceReved: true
      }))
      .pipe(gulp.dest('./build/web-mobile/')); 
});