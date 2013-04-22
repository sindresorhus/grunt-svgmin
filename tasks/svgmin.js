'use strict';
module.exports = function (grunt) {
	grunt.registerMultiTask('svgmin', 'Minify SVG', function () {
		var svgo = new (require('svgo'))();
		var filesize = require('filesize');
		var childProcess = require('child_process');
    var path = require('path');
    var fs = require('fs');
    var svg

    grunt.registerMultiTask('svgmin', 'Minify SVG files', function () {
      var options = this.options();

			grunt.verbose.writeflags(options, 'Options');

		grunt.util.async.forEach(this.files, 30, function (file, next) {
			optimize(file.src[0], file.dest, next);
		}.bind(this), this.async());

		function optimze(src, dest, next) {
			var cp;
      var originalSize = fs.statSync(src).size;

      function processed(err, result, code) {
      	var saved, savedMsg;
        if (err) {
          grunt.log.writeln(err);
        }

        saved = originalSize - fs.statSync(dest).size;

        if (result.stderr.indexOf('already optimized') !== -1 || saved < 10) {
          savedMsg = 'already optimized';
        } else {
          savedMsg = 'saved ' + filesize(saved);
        }

        grunt.log.writeln('✔ '.green + src + (' (' + savedMsg + ')').grey);
        next();
      }

      grunt.file.mkdir(path.dirname(dest));

      if (path.extname(src) === '.svg') {
      	cp = grunt.util.spawn({
      		cmd: svgo,
      		args: [].concat(['-i', src, '-o', dest])
      	}, processed);
      } else {
        next();
      }

      if (cp && grunt.option('verbose')) {
        cp.stdout.pipe(process.stdout);
        cp.stderr.pipe(process.stderr);
      }
    }

		// 	svgo.fromFile(el.src + '').then(function (result) {
		// 		var saved = result.info.inBytes - result.info.outBytes;
		// 		var percentage = saved / result.info.inBytes * 100;
		// 		grunt.log.writeln('✔ '.green + el.src + (' (saved ' + filesize(saved) + ' ' + Math.round(percentage) + '%)').grey);
		// 		grunt.file.write(el.dest, result.data);
		// 		next();
		// 	}).fail(grunt.warn).done();
		// }, this.async());
	});
};
