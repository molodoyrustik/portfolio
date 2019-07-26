module.exports = function() {
  $.gulp.task('copy.image', function() {
    return $.gulp.src('./src/images/**/*.*', { since: $.gulp.lastRun('copy.image') })
      .pipe($.gulp.dest($.config.root + '/images'));
  });
};
