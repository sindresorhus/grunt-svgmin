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
					// unfortunately due to the way svgo merges configs, to disable a specific plugin it must be at the correct
					// index in the plugins array compared to the default config in .svgo.yml.
					// That means we can't configure it inline here so the plugins array is created above before the call to
					// grunt.initConfig().
					// This quirk is documented at https://github.com/svg/svgo/blob/master/docs/how-it-works/en.md in the Config
					// section: "It's important to note that every plugin has its specific position in the plugins array".
					// A neater way to configure svgo that avoids this quirk is to use command-line style configuration as in the
					// "withcoaconfig" target below.
					plugins: plugins
				},
				files: {
					'test/tmp/withconfig.svg': 'test/fixtures/test.svg'
				}
			},
			withcoaconfig: {
				options: {
					coa: {
						disable: 'removeViewBox'
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
