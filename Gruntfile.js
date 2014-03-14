'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		svgmin: {
			compile: {
				files: {
					'test/tmp/test.svg': 'test/fixtures/test.svg'
				}
			},
			withconfig: {
				options: {
					plugins: [
						{removeViewBox: false},
						{convertPathData: { straightCurves:false }}  // Advanced svgo plugin option
					]
				},
				files: {
					'test/tmp/withconfig.svg': 'test/fixtures/test.svg'
				}
			},

			multiple: {
				files: [{
					expand:true,
					cwd: 'test/fixtures/',
					src: ['**/*.svg'],  // Actual pattern(s) to match.
					dest: 'test/tmp/'
				}]
			}
		},
		simplemocha: {
			test: {
				src: 'test/*.js'
			}
		},
		clean: {
			test: ['test/tmp']
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.registerTask('default', ['clean', 'svgmin', 'simplemocha', 'clean']);
};
