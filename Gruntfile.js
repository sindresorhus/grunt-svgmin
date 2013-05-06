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
					plugins: [{
						removeViewBox: false
					}]
				},
				files: {
					'test/tmp/withconfig.svg': 'test/fixtures/test.svg'
				}
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
