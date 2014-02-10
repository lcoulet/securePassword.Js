

test( "ShouldFind3Sequences", function() {
	deepEqual( findSequences("abcdefABCDEF123456"), new Array("abcdef","ABCDEF","123456"), "Should Find 3 Sequences in abcdefABCDEF123456" );
});

test( "ShouldFind2Sequences", function() {
	deepEqual( findSequences("abcdefedcba"), new Array("abcdef","fedcba"), "Should Find 2 Sequences in abcdefedcba" );
});

test( "ShouldFind1Sequence", function() {
	deepEqual( findSequences("abbbbbbbbbbbbbfjl;"), new Array("ab"), "Should Find 2 Sequences in abbbbbbbbbbbbbfjl;" );
});

test( "ShouldRateAllSequencePoorly", function() {
	QUnit.close( rateSequences("abcdefABCDEF123456"), 0.01, .00001, "Should rate the all sequences string with 0.01" );
});

test( "ShouldRateNoSequenceWith1", function() {
	QUnit.close( rateSequences("a1b2c3d4e5f6A7B8C9D0EaFb1c2d3e4f5g6"), 1.0, .00001, "Should rate no sequences string with 1.0" );
});

test( "ShouldRate50PercSequence", function() {
	QUnit.close( rateSequences("abcdefksd;cm"), .65,.00001, "Should rate 50% sequences string with 0.65" );
});

test( "ShouldRate10percSequenceWith1", function() {
	QUnit.close( rateSequences("abd;cmbgnhmjliptkrhe"), 1.0, .00001, "Should rate 10% sequences string with 1" );
});

test( "ShouldRate70PercSequence", function() {
	QUnit.close( rateSequences("abcdefg,1."), .33, .00001, "Should rate 70% sequences string with .33" );
});

test( "ShouldRate60PercSequence", function() {
	QUnit.close( rateSequences("abcdef,1.s"), .54, .00001, "Should rate 60% sequences string with .54" );
});

test( "ShouldRate58PercSequence", function() {
	QUnit.close( rateSequences("abcdefg1.,1."), .5566, .0001, "Should rate 58% sequences string with .5566" );
});

test( "ShouldFind1FromCharsetA", function() {
	ok( hasOneFromCharset("ABCDEF","AB"), "Should Find A or B in AB" );
});

test( "ShouldFind1FromCharsetA", function() {
	ok( !hasOneFromCharset("CD","AB"), "Should Find no C nor D in AB" );
});

test( "longestCommonSubstringBasicTest", function() {
	deepEqual( longestCommonSubstring("AB","ABCD"), {length: 2,sequence: "AB",offset: 0} , "longestCommonSubstring: Should Find AB in common between AB and ABCD" );
});

test( "longestCommonSubstringNoCommonalityTest", function() {
	deepEqual( longestCommonSubstring("AB","kjkjfsdkjlsjksdjkfjsd"), {length: 0,sequence: "",offset: null} , "longestCommonSubstring: Should not find any common substring" );
});

test( "longestCommonSubstringANotherTest", function() {
	deepEqual( longestCommonSubstring("12qwerty.1235df","qwertyuiop[]asdfghjkl;'#zxcvbnm,./"), {length: 6,sequence: "qwerty",offset: 2} , "longestCommonSubstring: Should Find AB in common between AB and ABCD" );
});

test( "rateKeyboardLayoutZeroTest", function() {
	deepEqual( rateKeyboardLayout(""), 0 , "rateKeyboardLayout: should rate no password " );
});

test( "rateKeyboardLayoutNoCommonalityTest", function() {
	deepEqual( rateKeyboardLayout("1f2s3qpfd"), 1.0 , "rateKeyboardLayout: should rate good password " );
});

test( "rateKeyboardLayoutLowCommonalityQWERTYTest", function() {
	QUnit.close( rateKeyboardLayout("12qwerty.1235df"), .6, .00001 , "rateKeyboardLayout: should rate medium password " );
});

test( "rateKeyboardLayoutLowCommonalityAZERTYTest", function() {
	QUnit.close( rateKeyboardLayout("12azerty.1235df"), .6, .00001 , "rateKeyboardLayout: should rate medium password " );
});


test( "rateKeyboardLayoutLowCommonalityQWERTZTest", function() {
	QUnit.close( rateKeyboardLayout("12ycxvbn.1235df"), .6, .00001 , "rateKeyboardLayout: should rate medium password " );
});


test( "rateKeyboardLayoutHighCommonalityQWERTZTest", function() {
	QUnit.close( rateKeyboardLayout("12ycxvbn.12"), .2272, .0001 , "rateKeyboardLayout: should rate low password " );
});


test( "rateKeyboardLayoutVeryHighCommonalityQWERTZTest", function() {
	QUnit.close( rateKeyboardLayout("1asdfghjkl."), .04545, .00001 , "rateKeyboardLayout: should rate low password " );
});


