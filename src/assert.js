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

  if ('undefined' !== typeof module) module.exports = assert;
  else scope.assert = assert;

})(this);
