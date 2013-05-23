# grunt-svgmin [![Build Status](https://secure.travis-ci.org/sindresorhus/grunt-svgmin.png?branch=master)](http://travis-ci.org/sindresorhus/grunt-svgmin)

[Grunt][grunt] tasks to minify SVG using [SVGO](https://github.com/svg/svgo)

> SVG files, especially exported from various editors, usually contains a lot of redundant and useless information such as editor metadata, comments, hidden elements, default or non-optimal values and other stuff that can be safely removed or converted without affecting SVG rendering result.


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```sh
npm install --save-dev grunt-svgmin
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svgmin');
```

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

See the [Gruntfile](Gruntfile.js) in this repo for a full example.


### Example config

```javascript
grunt.initConfig({
	svgmin: {											// Task
		options: {										// Configuration that will be passed directly to SVGO
			plugins: [{
				removeViewBox: false
			}]
		},
		dist: {											// Target
			files: {									// Dictionary of files
				'dist/figure.svg': 'app/figure.svg'		// 'destination': 'source'
			}
		}
});

grunt.loadNpmTasks('grunt-svgmin');
grunt.registerTask('default', ['svgmin']);
```

### Available Options/Plugins

svgmin makes use of the standard SVGO plugins. Therefore, to customize configuration options applied to SVGs when running this Grunt task, you can disable/enable any SVGO plugins listed at the SVGO repository: [https://github.com/svg/svgo/tree/master/plugins](https://github.com/svg/svgo/tree/master/plugins).

You can disable any plugins by looking for the plugin name without the file extension and then setting it's value in the JSON to false. To exemplify, here is how the pugins section illustrated above in the example config might be written with some of the standard SVGO plugins disabled:

```javascript
plugins: [{
	removeViewBox: false, // Don't remove the viewbox atribute from the SVG
	removeUselessStrokeAndFill: false, // Don't remove Useless Strokes and Fills
	removeEmptyAttrs: false // Don't remove Empty Attributes from the SVG
}]
```

## License

MIT License • © [Sindre Sorhus](http://sindresorhus.com)
