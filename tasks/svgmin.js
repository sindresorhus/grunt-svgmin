'use strict';
module.exports = function (grunt) {
	grunt.registerMultiTask('svgmin', 'Minify SVG', function () {
		var svgo = new (require('svgo'))();
		var filesize = require('filesize');

		grunt.util.async.forEach(this.files, function (el, next) {
			svgo.fromFile(el.src + '').then(function (result) {
				var saved = result.info.inBytes - result.info.outBytes;
				var percentage = saved / result.info.inBytes * 100;
				grunt.log.writeln('✔ '.green + el.src + (' (saved ' + filesize(saved) + ' ' + Math.round(percentage) + '%)').grey);
				grunt.file.write(el.dest, result.data);
				next();
			}).fail(grunt.warn).done();
		}, this.async());
	});
};
