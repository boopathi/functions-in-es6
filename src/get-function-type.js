;(function(scope) {
  'use strict';

  function getFunctionType(fn) {
  	const f = 'function';
  	const c = 'class';
  	const a = 'arrow';
  	const g = 'generator';
  	const m = 'method';

  	// in case someone changes a function's toString method
  	const toString = Function.prototype.toString;

    // check only functions
  	if ('function' !== typeof fn) return typeof fn;

  	// functions, classes, and generators have prototypes
  	if ('object' === typeof fn.prototype) {
  		// because GeneratorFunction isn't available globally
  		const GeneratorFunction = function* () {}.constructor;

  		// generator function test
  		if (fn instanceof GeneratorFunction) return g;

  		// explicitly declared as class
  		if (toString.call(fn).startsWith('class')) return c;

  		// empty prototype chains are plain functions
  		// others are classes
  		return Object.keys(fn.prototype).length ? c : f;
  	}

  	// otherwise it is an arrow, or method
  	// or purposefully someone had deleted the prototype

  	// methods (class and extended object literals)
  	// they always have a name and start with their name
  	if (fn.name && toString.call(fn).startsWith(fn.name)) return m;

  	// function expressions with prototypes removed always
    // start with the function keyword. All else is fat arrow
  	return toString.call(fn).startsWith('function') ? f : a;
  }

  // export for CommonJS (node)
  if ('undefined' !== typeof module) module.exports = getFunctionType;
  // for others expose to whatever scope is assigned
  else scope.getFunctionType = getFunctionType;

})(this);
