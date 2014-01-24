

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
	QUnit.close( rateSequences("abcdefksd;cm"), .5,.00001, "Should rate 50% sequences string with 0.5" );
});

test( "ShouldRate10percSequenceWith1", function() {
	QUnit.close( rateSequences("abd;cmbgnhmjliptkrhe"), 1.0, .00001, "Should rate 10% sequences string with 1" );
});

test( "ShouldRate70PercSequence", function() {
	QUnit.close( rateSequences("abcdefg,1."), .1, .00001, "Should rate 70% sequences string with .1" );
});


test( "ShouldFind1FromCharsetA", function() {
	ok( hasOneFromCharset("ABCDEF","AB"), "Should Find A or B in AB" );
});

test( "ShouldFind1FromCharsetA", function() {
	ok( !hasOneFromCharset("CD","AB"), "Should Find no C nor D in AB" );
});

