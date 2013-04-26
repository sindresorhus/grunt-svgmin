'use strict';
module.exports = function (grunt) {
	var plugins = [];
	plugins[13] = {
		name: 'removeViewBox',
		active: false
	};
	grunt.initConfig({
		svgmin: {
			compile: {
				files: {
					'test/tmp/test.svg': 'test/fixtures/test.svg'
				}
			},
			withconfig: {
				options: {
					config: {
						plugins: plugins // to disable a specific plugin, it must be at the correct index in the plugins array (see above)
					}
				},
				files: {
					'test/tmp/withconfig.svg': 'test/fixtures/test.svg'
				}
			},
			withcoaconfig: {
				options: {
					config: {
						coa: {
							disable: 'removeViewBox'
						}
					}
				},
				files: {
					'test/tmp/withcoaconfig.svg': 'test/fixtures/test.svg'
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
