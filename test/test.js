'use strict';
/* eslint-env mocha */
const assert = require('assert');
const fs = require('fs');

it('minifies SVG', () => {
	const original = fs.statSync('test/fixtures/test.svg').size;
	const minified = fs.statSync('test/tmp/test.svg').size;
	assert(minified < original);
});

it('minifies svgo but preserves viewBox attribute', () => {
	const original = fs.statSync('test/fixtures/test.svg').size;
	const minified = fs.statSync('test/tmp/withconfig.svg').size;
	assert(minified < original);
	// The output svg should still contain the viewBox attribute
	const svg = fs.readFileSync('test/tmp/withconfig.svg').toString();
	assert(svg.indexOf('viewBox="0 0 360 334.99"') > 0);
});
