# functions-in-es6

A walk through, Reflection and tests for different kinds of functions in JavaScript till ES2015 spec.

## Run tests

### Using Node

```sh
npm test
```

### Using v8

```sh
cd src
/path/to/d8 test.js
```

(or) if you have `d8` in your `$PATH`,

```sh
npm run v8
```

## How it started ?

The idea is to detect from a reference the type of function - arrow, class or a normal function. And to detect before instantiating if the reference is instantiable.

+ https://github.com/facebook/react/issues/4599
+ http://stackoverflow.com/a/31947622/556124

This repository is about defining the function `getFunctionType` which returns the type of function input -

+ arrow
+ class
+ method
+ generator
+ function
+ generator-method

## Definitions

Source: http://stackoverflow.com/a/31947622/556124

> + arrow functions are functions that cannot be used as constructors, and don't have a .prototype property. However, methods don't either. They inherit from Function.prototype.
+ classes are functions that can be called only with new, and that have a .prototype object which is normally not empty. If extend was used, they don't inherit from Function.prototype.
+ functions are functions that can be called either way, and do have a .prototype that is normally empty. They inherit from Function.prototype.
+ generator functions are functions that do have a .prototype which inherits from the intrinsic GeneratorPrototype object, and they inherit from the intrinsic Generator object.

#### Arrow

```js
let A = () => {};
let B = {
  x: () => {}
};
```

#### Class

```js
class A {}

function B() {}
B.prototype.x = function() {};
```

#### Method

```js
class A {
  method() {}
}
let B = {
  method() {}
};
```

#### Generator

```js
function *A() {}
let B = {
  x: function *() {}
};
```

#### Function

```js
function A() {}
let B = {
  x: function() {}
};
```

#### Generator Method

```js
let A = {
  *x() {}
};
class B {
  *x() {}
}
```

## Implementation

#### [`get-function-type.js`](src/get-function-type.js)

## Assumptions and other gotchas

#### NO TRANSPILING

+ Don't transpile this using babel or traceur. It will give you absolutely wrong results.

#### Requires ES6 features

+ arrows
+ generators
+ classes
+ enhanced object literals
+ let, const
+ Map
+ Array.prototype.startsWith
+ etc...

#### Function with prototypes is a class

```js
// this will be treated as a class
function x() {}
x.prototype.a = function() {}

// this is a simple function
function y() {}
```

#### methods are detected as methods only when declared as methods

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

I don't know anyway to detect the following as methods yet.

```js
function y() {}
y.prototype.method = function() {};
y.prototype.genmethod = function*() {};
```

#### generator methods have prototypes

```js
let x = {
  a() {}
  *method() {}
};
// x.a.prototype does NOT exist
// x.method.prototype exists
class y {
  a() {}
  *method() {}
}
// new y().a.prototype does NOT exist
// new y().method.prototype exists
```

Why ? - http://stackoverflow.com/q/32039390/556124
