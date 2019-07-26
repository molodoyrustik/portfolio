module.exports = function() {
  $.gulp.task('webp.dev', function() {
    return $.gulp.src('./src/images/**/*.{png,jpg,jpeg}')
      .pipe($.gp.webp({quality: 80}))
      .pipe($.gulp.dest($.config.root + '/images/'));
  });
};