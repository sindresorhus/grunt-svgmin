# grunt-svgmin

> Minify SVG using [SVGO](https://github.com/svg/svgo)

*Issues with the output should be reported on the SVGO [issue tracker](https://github.com/svg/svgo/issues).*

## Install

```sh
npm install --save-dev grunt-svgmin
```

## Usage

```js
require('load-grunt-tasks')(grunt);

grunt.initConfig({
	svgmin: {
		options: {
			plugins: [
				{
					name: 'preset-default',
					params: {
						overrides: {
							sortAttrs: false
						}
					}
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

### Options

The provided options are passed directly to [SVGO](https://github.com/svg/svgo#configuration).

## Note

Per-file savings are only printed in verbose mode (`grunt svgmin --verbose`).
