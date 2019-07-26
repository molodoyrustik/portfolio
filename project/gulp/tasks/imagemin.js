module.exports = function() {
  $.gulp.task('imagemin', function() {
    return $.gulp.src('./src/images/**/*.{png,jpg,svg}')
      .pipe($.gp.imagemin([
        $.gp.imagemin.optipng({optimizationLevel: 7}),
        $.gp.imagemin.jpegtran({quality: 60}),
        $.gp.imagemin.svgo()
      ]))
      .pipe($.gulp.dest($.config.root + '/images'));
  });
};
