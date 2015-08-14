# functions-in-es6

A walk through and tests and Reflection for different kinds of functions in JavaScript till ES2015 spec.

### How it started ?

This issue from React - https://github.com/facebook/react/issues/4599. The idea was to detect from a reference the type of function - arrow, class or a normal function. And to detect before instantiating if the reference is instantiable.

And an overview of the different types of functions by @bergus to the stackoverflow question - http://stackoverflow.com/a/31947622/556124

This repository is about the function `getFunctionType` which returns the type of function -

+ arrow
+ class
+ method
+ generator
+ function

### Assumptions and other gotchas

##### NO TRANSPILING

+ Don't transpile this using babel or traceur. It will give your absolutely wrong results.

##### Requires ES6 features

+ arrows
+ generators
+ classes
+ enhanced object literals
+ let, const
+ Map
+ Array.prototype.startsWith
+ etc...

##### Function with prototypes is a class

```js
// this will be treated as a class
function x() {}
x.prototype.a = function() {}

// this is a simple function
function y() {}
```

##### methods are detected as methods only when declared as methods

```js
// either via enhanced object literals
let x = {
  method() {}
};

// or via class
class x {
  method() {}
}
```

I don't know anyway to detect this as a method yet.

```js
function y() {}
y.prototype.method = function() {};
```
