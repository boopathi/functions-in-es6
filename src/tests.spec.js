;(function(scope) {
  'use strict';

  const f = 'function';
  const a = 'arrow';
  const c = 'class';
  const g = 'generator';
  const m = 'method';

  let checks = new Map();

  class A {}
  function B () {}
  let C = x => 5;
  function* D() {}

  // add results
  checks.set(A, c);
  checks.set(B, f);
  checks.set(C, a);
  checks.set(D, g);

  // Function expressions
  let E = class {};
  let F = function() {};
  let G = function* () {};

  // results
  checks.set(E, c);
  checks.set(F, f);
  checks.set(G, g);

  // methods and keyvalue pairs
  let H = {
  	a() {},
  	b: function() {},
  	c: () => {}
  };
  let _I = class {
  	a() {}
  };
  let I = new _I();
  let _J = class extends _I {
  	b() {}
  };
  let J = new _J();

  // results
  checks.set(H.a, m);
  checks.set(H.b, f);
  checks.set(H.c, a);
  checks.set(I.a, m);
  checks.set(J.a, m);
  checks.set(J.b, m);

  // possible hacks
  let K = function() { '=>' };
  K.prototype = void 0;
  let L = () => (function(){});
  let M = [
  	'function() {}',
  	{},
  	0
  ];
  let N = function() {};
  N.toString = function() { return "" };

  // results
  checks.set(K, f);
  checks.set(L, a);
  checks.set(L(), f);
  checks.set(M[0], 'string');
  checks.set(M[1], 'object');
  checks.set(M[2], 'number');

  // extended
  let _O = function() {}
  _O.prototype.a = function() {};
  _O.prototype.b = () => {};
  let O = new _O();

  // results
  checks.set(_O, c); // because it has prototypes defined
  checks.set(O.a, f); // should this be a method. But how do you detect
  checks.set(O.b, a); // same goes here

  // export for node
  if ('undefined' !== typeof module) module.exports = checks;
  // for others expose to whatever scope is assigned
  else scope.checks = checks;

})(this);
