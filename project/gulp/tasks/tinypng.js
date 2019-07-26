module.exports = function() {
  $.gulp.task('tinypng', function() {
    return $.gulp.src('./src/images/**/*.{png,jpg,jpeg}')
      .pipe($.gp.tinypngFree({force: true}))
      .pipe($.gulp.dest($.config.root + '/images'));
  });
};
