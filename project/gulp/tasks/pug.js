const fs = require('fs')
const content = JSON.parse(fs.readFileSync('./content.json', 'utf8'));

module.exports = function() {
  const patterns = [];
  $.gulp.task('pug', function() {
    patterns.push({ match: '%=suffix=%', replace: $.dev ? '' : '.min' });
    patterns.push({ match: '%=version=%', replace: $.dev ? '' : `?rel=${$.package.version}` });//Math.ceil(Math.random()*100000)
    return $.gulp.src('./src/templates/pages/*.pug')
      .pipe($.gp.pug({
        locals : {
          content,
        },
        pretty: true
      }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        }
       }))
      .pipe($.gp.replaceTask({ patterns, usePrefix: false }))
      .pipe($.gp.if(!$.dev, $.gp.htmlmin({ collapseWhitespace: true })))
      .pipe($.gulp.dest($.config.root))
      .pipe($.browserSync.stream({once: true}))
  });
};