// Run in d8
'use strict';

load('./assert.js');
load('./get-function-type.js');
load('./equispace.js');
load('./tests.spec.js');

checks.forEach((result, fn) => {
	let str = 'function' === typeof fn ? Function.prototype.toString.call(fn) : fn.toString();
	let type = getFunctionType(fn);
	assert(result, type);
	print("✓ ", equispace(type, 15), str);
});
