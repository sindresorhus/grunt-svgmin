# grunt-svgmin [![Build Status](https://secure.travis-ci.org/sindresorhus/grunt-svgmin.png?branch=master)](http://travis-ci.org/sindresorhus/grunt-svgmin)

*Requires grunt 0.4*

[Grunt][grunt] tasks to minify SVG using [SVGO](https://github.com/svg/svgo)

> SVG files, especially exported from various editors, usually contains a lot of redundant and useless information such as editor metadata, comments, hidden elements, default or non-optimal values and other stuff that can be safely removed or converted without affecting SVG rendering result.


## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```sh
npm install grunt-svgmin --save-dev
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
		dist: {											// Target
			files: {									// Dictionary of files
				'dist/figure.svg': 'app/figure.svg'		// 'destination': 'source'
			}
		}
});

grunt.loadNpmTasks('grunt-svgmin');
grunt.registerTask('default', ['svgmin']);
```


## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style.


## License

MIT License
(c) [Sindre Sorhus](http://sindresorhus.com)
