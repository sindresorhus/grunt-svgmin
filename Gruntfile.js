'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		svgmin: {
			usingdest: {
				files: [{
					expand: true,
					cwd: 'test/fixtures',
					src: '{,*/}*.svg',
					dest: 'test/tmp'
				}]
			},
			usingdefaultdest: {
				files: [{
					expand: true,
					cwd: 'test/fixtures',
					src: '{,*/}*.svg'
				}]
			}
		},
		simplemocha: {
			test: {
				src: 'test/*.js'
			}
		},
		clean: {
			test: ['test/tmp', 'svgopt']
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.registerTask('default', ['clean', 'svgmin', 'simplemocha', 'clean']);
};
