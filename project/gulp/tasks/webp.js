module.exports = function() {
  $.gulp.task('webp', function() {
    return $.gulp.src('./build/images/**/*.{png,jpg, jpeg}')
      .pipe($.gp.webp({quality: 80}))
      .pipe($.gulp.dest($.config.root + '/images/'));
  });
};