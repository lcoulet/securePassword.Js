//  and Javascript password evaluator  UI based on JQuery
// Javascript password generator UI based on JQuery
// Author: L.Coulet, 2014
// License: Apache 2.0

var SecurePasswordTool=new SecurePassword();

function SecurePasswordUI() {  
	var ratingDetails;
	var gauge;
	
	var passwordSize=15;
	
	this.buildCharsetsForm = function ( elementID ){
		$(elementID).append('<span id="still_loading"><h2>Loading data...<h2><br /></span>');	
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
    this.buildShowButton = function ( elementID ){	
		$( elementID ).button().click(
					function( event ) {
						showPasswordInUI();
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
			$("#generatedPassword").prop("type", "password");
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
        document.getElementById(checkboxId).disabled=true;
		
		checkboxId="easierPattern";	
		$(elementID).append('<input type="checkbox" id="'+checkboxId+'" '+checkboxEnabled+'/><label for="'+checkboxId+'">Make pattern easier to remember (character repetition would be allowed)</label><br />');		 
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
		
		
		checkboxId="easyPatternUsesDict";	
		$(elementID).append('<input type="checkbox" id="'+checkboxId+'" '+checkboxEnabled+'/><label for="'+checkboxId+'">Use dictionaries for pattern easier to remember (can contain other characters than selected)</label><br />');		 
		 $('#'+checkboxId).change(function(){
			if( this.checked ) {SecurePasswordTool.useDictionaryForEasyPasswordRequested(true) ;}else {SecurePasswordTool.useDictionaryForEasyPasswordRequested(false); }
		});
		
		
		$(elementID).append('<label for="spinner">Password size:</label><input id="spinner" name="value" value="20" type="number" min="1" max="255" required/>');
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
	var copyToClipboard = function (text) {
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
		ratingDetails.append('<div id="passwdhashes"></div>');		
		return this;
	}
	var showRatings = function (){		
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
    var showPasswordInUI = function(){
        if( $("#generatedPassword").prop("type") === 'text'){
            $("#generatedPassword").prop("type", "password");
        }
        else {
            $("#generatedPassword").prop("type", "text");
        }
    }
	var generatePasswordInUI = function (){
		var spinnerVal=parseInt($('#spinner').val());
		if( !isNaN(spinnerVal)  ){
			passwordSize=spinnerVal;
		}
		var passwd=SecurePasswordTool.makePasswordWithSize(passwordSize);
		$("#generatedPassword").prop("type", "text");
		$("#generatedPassword").val(passwd); 	
		testPassword(passwd);
		copyToClipboard(passwd);
		return this;
	}
	var testPassword = function (passwd){
		var rate=SecurePasswordTool.ratePassword(passwd);				
		showRatingElement("#passwordRate","#passwordRateValue","#coloredRate",rate);
		showRatings();		
		if ( typeof gauge !== 'undefined'){
			gauge.set(rate.rating*100);
		}
		showHashes(passwd);
		return this;
	}
	var showRatingElement = function ( passwordRateEID, passwordRateValueEID, coloredRateEID, evaluation){
		$(coloredRateEID).attr('class', SecurePasswordTool.passwordStrengthDescFromRate(evaluation.rating));
		$(passwordRateEID).text(""+SecurePasswordTool.passwordStrengthDescFromRate(evaluation.rating)); 
		$(passwordRateValueEID).text(" ("+(evaluation.rating*100).toFixed(2)+"%)" + " - " + evaluation.comment ); 				
		return this;
	}
	
	var showHashes = function(password){
		var passHashes=SecurePasswordTool.makeHashFunctions(password);
		
		var outHtml=$("#passwdhashes");
		outHtml.text("HASH CODES BELOW:");
		outHtml.append("<br />");
		for(var hashFunction in passHashes){		
			outHtml.append($('<div/>').text(hashFunction).html()+": "+$('<div/>').text(passHashes[hashFunction]).html()+"<br />");			
			console.log(outHtml);
		}
		
	}
}

(function() {
    function async_load(){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'js/dict.js';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x); 
    }
    if (window.attachEvent)
        window.attachEvent('onload', async_load);
    else
        window.addEventListener('load', async_load, false);
	
})();

