// Javascript password generator
//  and Javascript password evaluator
// Author: L.Coulet, 2014
// License: Apache 2.0

// ------------------------------------------------------------------------
// The globals... THis is not state-of-the-art nut good-enough to start with
// Javascript ninja may prefer to close their eyes.

function SecurePassword() {  
    var availableCharsets={};
	availableCharsets["alphaLower"]				='abcdefghijklmnopqrstuvwxyz';
	availableCharsets["alphaUpper"]				='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	availableCharsets["numeric"]				='0123456789';
	availableCharsets["punctuation"]			='.,/;\':?"!#@~<>=+-_)(*&%';
	availableCharsets["special"]				=' `|^$£€[]{}';
	availableCharsets["accented"]				='àáâãäçèéêëìíîïðñòóôõöùúûüýÿ';
	availableCharsets["accentedUppercase"]		='ÂÃÄÀÁÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ';
	availableCharsets["accentedSpecial"]		='ÅÆÐÑØÞßåæøþ¬¦';

	var classifiedCharsets={};
	classifiedCharsets["vowel"]				= 'aeiouyAEIOUYàáâãäèéêëìíîïðòóôõöùúûüýÿÂÃÄÀÁÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝÅÆØåæø';
	classifiedCharsets["consonant"]			= 'bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZçñÇÐÑÞßþ';
	classifiedCharsets["numeric"]			='0123456789';
	classifiedCharsets["separate"]			='.,/;:?!¬¦| #@~=+-_&^%$£€*\`"';
	classifiedCharsets["open"]				='\'"<([{`*/';
	classifiedCharsets["close"]				='\'">)]}`*/';
	classifiedCharsets["uppercase"]			= 'BCDFGHJKLMNPQRSTVWXZÇÐÑAEIOUYÂÃÄÀÁÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝÅÆØß';
	classifiedCharsets["lowercase"]			= 'aeiouybcdfghjklmnpqrstvwxzÞþçñàáâãäèéêëìíîïðòóôõöùúûüýÿåæø';

	var easyPasswordRequested=false;
	var easyPasswordUsingDictionary=false;

	var defaultEnabledCharsets=["alphaLower","alphaUpper","numeric","punctuation"];

	var enabledCharsets={};

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
	ratings["dictionary"]=0;
	ratings["commonPasswords"]=0;

	var coefficients={};
	coefficients["passwordSize"]=4;
	coefficients["charsets"]=1;
	coefficients["characterVariety"]=1;
	coefficients["sequences"]=1;
	coefficients["keyboard"]=1;
	coefficients["dictionary"]=1;


	// The dictionary lookup object
	var dict = {};
	var dictKeys = {};
	// The password dictionary lookup object
	var passwddict = {};
	var passwddictKeys = {};

	// Dictonaries
	// English stub dictionary
	var englishdict="the and that was his with for had you not her which have from this him but all she ...";
	
	// French stub dictionary
	var frenchdict="les des une que est pour qui dans par plus pas sur sont Les avec son aux d'un cette ...";

	// worst passwords list stub dictionary
	var worstPassswordsdict="password 123456 12345678 1234 qwerty 12345 dragon pussy baseball football ...";
	


	var translations = {
	  en:  { test_str: "test(en)"
				, passwordSize: "password size"
				, charsets: "character types"
				, alphaLower: "alphabet lowercase"
				, alphaUpper: "alphabet uppercase"
				, numeric: "numeric"
				, punctuation: "punctuation"
				, special: "special"
				, accented: "accented"
				, accentedUppercase: "accentedUppercase"
				, accentedSpecial: "accentedSpecial"			
				, characterVariety: "character variety"
				, sequences: "character sequences"
				, keyboard: "character keyboard sequences"
				, dictionary: "dictionary"
				, globalRatingComment: "Aggregate from all individual ratings (size is first criteria)"
				, rd_allwords_l: " (all words: "
				, rd_allwords_r: ")"
				, rd_allwords_hazard: "Hazardous, found word in "
				, rd_allwords_weak: "Weak, found word in "
				, rd_allwords_dic: " dictionary: "
				, rd_allwords_q: "Questionable, found word in "
				, rd_allwords_a: "Average, found word in "
				, rd_allwords_g: "Good, found word in "
				, rd_allwords_e1: "Excellent, even if found word in "
				, rd_allwords_e2: "Excellent, no significant word found from dictionary compared to password size"
				, rateUnsafe: "Unsafe"
				, rateWeak: "Weak"
				, rateMedium: "Medium"
				, rateGood: "Good"
				, rateSecure: "Secure"
				, rateHazardous: "Hazardous"
				, rs_wts: "Password is far too short: "
				, rs_ts: "Password is too short: "
				, rs_q: "Password length is questionable: "
				, rs_g: "Password length is pretty good: "
				, rs_a: "Password length is awesome... Is is easy to remember?: "
				, rs_i: "Password length is insane!!: "
				, rseq_perfect: "Perfect: No (or very few) sequences found"
				, rseq_average: "Average amount of sequences found: "
				, rseq_impactive: "Impactive amount of sequences found: "
				, rseq_toomany: "Too many / long sequences found: "
				, rseq_allsequences: "Your password is all sequences: "
		   }
	, fr:  { test_str: "test(fr)"
				, passwordSize:   "Longueur de mot de passe"
				, charsets:   "Types de caractères"
				, alphaLower:   "alphabet minuscule"
				, alphaUpper:   "alphabet majuscule"
				, numeric:   "numérique"
				, punctuation:   "ponctuation"
				, special:   "caractères spéciaux"
				, accented:   "caractères accentués"
				, accentedUppercase:   "caractères accentués majuscule"
				, accentedSpecial:   "caractères accentués/spéciaux"			
				, characterVariety:   "variété"
				, sequences:   "séquences"
				, keyboard:   "séquences clavier"
				, dictionary:   "dictionnaire"
				, globalRatingComment:   "Aggrégation des critères individuels (la taille compte plus)"
				, rd_allwords_l:   " (tous les mots: "
				, rd_allwords_r:    ")"
				, rd_allwords_hazard:    "Dangereux, mot trouvé "
				, rd_allwords_weak:    "Faible, mot trouvé "
				, rd_allwords_dic:    " dictionnaire: "
				, rd_allwords_q:    "Médiocre, mot trouvé "
				, rd_allwords_a:    "Moyen, mot trouvé "
				, rd_allwords_g:    "Bon, mot trouvé "
				, rd_allwords_e1:    "Excellent, malgré mot trouvé "
				, rd_allwords_e2:    "Excellent, pas ou peu de mots du dictionnaire comparé à la taille du mot de passe "
		   }
	};

	var defaultText=translations.en;
	var selectedLanguage=defaultText;

	this.setCharacterRepetitionAllowed=function( allowRepetition ){
		allowCharacterRepetition=allowRepetition;
	}
	
    	this._gettext = function ( key )
		{
		  return gettext(key);
		}
		
		/**
		 * Translation function
		 * @param {key} the localized string key
		 * @type {string} the localized string
		 */
		gettext = function ( key )
		{
		  return selectedLanguage[ key ] || defaultText[ key ] || "{translation key not found: " + key + "}";
		}

		/**
		 * Set language to the selected key (e.g. fr, en), or to default
		 * @param {lang} the Language key
		 */
		this.setLanguage = function ( lang )
		{
		  if ( typeof translations[lang] !== 'undefined') {
			selectedLanguage=translations[lang];
		  }else{
			selectedLanguage=defaultText;
		  }
		  return this;
		}


		/**
		 * Retrieve all details from latest password rating
		 * @type {object} The password rating details object
		 */
		this.getLastRatingDetails = function (){
			return ratings;
		}
		/**
		 * Unloads a dictionary in the dictionaries set
		 * @param {string} name The name of the removed words list
		 * @type {object} The new dictionaries set
		 */
		this.unloadDictionary = function ( name ){
			delete dict[name];
			delete dictKeys[name];
			return this;
		}


		/**
		 * Selects the type of  password generator
		 * @type {boolean} Enables generator for password easier to remember if true, or all random is false
		 */
		this.setEasyPasswordRequested = function ( trueOrFalse ){
			easyPasswordRequested=trueOrFalse;
			return this;
		}
		/**
		 * Selects the type of easy password generator for
		 * @type {boolean} Enables dictionaries if true, or disables them
		 */
		this.useDictionaryForEasyPasswordRequested = function ( trueOrFalse ){
			easyPasswordUsingDictionary=trueOrFalse;
			return this;
		}

		/**
		 * Unloads any dictionary in the dictionaries set
		 * @type {object} The new dictionaries set
		 */
		this.unloadAllDictionaries = function (  ){
			dict = {};
			dictKeys={};
			return dict;
		}


		/**
		 * Loads a dictionary in the dictionaries set
		 * @param {string} dictionary The string to look into
		 * @param {string} name The name of the added words list
		 * @type {object} The new dictionaries set
		 */
		this.loadDictionary = function ( dictionary, name ){
			dict[ name ]={};
			// Get an array of all the words
			var words = dictionary.split( " " );
		 
			// And add them as properties to the dictionary lookup
			// This will allow for fast lookups later
			for ( var i = 0; i < words.length; i++ ) {
				dict[ name ][ words[i] ] = true;		
			}
			
			dictKeys[ name ] = Object.keys(dict[ name ]);
			return dict;
		}


		/**
		 * Loads a password dictionary in the relevant dictionaries set
		 * @param {string} dictionary The string to look into
		 * @param {string} name The name of the added words list
		 * @type {object} The new dictionaries set
		 */
		this.loadPasswdDictionary = function ( dictionary, name ){
			passwddict[ name ]={};
			// Get an array of all the words
			var words = dictionary.split( " " );
		 
			// And add them as properties to the dictionary lookup
			// This will allow for fast lookups later
			for ( var i = 0; i < words.length; i++ ) {
				passwddict[ name ][ words[i] ] = true;		
			}
			
			passwddictKeys[ name ] = Object.keys(passwddict[ name ]);
			return passwddict;
		}
		
		/**
		 * Unloads a password dictionary in the dictionaries set
		 * @param {string} name The name of the removed words list
		 * @type {object} The new dictionaries set
		 */
		this.unloadPasswdDictionary = function ( name ){
			delete passwddict[name];
			delete passwddictKeys[name];
			return this;
		}
		
		/**
		 * Unloads any password dictionary in the dictionaries set
		 * @type {object} The new dictionaries set
		 */
		this.unloadAllPasswdDictionaries = function (  ){
			passwddict = {};
			passwddictKeys={};
			return passwddict;
		}


		this._findWord = function ( letters, dict ) {
			return findWord( letters, dict );
		}
		/**
		 * Takes in an array of letters and finds the longest possible word at the front of the letters
		 * Courtesy from John Resig @ http://ejohn.org/blog/dictionary-lookups-in-javascript/
		 * @param {string} letters The string to look into
		 * @param {object} dict The dictionary set to use for lookup
		 * @type {object} object containing the longest word and the name of matching dictionary
		 */
		findWord = function ( letters, dict ) {
			
			// Clone the array for manipulation
			var curLetters = letters.slice( 0 ), word = "";
			
			
				
			// Make sure the word is at least 3 letters long	
			while ( curLetters.length > 2 ) {
				// Get a word out of the existing letters
				curLetters=Array.prototype.slice.call(curLetters);
				word = curLetters.join("");
				
				for(var dictName in dict){			
					// And see if it's in the dictionary
					if ( dict[ dictName ][ word ] ) {
						// If it is, return that word
						return {word: word,dictionary: dictName};
					}
				}
		 
				// Otherwise remove another letter from the end
				curLetters.pop();
			}
					
			return {word:"",dictionary:""};
		}

		/**
		 * Generates a password supposed to be easier to remember (recursive)
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} length maximal allowed length
		 * @param {string} password the current password ('cause this is recursive)
		 * @param {string} previous last type done ('cause this is recursive)
		 * @type {string} the generated password
		 */
		easierToRememberPassword = function ( allowedCharset, length, password, previous ){	
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
				if( allowedCharset.indexOf(classifiedCharsets["numeric"]) !== -1 )
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

		/**
		 * Generates a password supposed to be easier to remember (recursive)
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} length maximal allowed length
		 * @param {string} password the current password ('cause this is recursive)
		 * @param {string} previous last type done ('cause this is recursive)
		 * @type {string} the generated password
		 */
		easierToRememberPasswordUsingDictionaries = function ( allowedCharset, length, password, previous ){	
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
				if( allowedCharset.indexOf(classifiedCharsets["numeric"]) !== -1 )
					passwordAddon=easierToRememberPasswordNumber(allowedCharset, addonLength );
				lastItem="number";
			} else{
				if( addonMaxSize > length/2 ) addonMaxSize = length/2;
				// word
				passwordAddon=easierToRememberPasswordWordFromDictionary( allowedCharset, addonMaxSize );
				lastItem="word";
			}
				
			
			// Maybe pick a separator, or an open-close group
			passwordAddon=addSeparatorOrOpenCloseOrNothing( allowedCharset, length, passwordAddon );
				
			// append or prepend to previous password
			var newPassword=appendOrPrepend(password,passwordAddon );
			
			// recursive call, do this amn arbitrary number of times until length is Ok		
			return easierToRememberPasswordUsingDictionaries(allowedCharset, length, newPassword, lastItem )
		}


		/**
		 * Adds a separator character to a string
		 * @param {string} allowedCharset Allowed characters
		 * @param {number} maxLength maximal allowed length
		 * @param {string} currentPassword the string that may be modified
		 * @type {string} the modified string
		 */
		addSeparatorOrOpenCloseOrNothing = function ( allowedCharset, maxLength, currentPassword){
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

		/**
		 * Gets the common part of two distinct strings
		 * @param {string} charset1 One string
		 * @param {string} charset2 Another string
		 * @type {string} the common set of characters as a string
		 */
		commonCharset = function ( charset1, charset2){
			var returnCharset="";
			for ( var i = 0; i < charset1.length; i++ )
			{
				var curChar=charset1.charAt(i);
				if( hasOneFromCharset(charset2, curChar+"")) returnCharset+=curChar;
			}
			return returnCharset;
		}

		/**
		 * Concatenate two strings, by adding something before or after (randomized) the existing.
		 * @param {string} existing the base string
		 * @param {string} addon The part to append to the existing string
		 * @type {string} the generated word
		 */
		appendOrPrepend = function ( existing, addon){
			if ( Math.random() > .5) return addon + existing;  
			return existing+addon;
		}

		/**
		 * Creates a word for a password easier to remember
		 * @param {string} allowedCharset The characters of the custom charset
		 * @param {number} length The maximal Length of characters
		 * @type {string} the generated word
		 */
		easierToRememberPasswordWord = function ( allowedCharset, length ){
			var type = Math.ceil(Math.random()*3);
			
			return easierToRememberPasswordWordRec( allowedCharset, "", length, type, Math.ceil(Math.random()*2) );
			
		}


		/**
		 * Gets a word from dictionary 
		 * @param {string} allowedCharset The characters of the custom charset
		 * @param {number} length The maximal Length of the word
		 * @type {string} the generated word
		 */
		easierToRememberPasswordWordFromDictionary = function ( allowedCharset, length ){		
			var dictWord="";
			if( length > 3) {
				var i=0;
				dictWord=pickAWordFromDictionary(pickADictionary());
				// try 300 times max, if it doesn't work let's assume the dictionary is weak or words 
				//   shorter than x chars
				while ( i<300 ){
					dictWord=pickAWordFromDictionary(pickADictionary());			
					if( dictWord.length <= length  ){
						// randomly create uppercase or first letter capitalized word
						if( Math.random() > (2/3) ){
							dictWord=capitaliseFirstLetter(dictWord);
						}
						if( Math.random() > (7/9) ){
							dictWord=dictWord.toUpperCase();
						}
						return dictWord;
					}
				}
			}
			// by default build a random word
			return easierToRememberPasswordWord(allowedCharset, length);
		}

		/**
		 * Returns the same word with the first character in uppercase
		 * @type {string} string the string to modify
		 * @type {string} the modified string
		 */
		capitaliseFirstLetter = function (string){
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		/**
		 * Returns a name of a loaded  dictionnary (randomly)
		 * @type {string} the dictionary name
		 */
		pickADictionary = function (  ){	
			var dictNames = Object.keys(dict);
			return dictNames[ dictNames.length * Math.random() << 0 ];
			
		}
		
		/**
		 * Returns a word from a loaded  dictionnary (randomly chosen)
		 * @param {string} dictionaryName the dictionary name
		 * @type {string} the selected word
		 */
		pickAWordFromDictionary = function ( dictionaryName ){	
			return dictKeys[dictionaryName][ dictKeys[dictionaryName].length * Math.random() << 0 ];
			
		}

		/**
		 * Creates a word for a password easier to remember, recursive internal function
		 * @param {string} allowedCharset The characters of the custom charset
		 * @param {string} currentWord The word being built
		 * @param {number} length The maximal length remaining
		 * @param {number} type The type of word being generated
		 * @param {number} lastTaken The last type of character taken 
		 * @type {string} the generated word
		 */
		easierToRememberPasswordWordRec = function ( allowedCharset, currentWord, length, type, lastTaken ){
			if( currentWord.length >= length) return currentWord;
			
			var maxLength=length-currentWord.length;
			
			if( type === 3 && currentWord.length > 0){
				type=1;
			}
			
			var addOn="";
			
			// take vowel or consonant depending on last type and append
			var takeFrom=classifiedCharsets["consonant"];	
			var newLastTaken=1;
			if (lastTaken === 1 ){
				takeFrom=classifiedCharsets["vowel"];
				newLastTaken=2;
			}
				
			// Upercase or lowercase ?
			// 3 choices : 3-one uppercase + lowercase / 2-all lowercase / 1-all uppercase	
			var reducedCharset;
			if ( type === 1 ){
				reducedCharset = commonCharset(takeFrom,classifiedCharsets["uppercase"]);			
			}else if (type === 2 ){
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


		/**
		 * Creates a password easier to remember
		 * @param {string} charset The characters of the custom charset
		 * @param {number} length The Length of generated password
		 * @type {string} the generated password
		 */
		easierToRememberPasswordNumber = function ( charset, length ){
			var currNumber="";
			
			// if size is 4, chances for a date 2000's, 1900's ...etc.
			if ( length === 4 ){
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
		pickOneFromCharsetWithPreference = function (allowedCharacters, preferredCharacters){
			var reducedCharset = commonCharset( allowedCharacters, preferredCharacters );
			if( reducedCharset.length === 0 ){
				reducedCharset=allowedCharacters;
			}
			
			return nextChar(reducedCharset);
		}


		/**
		 * @type {map} returns the available charsets
		 */
		this.getAvailableCharsets= function (){
			return availableCharsets;
		}
		

		/**
		 * @type {number} returns the default password size
		 */
		this.getDefaultPasswordSize= function (){
			return passwordSize;
		}
		
		/**
		 * @type {map} returns the enabled charsets
		 */
		this.getEnabledCharsets= function (){
			return enabledCharsets;
		}
		

		/**
		 * Creates a custom charset names "custom" (or replace if already exists) with the provided characters
		 * @param {string} The characters of the custom charset
		 */
		this.setCustomCharset = function ( charset ){
			if( charset.length===0 ){
				delete availableCharsets["custom"];
			}else{
				availableCharsets["custom"]=charset;
			}
		}
		/**
		 * Enables one charset
		 * @param {string} The name of the charset to enable
		 */
		enableCharset = function ( charsetName ){
			console.log("Charset " + charsetName  + " enabled");
			enabledCharsets[charsetName]=availableCharsets[charsetName];
			return this;
		}

		/**
		 * Enables one charset
		 * @param {string} The name of the charset to enable
		 */
		this.enableCharsetByName = function ( charsetName ){
			return enableCharset(charsetName);
		}
		
		/**
		 * Enables all available charset
		 */
		this.enableAllCharsets = function ( ){
			for(var charsetName in availableCharsets){
				 enableCharset( charsetName );
			};
		}

		/**
		 * Enables all default charsets
		 */
		this.enableDefaultCharsets = function (){
			defaultEnabledCharsets.forEach(function(charsetName) {
				enableCharset( charsetName );
			});
			return this;
		}

		/**
		 * Disables one charset
		 * @param {string} The name of the charset to disable
		 */
		this.disableCharsetByName = function ( charsetName ){
			return disableCharset(charsetName);
		}
		
		/**
		 * Disables one charset
		 * @param {string} The name of the charset to disable
		 */
		disableCharset = function ( charsetName ){
			console.log("Charset " + charsetName  + " disabled");
			delete enabledCharsets[charsetName];
			return this;
		}

		/**
		 * Builds a bigger charset from all enabled charsets
		 * @type {string} The complete charset
		 */
		prepareCharset = function ( ){
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
		nextChar = function ( charset ){	
			return charset.charAt(Math.floor(Math.random() * charset.length));
		}

		/**
		 * Checks, and ensures if possible, that the password has at least one character from all enabled charsets
		 * @param {string} password the password to analyze
		 * @type {string} The eventually modified (or not) version of the password
		 */
		checkCompliance = function ( password ){
			var isCompliant=false;
			
			// if length is lower than number of charsets there's no way to solve it
			if (Object.keys(enabledCharsets).length > password.length) return password;
			
			while ( isCompliant === false ){
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
		addOneFromCharset = function ( charset, password ){	
			password = replaceCharAt( password, Math.floor(Math.random() * password.length), nextChar(charset))	;
			return password;
		} 

		/**
		 * Replaces a character at specified index
		 * @param {string} inputStr the set of characters to include a char from
		 * @param {number} index index of the character to replace
		 * @type {string} The  modified version of the string
		 */
		replaceCharAt = function (inputStr, index, newChar) {
			var strArray = inputStr.split("");
			strArray[index] = newChar;
			return strArray.join("");
		}
		/**
		 * Rate a password using the default strategy
		 * @param {string} password the password being evaluated
		  * @type {object} The password rating
		 */
		this.ratePassword = function ( password ){
			ratings["passwordSize"]=ratePasswordSize(password);
			ratings["charsets"]=rateCharsets(password);
			ratings["characterVariety"]=rateCharacterVariety(password);
			ratings["sequences"]=rateSequences(password);
			ratings["keyboard"]=rateKeyboardLayout(password);
			ratings["dictionary"]=rateDictionary(password, dict);
			ratings["commonPasswords"]=rateDictionary(password, passwddict);
			
			coefficients["passwordSize"]=4;
			coefficients["charsets"]=1;
			coefficients["characterVariety"]=1;
			coefficients["sequences"]=1;
			coefficients["keyboard"]=1;
			coefficients["dictionary"]=1;
			coefficients["commonPasswords"]=1;
			
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
					comment: gettext("globalRatingComment")
				}
		}

		
		this._rateDictionary = function (password, dictionary){
			return rateDictionary(password, dictionary);
		}
		
		/**
		 * Provides a subjective rating of a given password according to dictionary lookup
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rateDictionary = function (password, dictionary){
			password=password.toLowerCase();
			var curLetters = password.slice( 0 ), word = "";
			var foundWords=[];
			var maxWord={word:"",dictionary:""};
			
			// Make sure the word is at least 3 letters long	
			while ( curLetters.length > 2 ) {
				curLetters=Array.prototype.slice.call(curLetters);
				baseword = curLetters.join("");
						
				foundword=findWord(baseword,dictionary);		
				if( foundword.word !== "" ){
					foundWords.push(foundword);
					if( foundword.word.length > maxWord.word.length){
						maxWord=foundword;				
					}
				}
				curLetters.shift();
			}
			
			var ratingFactor=maxWord.word.length/password.length;
			
			var allwords=gettext("rd_allwords_l");
			for (var i = 0; i < foundWords.length; i++)
			{
				allwords=allwords+"/"+foundWords[i].word;
			}
			var allwords=allwords+gettext("rd_allwords_r");
			
			// compare size of biggest word found with the password size
			if( ratingFactor > .9 ) return {rating:0.0, comment: gettext("rd_allwords_hazard") + maxWord.dictionary + gettext("rd_allwords_dic") + maxWord.word + allwords};	
			if( ratingFactor > .8 ) return {rating:0.01, comment: gettext("rd_allwords_weak") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .7 ) return {rating:0.15+.3*(.8-ratingFactor), comment: gettext("rd_allwords_q") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .4 ) return {rating:0.15+2*(.7-ratingFactor), comment: gettext("rd_allwords_a") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .2 ) return {rating:0.8, comment: gettext("rd_allwords_g") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			if( ratingFactor  > .1 ) return  {rating:1.0, comment: gettext("rd_allwords_e1") + maxWord.dictionary + gettext("rd_allwords_dic")  + maxWord.word + allwords};	
			return {rating:1.0, comment: gettext("rd_allwords_e2")};	
					
		}
		/**
		 * Provides a subjective rating of a given password according to its size
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		ratePasswordSize = function ( password ){
			var len = password.length;
			
			// lower than 5 is far too low	
			if ( len < 6 ) return {rating:0.0, comment: gettext("rs_wts")+len};		
			if ( len < 10 ) return {rating:0.04*len, comment: gettext("rs_ts")+len};		
			if ( len < 15 ) return {rating:.44+.04*(len-10), comment: gettext("rs_q")+len};
			if ( len < 30 ) return {rating:.65+.01*(len-15), comment: gettext("rs_g")+len};	
			if ( len < 50 ) return {rating:.80+.01*(len-30), comment: gettext("rs_a")+len};
			return {rating:1.0, comment: gettext("rs_i")+len};	
			
			
		}
		/**
		 * Provides a subjective rating of a given password for the amount/size of character sequences inside
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		this._rateSequences = function ( password ){
			return rateSequences(password);
		}
		/**
		 * Provides a subjective rating of a given password for the amount/size of character sequences inside
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		rateSequences = function ( password ){
			
			var sequences=findSequences(password);
			var seqLength = sequences.reduce(function(previousValue, currentValue, index, array){
				return previousValue + currentValue;
			},"").length;		
			var seqStr = sequences.reduce(function(previousValue, currentValue, index, array){
				return previousValue + " / " + currentValue;
			},"");		
			var ratio=seqLength/password.length;
			
			if( ratio <= .1) return {rating:1.0, comment: gettext("rseq_perfect")};
			if( ratio <= .5) return {rating:.9-ratio/2, comment: gettext("rseq_average") + seqStr};
			if( ratio <= .6) return {rating:.64-(ratio-.5), comment: gettext("rseq_impactive") + seqStr};
			if( ratio <= .8) return {rating:.53-((ratio-.6)*2.0), comment: gettext("rseq_toomany") + seqStr};
			if ( ratio === 1.0 ) return {rating:0.0, comment: gettext("rseq_allsequences") + seqStr} ;
			return {rating:0.1, comment: gettext("rseq_toomany") + seqStr};
			
		}
		
		this._rateKeyboardLayout = function ( password ){
			return rateKeyboardLayout(password);
		}
		
		/**
		 * Provides a subjective rating of a given password for the character sequences inside according to keyboard layouts
		 * @param {string} password The set of characters to use
		 * @type {number} The rating, floating point value between 0 and 1
		 */
		rateKeyboardLayout = function ( password ){
			var keyboardSequences={};
			if( !password || password.length===0 ){
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
			
			if ( worstsequence.length === 0) return {rating:1.0, comment: "Perfect : no keyboard sequence"} ;		
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
		this._longestCommonSubstring = function (str1, str2){
			return longestCommonSubstring(str1, str2);
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
		longestCommonSubstring = function (str1, str2){
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
		rateCharsets = function ( password ){
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
			if( charsetCount === 2 ) return {rating:.2, comment: "Not enough types of characters types:" + charsetsStr};
			// 3 types of characters is good enough
			if( charsetCount === 3 ) return {rating:.65, comment: "Average amount of characters types:" + charsetsStr};
			// More than 3 types of characters is pretty good
			if( charsetCount === 4 ) return {rating:.9, comment: "Good amount of characters types:" + charsetsStr};	
			// More than 4 types of characters is perfect
			return {rating:1.0, comment: "Perfect amount of characters types:" + charsetsStr};	
			
			
		}
		/**
		 * Provides a subjective rating of a given password according to the variety of characters
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rateCharacterVariety = function ( password ){	
			var rate=rawRateCharacterVariety( password );
			if (rate.rating >= 1.0 ) return {rating: 1.0, comment: rate.comment}; else return rate;
		}
		/**
		 * Provides a subjective rating of a given password according to the different sets of characters in use
		 * @param {string} the password being evaluated
		 * @type {object} The resulting rating
		 */
		rawRateCharacterVariety = function ( password ){	
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
		this._hasOneFromCharset = function ( charset, password){
			return hasOneFromCharset( charset, password);
		}
		
		/**
		 * Checks if the password has at least one character from provided charset
		 * @param {string} charset the related charset
		 * @param {string} password the password to analyze
		 * @type {boolean} true if the password has at least one character from provided charset, false either
		 */
		hasOneFromCharset = function ( charset, password){
			var hasFromCharset=false;
			for (var i=0;i<password.length;i++) {    
				if( charset.indexOf(password.charAt(i)) !== -1 ) {
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
		this.makePassword = function (){
			return makePasswordWithSize(passwordSize);
		}
		
		/**
		 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
		 * @param {string} password the password to analyze
		 * @type {string[]}
		 */
		this._findSequences=function ( password ){
			return findSequences(password);
		}
		/**
		 * Find all sequences of characters like "ABCDEF" or "123456" in a given password
		 * @param {string} password the password to analyze
		 * @type {string[]}
		 */
		findSequences = function ( password ){
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
				if( lastCode !== -1 ) {
					// do we detect a sequence?
					isSequence=(Math.abs( currCode - lastCode) === 1);
					direction=currCode - lastCode;
					
					// check if sequential status detection status changed
					if( isSequence !== isInSequence){
						if( isSequence === true ){
							currSequence+=lastChar;
							lastDirection=currCode - lastCode;
						}else{
							sequences.push(currSequence);
							currSequence="";
						}				
					}
					
					if( isSequence ){
						// check if direction changed, if yes there are 2 sequences
						if( direction !== lastDirection){
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
			if( currSequence.length !== 0 ){
				sequences.push(currSequence);
			}
			
			return sequences;
		}
		/**
		 * Provides a subjective description of password security
		 * @param {object} rate the password rating
		 * @type {string} The resulting description
		 */
		this.passwordStrengthDescFromRate = function (rate){
			if( rate < .2) return gettext("rateHazardous");
			if( rate < .5) return gettext("rateUnsafe");
			if( rate < .6) return gettext("rateWeak");
			if( rate < .7) return gettext("rateMedium");
			if( rate < .8) return gettext("rateGood");
			if( rate >= .8) return gettext("rateSecure");
			return "N/A";
		}
		/**
		 * Generates a password of a given size
		 * @param {number} passwdSize the size of the requested password
		 * @type {string} The generated password
		 */
		this.makePasswordWithSize = function ( passwdSize ){
			var charset=prepareCharset();
			
			if ( easyPasswordRequested && easyPasswordUsingDictionary) return easierToRememberPasswordUsingDictionaries( charset, passwdSize,"","");
			if ( easyPasswordRequested ) return easierToRememberPassword( charset, passwdSize,"","");
			else return makeAnyPasswordWithSize(charset, passwdSize);
			
		}
		/**
		 * Generates a password of a given size using a given charset
		 * @param {string} charset the allowed set of characters
		 * @param {number} passwdSize the size of the requested password
		 * @type {string} The generated password
		 */
		makeAnyPasswordWithSize = function ( charset, passwdSize ){
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
		
		/**
		 * Initialization 
		 * @type {object} This object
		 */
		
		this.initialize = function(){
			this.enableDefaultCharsets();
			this.loadDictionary(frenchdict,"français");
			this.loadDictionary(englishdict,"english");
			this.loadPasswdDictionary(worstPassswordsdict,"10k worst passwords");
			return this;
		}
		
		return this.initialize();
};

