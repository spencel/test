// Gbk Class

// Static (aka Class) Properties
Gbk.nextId = 0;

Gbk.byId = {};

Gbk.quantity = 0;
// End Static Properties

// Constructor
function Gbk( args ) {

	/*
		args[ rawGbkText ]
		add args for other cases later
	*/

	Gbk.byId[ Gbk.nextId ] = this;
	Gbk.quantity++;

	// Instance Properties
	this.id = Gbk.nextId;
	Gbk.nextId++;
	// End Instance Properties

	thisGbk = this;
	var tag;
	var line;

	if ( args.hasOwnProperty( "rawGbkText" ) ) {

		// Split the raw gbk file text into an array of text lines
		var rawGbkText = args[ "rawGbkText" ].split( "\n" );

		// Parse one line at a time
		for ( iLine = 0; iLine < rawGbkText.length; ) {

			line = rawGbkText[ iLine ];

			tag = line.substr( 0, 12 );

			switch ( tag ) {

				case "LOCUS       ": parseLocus(); break;

				case "DEFINITION  ": parseDefinition(); break;

				case "ACCESSION   ": parseAccession(); break;

				case "VERSION     ": parseVersion(); break;

				case "KEYWORDS    ": parseKeywords(); break;

				case "SOURCE      ": parseSource(); break;

				default:

					console.log( "WARNING: Unrecognized Tag (\"" + tag + "\") at line " + (iLine + 1) + "." );

					iLine++;

				break;

			}

		}

		function parseLocus() {

			getAllLines( "            " );

			thisGbk.locus = {};

			line = line.substr( tag.length );

			parseLocusName();

			parseSequenceLength();

			parseMoleculeType();

			parseGenBankDivision();

			parseModificationDate();

			function parseLocusName() {

				line = line.trimLeft();

				thisGbk.locus.name = null;

				var char;
				var name = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( char != " " ) {

						name = name + char;

					} else {

						break;

					}

				}

				if ( name.length > 0 ) {

					thisGbk.locus.name  = name;

				} else {

					console.log( "WARNING: No Locus Name detected." );

				}

				line = line.substr( name.length );

			}

			function parseSequenceLength() {

				line = line.trimLeft();

				thisGbk.locus.sequenceLength = null;

				var char;
				var sequenceLength = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( char != " " ) {

						sequenceLength = sequenceLength + char;

					} else {

						break;

					}

				}

				if ( sequenceLength.length > 0 ) {

					thisGbk.locus.sequenceLength  = sequenceLength;

				} else {

					console.log( "WARNING: No Sequence Length detected." );

				}

				line = line.substr( sequenceLength.length )

				parseSequenceLengthUnits();

				function parseSequenceLengthUnits() {

					line = line.trimLeft();

					thisGbk.locus.sequenceLengthUnits = null;

					var char;
					var sequenceLengthUnits = "";

					for ( iChar = 0; iChar < line.length; iChar++ ) {

						char = line.charAt( iChar )

						if ( char != " " ) {

							sequenceLengthUnits = sequenceLengthUnits + char;

						} else {

							break;

						}

					}

					if ( sequenceLengthUnits.length > 0 ) {

						thisGbk.locus.sequenceLengthUnits  = sequenceLengthUnits;

					} else {

						console.log( "WARNING: No Sequence Length detected." );

					}

					line = line.substr( sequenceLengthUnits.length )

				}

			}

			function parseMoleculeType() {

				line = line.trimLeft();

				var char;
				var moleculeType = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( char != " " ) {

						moleculeType = moleculeType + char;

					} else {

						break;

					}

				}

				if ( moleculeType.length > 0 ) {

					thisGbk.locus.moleculeType  = moleculeType;

				} else {

					console.log( "WARNING: No Molecule Type detected." );

				}

				line = line.substr( moleculeType.length );

			}

			function parseGenBankDivision() {

				line = line.trimLeft();

				var char;
				var genBankDivision = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( char != " " ) {

						genBankDivision = genBankDivision + char;

					} else {

						break;

					}

				}

				if ( genBankDivision.length > 0 ) {

					thisGbk.locus.genBankDivision  = genBankDivision;

				} else {

					console.log( "WARNING: No GenBank Division detected." );

				}

				line = line.substr( genBankDivision.length );

			}

			function parseModificationDate(){

				line = line.trimLeft();

				var char;
				var modificationDate = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( char != " " ) {

						modificationDate = modificationDate + char;

					} else {

						break;

					}

				}

				if ( modificationDate.length > 0 ) {

					thisGbk.locus.modificationDate  = modificationDate;

				} else {

					console.log( "WARNING: No Modification Date detected." );

				}

				line = line.substr( modificationDate.length );

			}

		}

		function parseDefinition() {

			getAllLines( "            " );

			line = line.substr( tag.length );

			thisGbk.definition = null;

			var definition = line;

			thisGbk.definition = definition;

		}

		function parseAccession() {

			getAllLines( "            " );

			line = line.substr( tag.length );

			thisGbk.accession = null;

			var accession = line;

			thisGbk.accession = accession;

		}

		function parseVersion() {

			getAllLines( "            " );

			line = line.substr( tag.length );

			parseAccessionVersion();

			parseGi();

			function parseAccessionVersion() {

				line = line.trimLeft();

				var char;
				var accessionVersion = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( char != " " ) {

						accessionVersion = accessionVersion + char;

					} else {

						break;

					}

				}

				if ( accessionVersion.length > 0 ) {

					thisGbk.version  = accessionVersion;

				} else {

					console.log( "WARNING: No Version detected." );

				}

				line = line.substr( accessionVersion.length );

			}

			function parseGi() {

				line = line.trimLeft();

				thisGbk.gi = null;

				// Check if it's there or in the right format
				if ( line.substr( 0, 3 ) == "GI:" ) {

					line = line.substr( 3 );

				} else {

					console.log( "WARNING: GenInfo Identifier does not exist or is not formatted correctly.");
					return;

				}

				var char;
				var gi = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( char != " " ) {

						gi = gi + char;

					} else {

						break;

					}

				}

				if ( gi.length > 0 ) {

					thisGbk.gi  = gi;

				} else {

					console.log( "WARNING: No GenInfo Identifier detected." );

				}

				line = line.substr( gi.length );

			}

		}

		function parseKeywords() {

			getAllLines( "            " );

			line = line.substr( tag.length );

			thisGbk.keyWords = null;

			if ( line == "." ) {

				return;

			}

			var char;
			var keyWords = "";

			for ( iChar = 0; iChar < line.length; iChar++ ) {

				char = line.charAt( iChar )

				if ( char != " " ) {

					keyWords = keyWords + char;

				} else {

					break;

				}

			}

			if ( keyWords.length > 0 ) {

				thisGbk.keyWords  = keyWords;

			} else {

				console.log( "WARNING: No Keywords detected and \".\" is absent." );

			}

			line = line.substr( keyWords.length );


		}

		// This also increments through lines
		function getAllLines( condition ) {

			for ( iLine++; iLine < rawGbkText.length; ) {

				if ( rawGbkText[ iLine ].substr( 0, condition.length ) == condition ) {

					line = line + " " + rawGbkText[ iLine ].substr( condition.length )

					iLine++;

				} else {

					break;

				}

			}

		}

	}

	return this;

}
// End Constructor

// Methods (organize methods by function and relationship)
Gbk.staticMethodA = function() {

}

Gbk.prototype.instanceMethodA = function() {

}
// End Methods

// End Class