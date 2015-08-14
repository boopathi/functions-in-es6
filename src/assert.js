;(function(scope) {
  'use strict';

  function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
  }

  // export for node
  if ('undefined' !== typeof module) module.exports = assert;
  // for others expose to whatever scope is assigned
  else scope.assert = assert;

})(this);
