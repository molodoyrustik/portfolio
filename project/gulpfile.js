let isDevelopment = false

if (process.env.NODE_ENV == 'development') {
  isDevelopment = true;
} else {
  isDevelopment = false;
}

global.$ = {
  dev: isDevelopment,
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    tasks: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js'),
    sass: require('./gulp/paths/sass.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  merge: require('merge-stream'),
  browserify : require('browserify'),
  source : require('vinyl-source-stream'),
  buffer : require('vinyl-buffer'),
  babel : require('babelify'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')({
    rename: {
      'gulp-replace-task': 'replaceTask'
    }
  })
};

$.path.tasks.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('build', $.gulp.series(
  'clean',
  'copy:root',
  'sprite.svg',
  'tinypng',
  $.gulp.parallel(
    'sass',
    'css.foundation',
    'js.process',
    'copy.icons',
    'fonts',
    'create:version'
  )
));

$.gulp.task('default', $.gulp.series(
  'clean',
  'sprite.svg',
  $.gulp.parallel(
    'sass',
    'css.foundation',
    'js.process',
    'copy.image',
    'fonts',
    'create:version'
  ),
  $.gulp.parallel(
    'nodemon',
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));