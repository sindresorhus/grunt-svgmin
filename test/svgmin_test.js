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
});
