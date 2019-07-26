module.exports = function() {
  $.gulp.task('fonts', function() {
    return $.gulp.src('src/fonts/*',  { since: $.gulp.lastRun('fonts') })
      .pipe($.gulp.dest($.config.root + '/fonts'));
  });
};
