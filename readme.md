# grunt-svgmin [![Build Status](https://secure.travis-ci.org/sindresorhus/grunt-svgmin.png?branch=master)](http://travis-ci.org/sindresorhus/grunt-svgmin) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Minify SVG using [SVGO](https://github.com/svg/svgo)

*Issues with the output should be reported on the SVGO [issue tracker](https://github.com/svg/svgo/issues).*


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```sh
npm install --save-dev grunt-svgmin
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svgmin');
```

*Tip: the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) module makes it easier to load multiple grunt tasks.*

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

See the [Gruntfile](Gruntfile.js) in this repo for a full example.


### Example config (static)

```js
grunt.initConfig({
	svgmin: {											// Task
		options: {										// Configuration that will be passed directly to SVGO
			plugins: [
			  { removeViewBox: false },
			  { removeUselessStrokeAndFill: false }
			]
		},
		dist: {											// Target
			files: {									// Dictionary of files
				'dist/figure.svg': 'app/figure.svg'		// 'destination': 'source'
			}
		}
	}
});

grunt.loadNpmTasks('grunt-svgmin');
grunt.registerTask('default', ['svgmin']);
```

### Example config (dynamic)

```js
grunt.initConfig({
	svgmin: {						// Task
		options: {					// Configuration that will be passed directly to SVGO
			plugins: [
			  { removeViewBox: false },
			  { removeUselessStrokeAndFill: false }
			]
		},
		dist: {						// Target
			files: [{				// Dictionary of files
				expand: true,		// Enable dynamic expansion.
				cwd: 'img/src',		// Src matches are relative to this path.
				src: ['**/*.svg'],	// Actual pattern(s) to match.
				dest: 'img/',		// Destination path prefix.
				ext: '.min.svg'		// Dest filepaths will have this extension.
				// ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
			}]
		}
});

grunt.loadNpmTasks('grunt-svgmin');
grunt.registerTask('default', ['svgmin']);
```

### Available Options/Plugins

svgmin makes use of the standard SVGO plugin architecture. Therefore, to customize SVG optimisation, you can disable/enable any SVGO plugins listed at the [SVGO repository](https://github.com/svg/svgo/tree/master/plugins).

To disable plugins with the Gruntfile.js, look for the plugin name at the [SVGO repository](https://github.com/svg/svgo/tree/master/plugins) and copy the plugin name (minus the file extension). Then set its value in the JSON to `false` in comma-separated objects. To exemplify, here is how the plugins section in the example configuration (illustrated above) might be written with some of the standard SVGO plugins disabled:

```js
plugins: [
	{ removeViewBox: false }, 				// don't remove the viewbox atribute from the SVG
	{ removeUselessStrokeAndFill: false },	// don't remove Useless Strokes and Fills
	{ removeEmptyAttrs: false }				// don't remove Empty Attributes from the SVG
]
```

Check each plugin for `exports.active = [true/false]` to see if the plugin is enabled. Most of the plugins are enabled by default but you may want to prevent a couple, particularly `removeUselessStrokeAndFill` as that may remove small details with subtracted / extruded complex paths.

## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
