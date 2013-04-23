'use strict';
module.exports = function (grunt) {
  var svgo = new(require('svgo'));
  var path = require('path');
  var filesize = require('filesize');

  grunt.registerMultiTask('svgmin', 'Minify SVG', function () {

    grunt.util.async.forEach(this.files, function (file, next) {
      var src = file.src[0];
      var fileName = path.basename(src);
      var dest = ('dest' in file.orig) ? file.dest : 'svgopt/'+file.dest;
      var destDir = path.dirname(dest);

      svgo.fromFile(src)
        .then(
          function(result) {
            var inBytes = result.info.inBytes,
                outBytes = result.info.outBytes,
                saved = inBytes - outBytes,
                savedPercents = 100 - outBytes * 100 / inBytes;
            if (saved > 0) {
              grunt.file.write(dest, result.data);
              grunt.log.writeln(
                '✔ '.green +'Saved ' + fileName + ' to ' + destDir +
                (' (saved ' + filesize(saved) + ' | ' +
                (Math.round(savedPercents * 10) / 10) + '%)').grey);
            }
            else {
              // sometimes svgo creates larger files on optimization
              // just copying the file from src to dest
              grunt.file.copy(src, dest);
              grunt.log.writeln(
                '✔ '.green +'Copied ' + fileName + ' to ' + destDir +
                (' (Already optimized)').grey);
            }
            next();
          }
        )
        .fail(
          function(error) {
            grunt.log.writeln(error);
            next();
          }
        )
        .done();
    }, this.async());
  });
};
