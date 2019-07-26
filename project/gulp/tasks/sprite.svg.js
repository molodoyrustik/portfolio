'use strict';

module.exports = function() {
  $.gulp.task('sprite.svg', function() {
    return $.gulp.src('./src/images/icons/*.svg')
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgstore({
        inlineSvg: true
      }))
      .pipe($.gp.rename('sprite.svg'))
      .pipe($.gulp.dest('./src/images/icons'))
  })
};
