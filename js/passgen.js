
// Make easy to remember
//  # short sequence of number
//  # one punctuation
//  # two sequences of alpha starting with uppercase and mixing voyels and consons
// In any order

// Make based on dictionnary

// Or make rough and complex

var availableCharsets={};
availableCharsets["alphaLower"]="abcdefghijklnopqrstuvwxyz";
availableCharsets["alphaUpper"]= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
availableCharsets["numeric"] ="0123456789";
availableCharsets["punctuation"]=" .,/;':?\"!";
availableCharsets["special"]="#@~<€`¬¦|>=+-_)(*&^%$£[]{}";
availableCharsets["accented"]="ÂÃÄÀÁÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜİàáâãäçèéêëìíîïğñòóôõöùúûüıÿ";
availableCharsets["accentedSpecial"]="ÅÆĞÑØŞßåæøş";


var enabledCharsets={};
enableAllCharsets();

var enableAlpha=true, enableNumeric=true, enableSpecial=true, enableAccented=true, enableAccentedSpecial=true;
var customChars="";

function setCustomCharset( charset ){
	if( charset.length==0 ){
		delete availableCharsets["custom"];
	}else{
		availableCharsets["custom"]=charset;
	}
}

function enableAllCharsets( charsetName ){
	for(var charsetName in availableCharsets){
		 enableCharset( charsetName );
	};
}


function enableCharset( charsetName ){
	enabledCharsets[charsetName]=availableCharsets[charsetName];
}

function disableCharset( charsetName ){
	delete enabledCharsets[charsetName];
}


function prepareCharset( ){
	var fullCharset="";
	document.write("charsets:");
	for(var charset in enabledCharsets){
		document.write(" "+charset);
		fullCharset+=enabledCharsets[charset];
	};
	document.write("<BR />"+fullCharset+"<BR />");
	return fullCharset;
}

function nextChar( charset ){	
	return charset.charAt(Math.floor(Math.random() * charset.length));
}

function checkCompliance( password ){
	var isCompliant=false;
	
	// if length is lower than number of charsets there's no way to solve it
	if (Object.keys(enabledCharsets).length > password.length) return password;
	
	while ( isCompliant == false ){
		isCompliant = true;
		for(var charsetName in enabledCharsets){
			var charset=enabledCharsets[charsetName];
			if( !hasOneFromCharset(charset, password) ){
				document.write("password \"" + password+ "\" was missing from " + charsetName );
				password=addOneFromCharset(charset, password);
				document.write(", now" + password + "<BR />");
				isCompliant=false;
			}		
		}
	}	
	return password;
}

function addOneFromCharset( charset, password ){	
	password = replaceCharAt( password, Math.floor(Math.random() * password.length), nextChar(charset))	;
	return password;
} 

function replaceCharAt(inputStr, index, newChar) {
    var strArray = inputStr.split("");
    strArray[index] = newChar;
    return strArray.join("");
}

function ratePassword( password ){
	var ratings={};
	ratings["passwordSize"]=ratePasswordSize(password);
	ratings["charsets"]=rateCharsets(password);
	ratings["characterVariety"]=rateCharacterVariety(password);
	
	var nbRatings=Object.keys(ratings).length;
	var sumOfRatings=0;
	var productOfRatings=1;
	for(var rating in ratings){
		var oneRating=ratings[rating];
		sumOfRatings+=oneRating;
		productOfRatings*=oneRating;
	}	
	//return (sumOfRatings/nbRatings+Math.pow(productOfRatings, 1/3))/2;
	return Math.pow(productOfRatings, 1/3);
	
}

// return a value between 0 and 1 related to the password size
function ratePasswordSize( password ){
	var len = password.length;
	// lower than 5 is far too low
	if ( len < 5 ) return 0.01;	
	// lower than 10 is weak
	if ( len < 10 ) return .3+.03*len;
	// more than 10 is good enough
	if ( len < 20 ) return .60+.03*(len-10);
	// more than 20 is pretty good
	if ( len < 30 ) return .90+.01*(len-20);
	// more than 30 characters = great enthropy
	return 1.0;	
}

function rateCharsets( password ){
	var charsetCount=0;
	for(var charsetName in availableCharsets){
		var charset=enabledCharsets[charsetName];
		if( hasOneFromCharset(charset, password) ){
			charsetCount++;
		}		
	}
	// less than 2 types of characters is not enough
	if( charsetCount < 2 ) return 0.01;
	// 2 types of characters is weak
	if( charsetCount == 2 ) return .2;
	// 3 types of characters is good enough
	if( charsetCount == 3 ) return .7;
	// More than 3 types of characters is pretty good
	if( charsetCount == 4 ) return .9;	
	// More than 4 types of characters is perfect
	return 1.0;
	
}

function rateCharacterVariety( password ){	
	var differentCharacters={};
	for (var i=0;i<password.length;i++) {  
		differentCharacters[password.charAt(i)]=true;
	}
	var nbDifferentCharacters=Object.keys(differentCharacters).length;
	var variation=nbDifferentCharacters/password.length;
	// less than 10% variation is not enough
	if (variation<.1) return 0.01;
	// less than 50% variation is weak
	if (variation<.5) return variation/2;
	// 50-85% variation is good enough
	if (variation<.85) return variation;
	// 85-95% variation is perfect
	if (variation<.95) return 1.0;
	// close to 100% variation is a little bit worse, a bit of repetition makes assessment harder
	return .95;
}

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



function makePassword( passwdSize ){
	var passwd="";
	var charset=prepareCharset();
	for (var i=0;i<passwdSize;i++) {    
		passwd+=nextChar( charset );
	}
	return checkCompliance(passwd);
}


