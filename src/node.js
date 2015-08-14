#!/usr/bin/env node
'use strict';

const assert = require('./assert');
const getFunctionType = require('./get-function-type.js');
const checks = require('./tests.spec.js');
const equispace = require('./equispace');

checks.forEach((result, fn) => {
	let str = 'function' === typeof fn ? Function.prototype.toString.call(fn) : fn.toString();
	let type = getFunctionType(fn);
	assert(result, type);
	console.log("✓ ", equispace(type, 15), str);
});
