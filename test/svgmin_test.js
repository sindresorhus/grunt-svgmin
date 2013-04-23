/*global describe, it */
'use strict';
var assert = require('assert');
var fs = require('fs');

describe('svgmin', function () {
	it('minifies SVG', function () {
		var original = fs.statSync('test/fixtures/test.svg').size;
		var minified = fs.statSync('test/tmp/test.svg').size;
		assert(minified < original);
	});
  it('creates default folder for optimized svg\'s in root of project', function(){
		fs.exists('svgopt/test.svg',
			function (exists) {
				assert(true == exists);
			}
		);
  });
  it('creates subfolders according src folder', function(){
		fs.exists('svgopt/subfolder/test.svg',
			function (exists) {
				assert(true == exists);
			}
		);
  });
  it('creates given dest folder for optimized svg\'s', function(){
		fs.exists('test/tmp/test.svg',
			function (exists) {
				assert(true == exists);
			}
		);
  });
  it('creates subfolders according src folder', function(){
		fs.exists('test/tmp/subfolder/test.svg',
			function (exists) {
				assert(true == exists);
			}
		);
  });
});
