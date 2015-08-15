;(function(scope) {
  'use strict';

  function equispace(s, maxlen) {
  	return s + Array(maxlen - s.length).join(' ');
  }

  if ('undefined' !== typeof module) module.exports = equispace;
  else scope.equispace = equispace;

})(this);
