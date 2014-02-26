# Password Generator and password meter

[Example page](http://iolco51.free.fr/) using this tool for generation and rating of passwords.  

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
* i18next.js (for internationalization not implemented) 


## Generator

There are several generation engines. Some more pluggable engines may be plugged.

* Commonalities

Provided generators have configurable character sets to use at input and expected password length.  

* Random generator

The random generator generates random sequence using ALL defined charsets for the given length.
Optionally it can avoid character repetition.   

* "Easier to remember" password  generator 

This generator generate patterns in the form of randomized (<Text>|<Separator>|<Number>)+ pattern.  
Generated password is easier to remember for a human being, but has less entropy so may be considered weaker.


## Meter

Password rating is defined within a rating policy object.

The provided rating policy is password length first (by a factor of 4),then (variety/charsets/sequences/keymaps)being equals.

The rating is entirely subjective, inspired from many password security rules found here and there over the internet.

* **variety**: the number of different characters compared to the length of the password
* **charsets**: the number of character sets used (e.g. alphabetical uppercase, lowercase, numbers, ...etc.)
* **sequences**: the cumulated length of sequences of characters compared to the length of the password (e.g. 123456, abcdef...etc.)
* **keymaps**: The sequences matchning a keyboard keymap compared to the length of the password (e.g. qwertyuiop, asdfgh ...etc.)     
* **dictionary**: not implemented yet. The length of the longest dictionary word recognized compared to password length

## password UI 

A UI library using JQuery is being provided.


The UI needs the following HTML elements IDs (DIV or SPAN):  

* generatedPassword
* passwordRate
* passwordRateValue
* coloredRate


Individual HTML elements can be built calling the UI functions (elem_ID refers to an ID of an HTML element):

* buildCharsetsForm("elem_ID") : build the charsets selection form in HTML elem_ID. e.g. "#charsetsform"
* buildOptionsForm("elem_ID") : build the password generation options selection form in elem_ID
* buildRatingElements("elem_ID") : build the password rating UI elements in elem_ID
* buildGenerateButton("elem_ID") : build the password generation button in elem_ID
* buildGaugeElement(canvas_ID) : build a visual secure rating gauge in a HTML5 canvas with ID canvas_ID. Note that the element ID is not passed as a string.
* buildTestButton("elem_ID") : build the password rate testing (evaluate how secure the password is) button in elem_ID


Example:

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-2" />
		<script type="text/javascript" src="passgen.js"></script>
		<script type="text/javascript" src="passgen-ui.js"></script>
		<script type="text/javascript" src="gauge.min.js"></script>
		<script type="text/javascript" src="jquery.min.js"></script>
		<script type="text/javascript" src="jquery-ui.custom.min.js"></script>		
	</head>
	<body>
		<h1>Need password?</h1>
		<form id="charsetsSelector"></form>		
		<div id="optionsDiv"><form id="optionsSelector"></form></div> <br />
		
		<input type="submit" value="Generate a new password" id="generateButton"> - or - <input type="submit" value="Test password below" id="testButton"> <br />
		<h2>Password: <input type="text" id="generatedPassword"></input></h2> <br />
		
		
		<div id="gaugeDiv" align="center"><canvas id="gauge" width="220" height="150"></canvas></div><br />
		
		<div id="coloredRate"> Security Rate: <span id="passwordRate"></span> <span id="passwordRateValue"></span></div><br />
		

		<div id="ratingDetails"></div><br />		
		
		<script>
		$( document ).ready(function() {
		   buildCharsetsForm("#charsetsSelector");
		   buildOptionsForm("#optionsSelector");
		   buildRatingElements("#ratingDetails");
		   buildGenerateButton("#generateButton");
		   buildGaugeElement("gauge");
		   buildTestButton("#testButton");
		});         
		</script>
		
	</body> 
	</html>

## Tests

Unit tests are provided, most non-randomized functions are tested using unit tests.
Unit tests depend on QUnit javascript framework.
Simply open __[test/passgentests.html](test/passgentests.html)__ file to see results
  



## TODO list

* Add internationalization
* Add dictionary rating 
* Add dictionary generator (even easier to remember)
* Separate generator and rating in different libraries
* Allow custom charset
* Make sure that there's no duplicates characters with selected charsets when using a custom charset
* Remove dependency to hardcoded element IDs
* Improve Javascript : Better structure, lower repetition, use objects
* Implement dictionary lookup as bloom filter?  
* Add support for other rating policies