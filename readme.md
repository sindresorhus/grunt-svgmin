# grunt-svgmin [![Build Status](https://travis-ci.org/sindresorhus/grunt-svgmin.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-svgmin)

> Minify SVG using [SVGO](https://github.com/svg/svgo)

*Issues with the output should be reported on the SVGO [issue tracker](https://github.com/svg/svgo/issues).*


## Install

```sh
$ npm install --save-dev grunt-svgmin
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	svgmin: {
		options: {
			plugins: [
				{
					removeViewBox: false
				}, {
					removeUselessStrokeAndFill: false
				}
			]
		},
		dist: {
			files: {
				'dist/unicorn.svg': 'app/unicorn.svg'
			}
		}
	}
});

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
