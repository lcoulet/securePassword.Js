

test( "ShouldFind3Sequences", function() {
	deepEqual( findSequences("abcdefABCDEF123456"), new Array("abcdef","ABCDEF","123456"), "Should Find 3 Sequences in abcdefABCDEF123456" );
});

test( "ShouldFind2Sequences", function() {
	deepEqual( findSequences("abcdefedcba"), new Array("abcdef","fedcba"), "Should Find 2 Sequences in abcdefedcba" );
});

test( "ShouldFind1Sequence", function() {
	deepEqual( findSequences("abbbbbbbbbbbbbfjl;"), new Array("ab"), "Should Find 2 Sequences in abbbbbbbbbbbbbfjl;" );
});

test( "ShouldFind1FromCharsetA", function() {
	ok( hasOneFromCharset("ABCDEF","AB"), "Should Find A or B in AB" );
});

test( "ShouldFind1FromCharsetA", function() {
	ok( !hasOneFromCharset("CD","AB"), "Should Find no C nor D in AB" );
});

