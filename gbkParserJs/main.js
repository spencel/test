function main() {

	var x = new Gbk( { "rawGbkText": gbkFile } );

	console.log( x.locus.name );
	console.log( x.locus.sequenceLength );
	console.log( x.locus.sequenceLengthUnits );
	console.log( x.locus.moleculeType );
	console.log( x.locus.genBankDivision );
	console.log( x.locus.modificationDate );
	console.log( x.definition );
	console.log( x.accession );
	console.log( x.version );
	console.log( x.gi );

}