'use strict';
const chalk = require('chalk');
const eachAsync = require('each-async');
const prettyBytes = require('pretty-bytes');
const logSymbols = require('log-symbols');
const SVGO = require('svgo');

module.exports = grunt => {
	grunt.registerMultiTask('svgmin', 'Minify SVG', function () {
		const done = this.async();
		const svgo = new SVGO(this.options());
		let totalSaved = 0;

		eachAsync(this.files, (el, i, next) => {
			const srcPath = el.src[0];
			const srcSvg = grunt.file.read(srcPath);

			svgo.optimize(srcSvg, result => {
				if (result.error) {
					grunt.warn(srcPath + ': ' + result.error);
					next();
					return;
				}

				const saved = srcSvg.length - result.data.length;
				const percentage = saved / srcSvg.length * 100;
				totalSaved += saved;

				grunt.verbose.writeln(logSymbols.success + ' ' + srcPath + chalk.gray(' (saved ' + chalk.bold(prettyBytes(saved)) + ' ' + Math.round(percentage) + '%)'));
				grunt.file.write(el.dest, result.data);
				next();
			});
		}, () => {
			grunt.log.writeln('Total saved: ' + chalk.green(prettyBytes(totalSaved)));
			done();
		});
	});
};
