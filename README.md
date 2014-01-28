lawyered.js
========
A simple lightweight module that allows [design by contract](http://archive.eiffel.com/eiffel/nutshell.html).

Installing
------------
```Shell
npm install lawyered
```

Summary
------------
This module allows you to run code before and after your methods, giving you the possibility to verify that certain conditions are met. The module relies on conventions to determine which methods should be run as pre/post conditions for a particular method.
* Preconditions methods are expected to append "_pre" to the name of the original method.
* Postconditions methods are expected to append "_post" to the name of the original method.
* The invariant method should be named "_invariant".

Simple cases
------------
```JavaScript
var law = require('lawyered');
var Assert = require('assert');

var value = 0;

var o = law.instrument({
    m_pre: function(){
        Assert.equal(value, 0);
    },
    m: function(){
        value++;
    },
    m_post: function(){
        Assert.equal(value, 1);
    },
});

o.m();
```

Complete scenario
------------
Features:

* All methods (pre, original and post) receive original method parameters.
* Post condition methods receives value returned from original method as last parameter.
* The invariant method runs after every method. It is invoked after the postcondition or the method itself if the method does not have a postcondition.

```JavaScript
"use strict";

var law = require('lawyered');
var Assert = require('assert');

var value = 0;

var positiveNumberAdder = {
    total: 0,
    add_pre: function(a, b){
        Assert.ok(a > 0);
        Assert.ok(b > 0);
    },
    add: function(a, b){
        var partial = a + b;
        this.total = partial;
        return partial;
    },
    add_post: function(a, b, returnValue){
        Assert.ok(returnValue > a);
        Assert.ok(returnValue > b);
        Assert.equal(a + b, returnValue);
    },
    _invariant: function(){
        Assert.ok(this.total > 0);
    }
};

law.instrument(positiveNumberAdder);

console.log(positiveNumberAdder.add(10, 15)); // outputs 25
console.log(positiveNumberAdder.add(1, 2)); // outputs 3
```

Inspiration
-----------
* [Eiffel](http://archive.eiffel.com/eiffel/nutshell.html)
* [Python metaclasses pre/post conditions sample](http://www.python.org/doc/essays/metaclasses/Eiffel.py)
* [Code Contracts for .NET extensions](http://visualstudiogallery.msdn.microsoft.com/1ec7db13-3363-46c9-851f-1ce455f66970)
