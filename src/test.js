;(function(scope) {
  'use strict';

  if ('undefined' !== typeof require) {
    scope.assert = require('./assert');
    scope.getFunctionType = require('./get-function-type');
    scope.equispace = require('./equispace');
    scope.checks = require('./tests.spec');
  } else if ('undefined' !== typeof load) {
    load('./assert.js');
    load('./get-function-type.js');
    load('./equispace.js');
    load('./tests.spec.js');
  }

  scope.checks.forEach((result, fn) => {
    let str = 'function' === typeof fn ? Function.prototype.toString.call(fn) : fn.toString();
    let type = scope.getFunctionType(fn);
    scope.assert(result === type, `Assert Error
      Function: ${str}, ${fn.prototype}
      Expected: ${result}
      Actual:   ${type}
    `);
    let message = ["✓ ", scope.equispace(type, 20), str];
    if ('undefined' !== typeof console)
      console.log(...message);
    else if ('undefined' !== typeof print)
      print(...message);
  });

})(this);
