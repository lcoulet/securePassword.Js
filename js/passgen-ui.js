var ratingDetails;
var gauge;

function buildCharsetsForm( elementID ){	
	for(var charsetName in availableCharsets){
		var htmlCharset=$('<div/>').text(availableCharsets[charsetName]).html();
		var checkboxId=charsetName;
		var checkboxEnabled="";
		if( $.inArray(charsetName, defaultEnabledCharsets) >= 0  ){
			checkboxEnabled='checked="yes"';
		}
		 $(elementID).append('<input type="checkbox" id="'+checkboxId+'" '+checkboxEnabled+'/><label for="'+checkboxId+'">'+charsetName+' ('+htmlCharset+')</label><br />');		 
		 $('#'+checkboxId).change(function(){
			if( this.checked ) enableCharset( this.id ); else disableCharset(this.id);
		 }).bind(charsetName);
		 
	}
}

function buildGaugeElement(elementID){
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
	
}

function buildGenerateButton( elementID ){	
	$( elementID ).button().click(
				function( event ) {
					generatePasswordInUI();
				}
			);
}


function buildTestButton( elementID ){	
	$( elementID ).button().click(
				function( event ) {
					testPassword($("#generatedPassword").val());
				}
			);
}


function buildOptionsForm( elementID ){	
	var checkboxId="repeatAllowed";
	var checkboxEnabled='checked="yes"';
	$(elementID).append('<input type="checkbox" id="'+checkboxId+'" '+checkboxEnabled+'/><label for="'+checkboxId+'">Allow character repetition</label><br />');		 
	 $('#'+checkboxId).change(function(){
		if( this.checked ) allowCharacterRepetition=true; else allowCharacterRepetition=false;
	});
	$(elementID).append('<label for="spinner">Password size:</label><input id="spinner" name="value" value="10" type="number" min="1" max="255" required/>');
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
}

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function buildRatingElements(elementID){	
	ratingDetails=$(elementID);
	for(var rating in ratings){
		var elemIDc="r"+rating+"Col";
		var elemIDr="r"+rating+"Txt";
		var elemIDv="r"+rating+"Val";
		ratingDetails.append('<div id="'+elemIDc+'">'+$('<div/>').text(rating).html()+': <span id="'+elemIDr+'"></span><span id="'+elemIDv+'"></span></div><br />');
	}
}
function showRatings(){		

	for(var rating in ratings){
		var oneRating=ratings[rating];
		var elemIDc="#r"+rating+"Col";
		var elemIDr="#r"+rating+"Txt";
		var elemIDv="#r"+rating+"Val";
		console.log(elemIDr+", "+elemIDv+", "+elemIDc+", "+oneRating );
		showRatingElement(elemIDr,elemIDv,elemIDc,oneRating );
	}
}


function generatePasswordInUI(){
	var spinnerVal=parseInt($('#spinner').val());
	if( !isNaN(spinnerVal)  ){
		passwordSize=spinnerVal;
	}
	var passwd=makePasswordWithSize(passwordSize);
	$("#generatedPassword").val(passwd); 	
	testPassword(passwd);
	copyToClipboard(passwd);
}

function testPassword(passwd){
	var rate=ratePassword(passwd);				
	showRatingElement("#passwordRate","#passwordRateValue","#coloredRate",rate);
	showRatings();
	if ( typeof gauge !== 'undefined'){
		gauge.set(rate*100);
	}
}


function showRatingElement( passwordRateEID, passwordRateValueEID, coloredRateEID, rate){
	console.log(passwordRateEID, passwordRateValueEID, coloredRateEID, rate);
	$(coloredRateEID).attr('class', passwordStrengthDescFromRate(rate));
	$(passwordRateEID).text(""+passwordStrengthDescFromRate(rate)); 
	$(passwordRateValueEID).text(" ("+(rate*100).toFixed(2)+"%)"); 				
	
}

