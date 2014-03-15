//  and Javascript password evaluator  UI based on JQuery
// Javascript password generator UI based on JQuery
// Author: L.Coulet, 2014
// License: Apache 2.0
function SecurePasswordUI() {  

	var ratingDetails;
	var gauge;
	var SecurePasswordTool=new SecurePassword();
	var passwordSize=15;
	
	this.buildCharsetsForm = function ( elementID ){	
		var availableCharsets=SecurePasswordTool.getAvailableCharsets();
		for(var charsetName in availableCharsets ){
			var htmlCharset=$('<div/>').text(availableCharsets[charsetName]).html();
			var checkboxId=charsetName;
			var checkboxEnabled="";
			var defaultEnabledCharsets=Object.keys(SecurePasswordTool.getEnabledCharsets());
			if( $.inArray(charsetName, defaultEnabledCharsets) >= 0  ){
				checkboxEnabled='checked="yes"';
			}
			 $(elementID).append('<input type="checkbox" id="'+checkboxId+'" '+checkboxEnabled+'/><label for="'+checkboxId+'">'+charsetName+' ('+htmlCharset+')</label><br />');		 
			 $('#'+checkboxId).change(function(){
				if( this.checked ) SecurePasswordTool.enableCharsetByName( this.id ); else SecurePasswordTool.disableCharsetByName(this.id);
			 }).bind(charsetName);
			 
		}
		return this;
	}
	this.buildGaugeElement = function (elementID){
		var opts = {
		  lines: 12, // The number of lines to draw
		  angle: 0, // The length of each line
		  lineWidth: 0.44, // The line thickness
		  pointer: {
			length: 0.72, // The radius of the inner circle
			strokeWidth: 0.064, // The rotation offset
			color: '#3300FF' // Fill color
		  },
		  limitMax: 'false',   // If true, the pointer will not go past the end of the gauge

		  colorStart: '#00FF00',   // Colors
		  colorStop: '#FF0000',    // just experiment with them
		  strokeColor: '#A8A8A8',   // to see which ones work best for you
		  generateGradient: true
		};
		var target = document.getElementById(elementID); // your canvas element
		gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
		gauge.maxValue = 100.00; // set max gauge value
		gauge.animationSpeed = 40; // set animation speed (32 is default value)
		gauge.set(0.1); // set actual value
		return this;
	}
	this.buildGenerateButton = function ( elementID ){	
		$( elementID ).button().click(
					function( event ) {
						generatePasswordInUI();
					}
				);
		return this;
	}
	this.buildTestButton = function ( elementID ){	
		$( elementID ).button().click(
					function( event ) {
						testPassword($("#generatedPassword").val());
					}
				);
		$("#generatedPassword").keyup(function() {
			testPassword($("#generatedPassword").val());
		});
		return this;
	}
	this.buildOptionsForm = function ( elementID ){	
		var checkboxId="repeatAllowed";
		var checkboxEnabled='checked="yes"';
		var checkboxDisabled='';
		$(elementID).append('<input type="checkbox" id="'+checkboxId+'" '+checkboxEnabled+'/><label for="'+checkboxId+'">Allow character repetition</label><br />');		 
		 $('#'+checkboxId).change(function(){
			if( this.checked ) SecurePasswordTool.setCharacterRepetitionAllowed(true); else SecurePasswordTool.setCharacterRepetitionAllowed(false);
		});
		
		checkboxId="easierPattern";	
		$(elementID).append('<input type="checkbox" id="'+checkboxId+'" '+checkboxDisabled+'/><label for="'+checkboxId+'">Make pattern easier to remember (character repetition would be allowed)</label><br />');		 
		 $('#'+checkboxId).change(function(){
			if( this.checked ) {
				SecurePasswordTool.setEasyPasswordRequested(true) ;
				document.getElementById("repeatAllowed").disabled=true;
				document.getElementById("easyPatternUsesDict").disabled=false;
			}else {
				SecurePasswordTool.setEasyPasswordRequested(false) ;
				document.getElementById("repeatAllowed").disabled=false;
				document.getElementById("easyPatternUsesDict").disabled=true;
			}
		});
		document.getElementById("repeatAllowed").disabled=false;
		
		checkboxId="easyPatternUsesDict";	
		$(elementID).append('<input type="checkbox" id="'+checkboxId+'" '+checkboxDisabled+'/><label for="'+checkboxId+'">Use dictionaries for pattern easier to remember (can contain other characters than selected)</label><br />');		 
		 $('#'+checkboxId).change(function(){
			if( this.checked ) {SecurePasswordTool.useDictionaryForEasyPasswordRequested(true) ;}else {SecurePasswordTool.useDictionaryForEasyPasswordRequested(false); }
		});
		document.getElementById("easyPatternUsesDict").disabled=true;
		
		$(elementID).append('<label for="spinner">Password size:</label><input id="spinner" name="value" value="15" type="number" min="1" max="255" required/>');
		var spinner = $( "#spinner" ).spinner({
			min: 5,
			max: 1000,
			step: 1,
			start: passwordSize,
			spin: function( event, ui ) {
					passwordSize=ui.value;
				},
			_parse: function( value ) {
					if( !isNaN(parseInt(value)) ) {
						passwordSize=parseInt(value);
					}
				}
			}
			);
		return this;
	}
	copyToClipboard = function (text) {
	  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
	}
	this.buildRatingElements = function (elementID){	
		ratingDetails=$(elementID);
		var ratings=SecurePasswordTool.getLastRatingDetails();
		for(var rating in ratings){
			var elemIDc="r"+rating+"Col";
			var elemIDr="r"+rating+"Txt";
			var elemIDv="r"+rating+"Val";
			ratingDetails.append('<div id="'+elemIDc+'">'+$('<div/>').text(rating).html()+': <span id="'+elemIDr+'"></span><span id="'+elemIDv+'"></span></div><br />');
		}
		return this;
	}
	showRatings = function (){		
		var ratings=SecurePasswordTool.getLastRatingDetails();
		for(var rating in ratings){
			var oneRating=ratings[rating];
			var elemIDc="#r"+rating+"Col";
			var elemIDr="#r"+rating+"Txt";
			var elemIDv="#r"+rating+"Val";
			showRatingElement(elemIDr,elemIDv,elemIDc,oneRating );
		}
		return this;
	}
	generatePasswordInUI = function (){
		var spinnerVal=parseInt($('#spinner').val());
		if( !isNaN(spinnerVal)  ){
			passwordSize=spinnerVal;
		}
		var passwd=SecurePasswordTool.makePasswordWithSize(passwordSize);
		$("#generatedPassword").val(passwd); 	
		testPassword(passwd);
		copyToClipboard(passwd);
		return this;
	}
	testPassword = function (passwd){
		var rate=SecurePasswordTool.ratePassword(passwd);				
		showRatingElement("#passwordRate","#passwordRateValue","#coloredRate",rate);
		showRatings();
		if ( typeof gauge !== 'undefined'){
			gauge.set(rate.rating*100);
		}
		return this;
	}
	showRatingElement = function ( passwordRateEID, passwordRateValueEID, coloredRateEID, evaluation){
		$(coloredRateEID).attr('class', SecurePasswordTool.passwordStrengthDescFromRate(evaluation.rating));
		$(passwordRateEID).text(""+SecurePasswordTool.passwordStrengthDescFromRate(evaluation.rating)); 
		$(passwordRateValueEID).text(" ("+(evaluation.rating*100).toFixed(2)+"%)" + " - " + evaluation.comment ); 				
		return this;
	}
}
