var jsonfile = require('jsonfile');
var file = 'version.json';

function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}

var obj = {
  version: $.dev ? '' : `?rel=${randomInteger(10, 1000000)}`,
  suffix: $.dev ? '' : '.min'
};

module.exports = function () {
  $
    .gulp
    .task('create:version', function (cb) {
      jsonfile
        .writeFile(file, obj, function (err) {
          cb();
        });
    });
};