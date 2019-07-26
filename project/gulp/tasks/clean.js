module.exports = function() {
  $.gulp.task('clean', function() {
    return $.del([
      $.config.root
    ]);
  });
};
