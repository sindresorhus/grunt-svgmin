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

	it('minifies svgo but preserves viewBox attribute', function() {
		var original = fs.statSync('test/fixtures/test.svg').size;
		var minified = fs.statSync('test/tmp/withconfig.svg').size;
		assert(minified < original);
		// the output svg should still contain the viewBox attribute
		var svg = fs.readFileSync('test/tmp/withconfig.svg').toString();
		assert(svg.indexOf('viewBox="0 0 360 334.99"') > 0);
	});
});
