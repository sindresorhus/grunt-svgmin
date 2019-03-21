'use strict';
const chalk = require('chalk');
const prettyBytes = require('pretty-bytes');
const logSymbols = require('log-symbols');
const SVGO = require('svgo');

module.exports = grunt => {
	grunt.registerMultiTask('svgmin', 'Minify SVG', async function () {
		const done = this.async();
		const svgo = new SVGO(this.options());
		let totalSavedBytes = 0;

		await Promise.all(this.files.map(async element => {
			const sourcePath = element.src[0];
			const sourceSvg = grunt.file.read(sourcePath);

			const result = await svgo.optimize(sourceSvg, {srcPath: sourcePath});
			if (result.error) {
				grunt.warn(`${sourcePath}: ${result.error}`);
				return;
			}

			const savedBytes = sourceSvg.length - result.data.length;
			const percentage = savedBytes / sourceSvg.length * 100;
			totalSavedBytes += savedBytes;

			grunt.verbose.writeln(logSymbols.success + ' ' + sourcePath + chalk.gray(' (saved ' + chalk.bold(prettyBytes(savedBytes)) + ' ' + Math.round(percentage) + '%)'));
			grunt.file.write(element.dest, result.data);
		}));

		grunt.log.writeln(`Total saved: ${chalk.green(prettyBytes(totalSavedBytes))}`);
		done();
	});
};
