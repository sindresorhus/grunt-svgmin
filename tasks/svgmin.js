'use strict';
var chalk = require('chalk');
var eachAsync = require('each-async');
var prettyBytes = require('pretty-bytes');
var logSymbols = require('log-symbols');
var SVGO = require('svgo');

module.exports = function (grunt) {

	var deactivateUnusedPlugins = function (options, svgo) {
		var active;
		svgo.config.plugins.forEach(function (svgoPlugins) {
			svgoPlugins.forEach(function (svgoPlugin) {
				active = false;
				options.plugins.forEach(function (optPlugin) {
					if (optPlugin.hasOwnProperty(svgoPlugin.name)) {
						active = true;
					}
				});
				if (!active) {
					svgoPlugin.active = false;
				}
			});
		});
	};

	grunt.registerMultiTask('svgmin', 'Minify SVG', function () {
		var done = this.async();
		var svgo = new SVGO(this.options());
		if (this.options().disablePluginsByDefault) {
			deactivateUnusedPlugins(this.options(), svgo);
		}
		var totalSaved = 0;

		eachAsync(this.files, function (el, i, next) {
			var srcPath = el.src[0];
			var srcSvg = grunt.file.read(srcPath);

			svgo.optimize(srcSvg, function (result) {
				if (result.error) {
					grunt.warn('Error parsing SVG:', result.error);
					next();
					return;
				}

				var saved = srcSvg.length - result.data.length;
				var percentage = saved / srcSvg.length * 100;
				totalSaved += saved;

				grunt.log.writeln(logSymbols.success + ' ' + srcPath + chalk.gray(' (saved ' + chalk.bold(prettyBytes(saved)) + ' ' + Math.round(percentage) + '%)'));
				grunt.file.write(el.dest, result.data);
				next();
			});
		}, function () {
			grunt.log.writeln('Total saved: ' + chalk.green(prettyBytes(totalSaved)));
			done();
		});
	});
};
