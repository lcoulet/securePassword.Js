# Password Generator and password meter

## General information

Password generator is entirely in javascript. 

There are three components:

* Password generation engine
* Password rating engine
* UI engine

UI has few dependencies:
* JQuery
* JQuery-UI
* gauge.coffee
* i18next.js 


Password generation and rating should have fewer dependences: 

* i18next.js 


## Generator

There are several generation engines. Some more pluggable engines may be plugged.

* Commonalities

Provided generators have configurable character sets to use at input and expected password length.  

* Random generator

The random generator generates random sequence using ALL defined charsets for the given length.
Optionally it can avoid character repetition.   

* Easier to remember generator 

This generator generate patterns in the form of randomized (<Text>|<Separator>|<Number>)+ pattern.  
Generated password is easier to remember for a human being, but has less entropy so may be considered weaker.


## Meter

Password rating is defined within a rating policy object.

The provided rating policy is password length First then (variety/charsets/sequences/keymaps)being equals.

The rating is entirely subjective, inspired from many password security rules found here and there over the internet.

## UI



## Tests

Unit tests are provided, most non-randomized functions are tested using unit tests.
Unit tests depend on QUnit javascript framework.
Simply open __[test/passgentests.html](test/passgentests.html)__ file to see results
  
## Examples

