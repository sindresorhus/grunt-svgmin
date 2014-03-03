'use strict';
var chalk = require('chalk');
var eachAsync = require('each-async');
var prettyBytes = require('pretty-bytes');
var SVGO = require('svgo');

module.exports = function (grunt) {
	grunt.registerMultiTask('svgmin', 'Minify SVG', function () {
		var svgo = new SVGO(this.options());
		var totalSaved = 0;

		eachAsync(this.files, function (el, i, next) {
			var srcPath = el.src[0];
			var srcSvg = grunt.file.read(srcPath);

			svgo.optimize(srcSvg, function (result) {
				if (result.error) {
					return grunt.warn('Error parsing SVG: ' + result.error);
				}

				var saved = srcSvg.length - result.data.length;
				var percentage = saved / srcSvg.length * 100;
				totalSaved += saved;

				grunt.log.writeln(chalk.green('✔ ') + srcPath + chalk.gray(' (saved ' + chalk.bold(prettyBytes(saved)) + ' ' + Math.round(percentage) + '%)'));
				grunt.file.write(el.dest, result.data);
				next();
			});
		}, this.async());

		grunt.log.writeln('Total saved: ' + chalk.green(prettyBytes(totalSaved)));
	});
};
