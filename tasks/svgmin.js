'use strict';
module.exports = function (grunt) {
	grunt.registerMultiTask('svgmin', 'Minify SVG', function () {
		var options = this.options();
		var svgo = new (require('svgo'))(options);
		var filesize = require('filesize');

		grunt.util.async.forEach(this.files, function (el, next) {
			var svgin = grunt.file.read(el.src + '');
			svgo.optimize(svgin, function (result) {
				if (result.error) {
					grunt.warn('Error parsing svg: ' + result.error);
				} else {
					var saved = svgin.length - result.data.length;
					var percentage = saved / svgin.length * 100;
					grunt.log.writeln('✔ '.green + el.src + (' (saved ' + filesize(saved) + ' ' + Math.round(percentage) + '%)').grey);
					grunt.file.write(el.dest, result.data);
				}
				next();
			});
		}, this.async());
	});
};
