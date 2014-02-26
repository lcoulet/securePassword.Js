
// Make easy to remember
//  # short sequence of number
//  # one punctuation
//  # two sequences of alpha starting with uppercase and mixing voyels and consons
// In any order

// Make based on dictionnary

// Or make rough and complex

var availableCharsets={};
availableCharsets["alphaLower"]				='abcdefghijklmnopqrstuvwxyz';
availableCharsets["alphaUpper"]				='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
availableCharsets["numeric"]				='0123456789';
availableCharsets["punctuation"]			='.,/;\':?"!#@~<>=+-_)(*&%';
availableCharsets["special"]				=' `|^$£€[]{}';
availableCharsets["accented"]				='àáâãäçèéêëìíîïğñòóôõöùúûüıÿ';
availableCharsets["accentedUppercase"]		='ÂÃÄÀÁÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜİ';
availableCharsets["accentedSpecial"]		='ÅÆĞÑØŞßåæøş¬¦';

var classifiedCharsets={};
classifiedCharsets["vowel"]				= 'aeiouyAEIOUYàáâãäèéêëìíîïğòóôõöùúûüıÿÂÃÄÀÁÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜİÅÆØåæø';
classifiedCharsets["consonant"]			= 'bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZçñÇĞÑŞßş';
classifiedCharsets["numeric"]			='0123456789';
classifiedCharsets["separate"]			='.,/;:?!¬¦| #@~=+-_&^%$£€*\`"';
classifiedCharsets["open"]				='\'"<([{`*/';
classifiedCharsets["close"]				='\'">)]}`*/';
classifiedCharsets["uppercase"]			= 'BCDFGHJKLMNPQRSTVWXZÇĞÑAEIOUYÂÃÄÀÁÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜİÅÆØß';
classifiedCharsets["lowercase"]			= 'aeiouybcdfghjklmnpqrstvwxzŞşçñàáâãäèéêëìíîïğòóôõöùúûüıÿåæø';

var easyPasswordRequested=false;

var defaultEnabledCharsets=["alphaLower","alphaUpper","numeric","punctuation"];

var enabledCharsets={};
enableDefaultCharsets();

var allowCharacterRepetition=true;
var passwordSize=10;

var enableAlpha=true, enableNumeric=true, enableSpecial=true, enableAccented=true, enableAccentedSpecial=true;
var customChars="";
var ratings={};

ratings["passwordSize"]=0;
ratings["charsets"]=0;
ratings["characterVariety"]=0;
ratings["sequences"]=0;
ratings["keyboard"]=0;

var coefficients={};
coefficients["passwordSize"]=4;
coefficients["charsets"]=1;
coefficients["characterVariety"]=1;
coefficients["sequences"]=1;
coefficients["keyboard"]=1;


function easierToRememberPassword( allowedCharset, length, password, previous ){	
	// if we're done return the generated password
	if( password.length >= length) return password;
	
	// make a word or a number of an arbitrary length (or remaining characters number)
	// alphabetic words may be longer than numbers
	var passwordAddon="";
	var lastItem;
	var remainingSize = length-password.length;
	
	var addonMaxSize=remainingSize ;
	var addonLength;
	if ( previous === "word" ){
		if( addonMaxSize > 6 ) addonMaxSize = 6;
		// improve chances for a year
		if( addonMaxSize > 3 ) addonLength=4;
		if( Math.random() > .6 ) addonLength = Math.ceil( Math.random() * addonMaxSize);
		
		
		//  check if allowed charset contains numbers before adding any
		if( allowedCharset.indexOf(classifiedCharsets["numeric"]) != -1 )
			passwordAddon=easierToRememberPasswordNumber(allowedCharset, addonLength );
		lastItem="number";
	} else{
		if( addonMaxSize > 8 ) addonMaxSize = 8;
		var addonLength = Math.ceil( Math.random() * addonMaxSize);
		// word
		passwordAddon=easierToRememberPasswordWord( allowedCharset, addonLength );
		lastItem="word";
	}
		
	
	// Maybe pick a separator, or an open-close group
	passwordAddon=addSeparatorOrOpenCloseOrNothing( allowedCharset, length, passwordAddon );
		
	// append or prepend to previous password
	var newPassword=appendOrPrepend(password,passwordAddon );
	
	// recursive call, do this amn arbitrary number of times until length is Ok		
	return easierToRememberPassword(allowedCharset, length, newPassword, lastItem )
}

function addSeparatorOrOpenCloseOrNothing( allowedCharset, maxLength, currentPassword){
	var remainingLength=maxLength-currentPassword.length;
	
	if (  remainingLength  >= 2){		
		if ( Math.random() > .6) {
			var index=Math.floor(Math.random() * classifiedCharsets["open"].length);
			if( allowedCharset.indexOf(classifiedCharsets["open"].charAt(index)) >=0 &&  allowedCharset.indexOf(classifiedCharsets["close"].charAt(index))> 0)
				return classifiedCharsets["open"].charAt(index) + currentPassword + classifiedCharsets["close"].charAt(index);
		}		
	}
	if (  remainingLength >= 1){
		if ( Math.random() > .5){ 			
			var charToAdd = pickOneFromCharsetWithPreference(allowedCharset, classifiedCharsets["separate"]);
			var strToAdd= charToAdd;
			// repeat chances			
			while( remainingLength > strToAdd.length &&  Math.random() > .7) {
				strToAdd+=""+charToAdd;
			}
			return appendOrPrepend(currentPassword, strToAdd);
		}
	}
	return currentPassword;
}	

function commonCharset( charset1, charset2){
	var returnCharset="";
	for ( var i = 0; i < charset1.length; i++ )
	{
		var curChar=charset1.charAt(i);
		if( hasOneFromCharset(charset2, curChar+"")) returnCharset+=curChar;
	}
	return returnCharset;
}

function appendOrPrepend( existing, addon){
	if ( Math.random() > .5) return addon + existing;  
	return existing+addon;
}

function easierToRememberPasswordWord( allowedCharset, length ){
	var type = Math.ceil(Math.random()*3);
	
	return easierToRememberPasswordWordRec( allowedCharset, "", length, type, Math.ceil(Math.random()*2) );
	
}

function easierToRememberPasswordWordRec( allowedCharset, currentWord, length, type, lastTaken ){
	if( currentWord.length >= length) return currentWord;
	
	var maxLength=length-currentWord.length;
	
	if( type == 3 && currentWord.length > 0){
		type=1;
	}
	
	var addOn="";
	
	// take vowel or consonant depending on last type and append
	var takeFrom=classifiedCharsets["consonant"];	
	var newLastTaken=1;
	if (lastTaken == 1 ){
		takeFrom=classifiedCharsets["vowel"];
		newLastTaken=2;
	}
		
	// Upercase or lowercase ?
	// 3 choices : 3-one uppercase + lowercase / 2-all lowercase / 1-all uppercase	
	var reducedCharset;
	if ( type == 1 ){
		reducedCharset = commonCharset(takeFrom,classifiedCharsets["uppercase"]);			
	}else if (type == 2 ){
		reducedCharset = commonCharset(takeFrom,classifiedCharsets["lowercase"]);	
	}else {
		reducedCharset = commonCharset(takeFrom,classifiedCharsets["uppercase"]);
		type = 2;
	}

	
	// take 1 to 3 characters? 
	var nbChars=Math.ceil(Math.random()*3);
	if ( nbChars > maxLength ) nbChars=maxLength;
		
	while ( addOn.length < nbChars){
		
		addOn+=""+pickOneFromCharsetWithPreference(allowedCharset,reducedCharset);
	} 	
	
	return easierToRememberPasswordWordRec( allowedCharset, currentWord+addOn, length, type, newLastTaken );
}



function easierToRememberPasswordNumber( charset, length ){
	var currNumber="";
	
	// if size is 4, chances for a date 2000's, 1900's ...etc.
	if ( length == 4 ){
		if( Math.random() > .7 ) currNumber="20";
		else if( Math.random() > .7 ) currNumber="19";
		else if( Math.random() > .8 ) currNumber="18";
		else if( Math.random() > .8 ) currNumber="17";
		else if( Math.random() > .8 ) currNumber="21";
		else if( Math.random() > .8 ) currNumber="16";
		else if( Math.random() > .8 ) currNumber="15";
		else if( Math.random() > .8 ) currNumber="14";
	}
	
	while ( currNumber.length < length){
		currNumber+=""+nextChar(classifiedCharsets["numeric"]);
	} 
	return currNumber;
}



/**
 * returns a character in both allowed and preferred charsets. If no common characters preferred, return one from allowed. 
 */
function pickOneFromCharsetWithPreference(allowedCharacters, preferredCharacters){
	var reducedCharset = commonCharset( allowedCharacters, preferredCharacters );
	if( reducedCharset.length == 0 ){
		reducedCharset=allowedCharacters;
	}
	
	return nextChar(reducedCharset);
}




/**
 * Creates a custom charset names "custom" (or replace if already exists) with the provided characters
 * @param {string} The characters of the custom charset
 */
function setCustomCharset( charset ){
	if( charset.length==0 ){
		delete availableCharsets["custom"];
	}else{
		availableCharsets["custom"]=charset;
	}
}

/**
 * Enables all available charset
 */
function enableAllCharsets( ){
	for(var charsetName in availableCharsets){
		 enableCharset( charsetName );
	};
}

/**
 * Enables all default charsets
 */
function enableDefaultCharsets(){
	defaultEnabledCharsets.forEach(function(charsetName) {
		enableCharset( charsetName );
	});
}

/**
 * Enables one charset
 * @param {string} The name of the charset to enable
 */
function enableCharset( charsetName ){
	console.log("Charset " + charsetName  + " enabled");
	enabledCharsets[charsetName]=availableCharsets[charsetName];
}

/**
 * Disables one charset
 * @param {string} The name of the charset to disable
 */
function disableCharset( charsetName ){
	console.log("Charset " + charsetName  + " disabled");
	delete enabledCharsets[charsetName];
}

/**
 * Builds a bigger charset from all enabled charsets
 * @type {string} The complete charset
 */
function prepareCharset( ){
	var fullCharset="";
	var logStr="Enabled charsets:";
	for(var charset in enabledCharsets){
		logStr+=" "+charset;
		fullCharset+=enabledCharsets[charset];
	};
	console.log(logStr);
	console.log("Characters:"+fullCharset)
	return fullCharset;
}

/**
 * Provides any character (random) from the provided charset
 * @param {string} charset The set of characters to use
 * @type {string} The random character
 */
function nextChar( charset ){	
	return charset.charAt(Math.floor(Math.random() * charset.length));
}

/**
 * Checks, and ensures if possible, that the password has at least one character from all enabled charsets
 * @param {string} password the password to analyze
 * @type {string} The eventually modified (or not) version of the password
 */
function checkCompliance( password ){
	var isCompliant=false;
	
	// if length is lower than number of charsets there's no way to solve it
	if (Object.keys(enabledCharsets).length > password.length) return password;
	
	while ( isCompliant == false ){
		isCompliant = true;
		for(var charsetName in enabledCharsets){
			var charset=enabledCharsets[charsetName];
			if( !hasOneFromCharset(charset, password) ){
				var logStr="password \"" + password+ "\" was missing from " + charsetName ;
				password=addOneFromCharset(charset, password);
				console.log(logStr + ", now" + password);
				isCompliant=false;
			}		
		}
	}	
	return password;
}

/**
 * Adds a character from specified charset to the provided password, by replacing another character
 * @param {string} charset the set of characters to include a char from
 * @param {string} password the password to analyze
 * @type {string} The eventually modified (or not) version of the password
 */
function addOneFromCharset( charset, password ){	
	password = replaceCharAt( password, Math.floor(Math.random() * password.length), nextChar(charset))	;
	return password;
} 

/**
 * Replaces a character at specified index
 * @param {string} inputStr the set of characters to include a char from
 * @param {number} index index of the character to replace
 * @type {string} The  modified version of the string
 */
function replaceCharAt(inputStr, index, newChar) {
    var strArray = inputStr.split("");
    strArray[index] = newChar;
    return strArray.join("");
}
/**
 * Rate a password using the default strategy
 * @param {string} password the password being evaluated
  * @type {object} The password rating
 */
function ratePassword( password ){
	ratings["passwordSize"]=ratePasswordSize(password);
	ratings["charsets"]=rateCharsets(password);
	ratings["characterVariety"]=rateCharacterVariety(password);
	ratings["sequences"]=rateSequences(password);
	ratings["keyboard"]=rateKeyboardLayout(password);
	
	
	coefficients["passwordSize"]=4;
	coefficients["charsets"]=1;
	coefficients["characterVariety"]=1;
	coefficients["sequences"]=1;
	coefficients["keyboard"]=1;
	
	
	var nbRatings=0;
	var sumOfRatings=0;
	var productOfRatings=1;
	for(var ratingName in ratings){
		var oneRating=ratings[ratingName].rating;
		sumOfRatings+=oneRating;
		productOfRatings*=Math.pow(oneRating,coefficients[ratingName]);
		nbRatings+=coefficients[ratingName];
	}	
	//return (sumOfRatings/nbRatings+Math.pow(productOfRatings, 1/3))/2;
	var globalRating=Math.pow(productOfRatings, 1.0/nbRatings);
	return {
			rating: globalRating,
			comment: "Aggregate from all individual ratings (size is first criteria)"
		}
		
	
	
}



/**
 * Provides a subjective rating of a given password according to its size
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function ratePasswordSize( password ){
	var len = password.length;
	
	// lower than 5 is far too low	
	if ( len < 5 ) return {rating:0.0, comment: "Password is far too short: "+len};		
	if ( len < 8 ) return {rating:0.03*len, comment: "Password is too short: "+len};		
	if ( len < 15 ) return {rating:.4+.05*(len-7), comment: "Password length is questionable: "+len};
	if ( len < 30 ) return {rating:.8+.01*(len-15), comment: "Password length is pretty good: "+len};	
	if ( len < 50 ) return {rating:.99+.0005*(len-30), comment: "Password length is awesome... Is is easy to remember?: "+len};
	return {rating:1.0, comment: "Password length is insane!!: "+len};	
	
	
}


/**
 * Provides a subjective rating of a given password for the amount/size of character sequences inside
 * @param {string} password The set of characters to use
 * @type {number} The rating, floating point value between 0 and 1
 */
function rateSequences( password ){
	
	var sequences=findSequences(password);
	var seqLength = sequences.reduce(function(previousValue, currentValue, index, array){
		return previousValue + currentValue;
	},"").length;		
	var seqStr = sequences.reduce(function(previousValue, currentValue, index, array){
		return previousValue + " / " + currentValue;
	},"");		
	var ratio=seqLength/password.length;
	
	if( ratio <= .1) return {rating:1.0, comment: "Perfect: No (or very few) sequences found"};
	if( ratio <= .5) return {rating:.9-ratio/2, comment: "Average amount of sequences found: " + seqStr};
	if( ratio <= .6) return {rating:.64-(ratio-.5), comment: "Impactive amount of sequences found: " + seqStr};
	if( ratio <= .8) return {rating:.53-((ratio-.6)*2.0), comment: "Too many / long sequences found: " + seqStr};
	if ( ratio == 1.0 ) return {rating:0.0, comment: "Your password is all sequences: " + seqStr} ;
	return {rating:0.1, comment: "Too many / long sequences found: " + seqStr};
	
	
}

/**
 * Provides a subjective rating of a given password for the character sequences inside according to keyboard layouts
 * @param {string} password The set of characters to use
 * @type {number} The rating, floating point value between 0 and 1
 */
function rateKeyboardLayout( password ){
	var keyboardSequences={};
	if( !password || password.length==0 ){
		return {rating: 0.0, comment: "no passwords"};
	}
	
	keyboardSequences["qwerty"]=("qwertyuiop[]asdfghjkl;'#zxcvbnm,./1234567890");
	keyboardSequences["qwertz"]=("qwertzuiopü+asdfghjklöä#<ycxvbnm,.-1234567890");
	keyboardSequences["azerty"]=("azertyuiop^$qsdfghjklmù*<wxcvbn?.:!1234567890");
	
	var worstsequence= {
			length: 0,
			sequence: "",
			offset: 0
		};
	
	var passwd=password.toLowerCase(); 
	var keyboardRecognized="";
	for(var keyboardseqName in keyboardSequences){
		var commonality=longestCommonSubstring(passwd, keyboardSequences[keyboardseqName]);
		if( commonality.length > worstsequence.length){
			worstsequence=commonality;
			keyboardRecognized=keyboardseqName;
		}
		//console.log( "password : " + commonality.length + " " + commonality.sequence + " keyboard: " + keyboardseqName );
	}
	
	if ( worstsequence.length == 0) return {rating:1.0, comment: "Perfect : no keyboard sequence"} ;		
	// Less than 3 characters is no problem	
	if ( worstsequence.length < 3 && password.length > 8 ) return {rating:1.0, comment: "Perfect: No (or short enough) keyboard sequences found"};			
	if ( worstsequence.length < 3  ) return {rating:1-worstsequence.length/10, comment: "Keyboard sequence: " + keyboardRecognized  + " layout, \"" + worstsequence.sequence+'"'};		
	
	var indicator=worstsequence.length/password.length;
	
	// More than 70% is too much, reduce by 4
	if ( indicator > .7) 	return {rating:(password.length-worstsequence.length)/(4*password.length), comment: "Too long keyboard sequence: \"" + keyboardRecognized  + " layout, " + worstsequence.sequence+'"'};
	
	// More than 45% is too much, reduce by 2
	if ( indicator > .45) 	return {rating:(password.length-worstsequence.length)/(2*password.length), comment: "Long keyboard sequence: \"" + keyboardRecognized  + " layout, " + worstsequence.sequence+'"'};
		
	// 3 characters  or more depend on password size
	return {rating:(password.length-worstsequence.length)/password.length, comment: "Keyboard sequence: " + keyboardRecognized  + " layout, \"" + worstsequence.sequence+'"'};
	
	
}

/**
 * This function provides the longest common substring between two strings
 * This algorithm is not optimized but good enough for one password and a 
 * small sequence of characters representing the keyboard layout.
 *
 * taken from:
 * http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Longest_common_substring
 * @param {string} string1 First string
 * @param {string} string2 Second string
 * @return {object} longest substring: length, sequence, offset
 */
function longestCommonSubstring(str1, str2){
	if (!str1 || !str2)
		return {
			length: 0,
			sequence: "",
			offset: 0
		};
 
	var sequence = "",
		str1Length = str1.length,
		str2Length = str2.length,
		num = new Array(str1Length),
		maxlen = 0,
		lastSubsBegin = 0;
 
	for (var i = 0; i < str1Length; i++) {
		var subArray = new Array(str2Length);
		for (var j = 0; j < str2Length; j++)
			subArray[j] = 0;
		num[i] = subArray;
	}
	var thisSubsBegin = null;
	for (var i = 0; i < str1Length; i++)
	{
		for (var j = 0; j < str2Length; j++)
		{
			if (str1[i] !== str2[j])
				num[i][j] = 0;
			else
			{
				if ((i === 0) || (j === 0))
					num[i][j] = 1;
				else
					num[i][j] = 1 + num[i - 1][j - 1];
 
				if (num[i][j] > maxlen)
				{
					maxlen = num[i][j];
					thisSubsBegin = i - num[i][j] + 1;
					if (lastSubsBegin === thisSubsBegin)
					{//if the current LCS is the same as the last time this block ran
						sequence += str1[i];
					}
					else //this block resets the string builder if a different LCS is found
					{
						lastSubsBegin = thisSubsBegin;
						sequence= ""; //clear it
						sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
					}
				}
			}
		}
	}
	return {
		length: maxlen,
		sequence: sequence,
		offset: thisSubsBegin
	};
}

/**
 * Provides a subjective rating of a given password according to the different sets of characters in use
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rateCharsets( password ){
	var charsetCount=0;
	charsetsStr="";
	for(var charsetName in availableCharsets){
		var charset=availableCharsets[charsetName];
		console.log("check charset " + charsetName + ": " + charset);
		if( hasOneFromCharset(charset, password) ){		
			charsetCount++;
			charsetsStr+=" / " + charsetName;
		}		
	}
	// less than 2 types of characters is not enough
	if( charsetCount < 2 ) return {rating:0.05, comment: "Not enough types of characters types:" + charsetsStr};
	// 2 types of characters is weak
	if( charsetCount == 2 ) return {rating:.2, comment: "Not enough types of characters types:" + charsetsStr};
	// 3 types of characters is good enough
	if( charsetCount == 3 ) return {rating:.65, comment: "Average amount of characters types:" + charsetsStr};
	// More than 3 types of characters is pretty good
	if( charsetCount == 4 ) return {rating:.9, comment: "Good amount of characters types:" + charsetsStr};	
	// More than 4 types of characters is perfect
	return {rating:1.0, comment: "Perfect amount of characters types:" + charsetsStr};	
	
	
}

/**
 * Provides a subjective rating of a given password according to the variety of characters
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rateCharacterVariety( password ){	
	var rate=rawRateCharacterVariety( password );
	if (rate.rating >= 1.0 ) return {rating: 1.0, comment: rate.comment}; else return rate;
}

/**
 * Provides a subjective rating of a given password according to the different sets of characters in use
 * @param {string} the password being evaluated
 * @type {object} The resulting rating
 */
function rawRateCharacterVariety( password ){	
	var differentCharacters={};
	for (var i=0;i<password.length;i++) {  
		differentCharacters[password.charAt(i)]=true;
	}
	var nbDifferentCharacters=Object.keys(differentCharacters).length;	
	var variation=nbDifferentCharacters/password.length;
	
	// lower too short password ratings
	if( password.length < 5 )
		variation = variation*.25;
	if( password.length < 10 )
		variation = variation*.8;
	if( password.length < 15 )
		variation = variation*.9;
	
	
	if (variation<.1) return {rating: 0.01*nbDifferentCharacters/10.0, comment: "Less than 10% variation of characters is not enough: " + (variation*100).toFixed(2)};	
	if (variation<.5) return {rating: variation/2*nbDifferentCharacters/10.0, comment: "less than 50% variation is weak: " + (variation*100).toFixed(2)};
	if (variation<.91) return {rating: variation*nbDifferentCharacters/10.0, comment: "50-90% variation may be good enough: " + (variation*100).toFixed(2)};
	if (variation<.99) return {rating: 1.0, comment: "91-99% variation is perfect: " + (variation*100).toFixed(2)};
	return {rating: .95*nbDifferentCharacters/10.0, comment: "99-100% variation is almost perfect: " + (variation*100).toFixed(2)};
}


/**
 * Checks if the password has at least one character from provided charset
 * @param {string} charset the related charset
 * @param {string} password the password to analyze
 * @type {boolean} true if the password has at least one character from provided charset, false either
 */
function hasOneFromCharset( charset, password){
	var hasFromCharset=false;
	for (var i=0;i<password.length;i++) {    
		if( charset.indexOf(password.charAt(i)) != -1 ) {
			hasFromCharset=true;
			break;
		}
	}
	return hasFromCharset;
}

/**
 * Build a password using global settings for passwordSize and charsets to use
 * @type {string} the generated password
 */
function makePassword(){
	return makePasswordWithSize(passwordSize);
}


/**
 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
 * @param {string} password the password to analyze
 * @type {string[]}
 */
function findSequences( password ){
	var lastCode=-1;
	var lastChar="";
	var isInSequence=false;
	var currSequence="";
	var sequences= new Array();
	var lastDirection=0;
	
	for (var i=0;i<password.length;i++) {    
		var currCode=password.charCodeAt(i);
		var direction=0;
		var isSequence=false;
		
		// if this is not the first character, check for ordered sequence
		if( lastCode != -1 ) {
			// do we detect a sequence?
			isSequence=(Math.abs( currCode - lastCode) == 1);
			direction=currCode - lastCode;
			
			// check if sequential status detection status changed
			if( isSequence != isInSequence){
				if( isSequence == true ){
					currSequence+=lastChar;
					lastDirection=currCode - lastCode;
				}else{
					sequences.push(currSequence);
					currSequence="";
				}				
			}
			
			if( isSequence ){
				// check if direction changed, if yes there are 2 sequences
				if( direction != lastDirection){
					sequences.push(currSequence);
					currSequence=""+lastChar;
				}
				// keep information of current sequence
				currSequence=currSequence+password.charAt(i);
			}					
		}
		
		isInSequence=isSequence;
		
		// keep information foir checking next char
		lastCode=currCode;
		lastChar=password.charAt(i);
		lastDirection=direction;
	}
	if( currSequence.length != 0 ){
		sequences.push(currSequence);
	}
	
	return sequences;
}

/**
 * Provides a subjective description of password security
 * @param {object} the password rating
 * @type {string} The resulting description
 */
function passwordStrengthDescFromRate(rate){
	if( rate < .5) return "Unsafe";
	if( rate < .6) return "Weak";
	if( rate < .7) return "Medium";
	if( rate < .8) return "Good";
	if( rate >= .8) return "Secure";
	return "N/A";
}

/**
 * Generates a password of a given size
 * @param {number} the size of the requested password
 * @type {string} The generated password
 */
function makePasswordWithSize( passwdSize ){
	var charset=prepareCharset();
	
	if ( easyPasswordRequested ) return easierToRememberPassword( charset, passwdSize,"","");
	else return makeAnyPasswordWithSize(charset, passwdSize);
	
}



function makeAnyPasswordWithSize( charset, passwdSize ){
	var passwd="";
	
	for (var i=0;i<passwdSize;i++) {
		var newChar=nextChar( charset )
		passwd+=newChar;
		if( !allowCharacterRepetition ) {
			charset=charset.replace(newChar,'');
		}
	}
	return checkCompliance(passwd);
}
