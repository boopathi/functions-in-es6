;(function(scope) {
  'use strict';

  function equispace(s, maxlen) {
  	return s + Array(maxlen - s.length).join(' ');
  }

  // export for node
  if ('undefined' !== typeof module) module.exports = equispace;
  // for others expose to whatever scope is assigned
  else scope.equispace = equispace;

})(this);
