'use strict';
const chalk = require('chalk');
const prettyBytes = require('pretty-bytes');
const logSymbols = require('log-symbols');
const {optimize} = require('svgo');

module.exports = grunt => {
	grunt.registerMultiTask('svgmin', 'Minify SVG', async function () {
		const done = this.async();
		const options = this.options();
		let totalSavedBytes = 0;

		for (const file of this.files) {
			const sourcePath = file.src[0];
			const sourceSvg = grunt.file.read(sourcePath);

			let result;
			try {
				result = optimize(sourceSvg, {
					...options,
					path: sourcePath,
				});
			} catch (error) {
				grunt.warn(`${sourcePath}: ${error}`);
				continue;
			}

			const savedBytes = sourceSvg.length - result.data.length;
			const percentage = savedBytes / sourceSvg.length * 100;
			totalSavedBytes += savedBytes;

			grunt.verbose.writeln(logSymbols.success + ' ' + sourcePath + chalk.gray(' (saved ' + chalk.bold(prettyBytes(savedBytes)) + ' ' + Math.round(percentage) + '%)'));
			grunt.file.write(file.dest, result.data);
		}

		grunt.log.writeln(`Total saved: ${chalk.green(prettyBytes(totalSavedBytes))}`);
		done();
	});
};
