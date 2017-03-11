// Gbk Class

// Static (aka Class) Properties
Gbk.nextId = 0;

Gbk.byId = {};

Gbk.quantity = 0;
// End Static Properties

// Constructor
function Gbk( args ) {

	this.locus = {
		name: undefined,
		sequenceLength: undefined,
		sequenceLengthUnits: undefined,
		moleculeType: undefined,
		genBankDivision: undefined,
		modificationDate: undefined
	}
	this.definition = undefined;
	this.accession = undefined;
	this.version = undefined;
	this.gi = undefined;
	this.source = {
		source: undefined,
		organism: {
			genus: undefined,
			species: undefined,
			subspecies: undefined,
			lineage: undefined
		}
	};
	this.reference = {};
	this.features = undefined;

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

				case "REFERENCE   ": parseReference(); break;

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

					thisGbk.locus.sequenceLengthUnits = undefined;

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

			thisGbk.definition = undefined;

			var definition = line;

			thisGbk.definition = definition;

		}

		function parseAccession() {

			getAllLines( "            " );

			line = line.substr( tag.length );

			thisGbk.accession = undefined;

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

				thisGbk.gi = undefined;

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

			thisGbk.keyWords = undefined;

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

		function parseSource() {

			getAllLines( "            " );

			line = line.substr( tag.length );

			thisGbk.source = {};

			thisGbk.source.source = undefined;

			var source = line;

			thisGbk.source.source = source;

			// Parse one line at a time
			for ( ; iLine < rawGbkText.length; ) {

				line = rawGbkText[ iLine ];

				if ( line.substr( 0,2 ) != "  " ) {

					return;

				}

				tag = line.substr( 0, 12 );

				switch ( tag ) {

					case "  ORGANISM  ": parseOrganism(); break;

					default:

						console.log( "WARNING: Unrecognized Tag (\"" + tag + "\") at line " + (iLine + 1) + "." );

						iLine++;

					break;

				}

			}
			
			function parseOrganism() {

				getAllLines( "            " );

				line = line.substr( tag.length );

				thisGbk.source.organism = {};

				parseSpecies();

				function parseSpecies() {

					var arLine = line.split( "; " );
					var arLine2 = arLine[ 0 ].split( " " );

					if ( arLine2.length == 2 ) {

						thisGbk.source.organism.species = arLine2[ 0 ];

					} else if ( arLine2.length == 3 ) {

						thisGbk.source.organism.genus = arLine2[ 0 ];
						thisGbk.source.organism.species = arLine2[ 1 ];

					} else if ( arLine2.length == 4 ) {

						thisGbk.source.organism.genus = arLine2[ 0 ];
						thisGbk.source.organism.species = arLine2[ 1 ];
						thisGbk.source.organism.subspecies = arLine2[ 3 ];

					}

					arLine[ 0 ] = arLine2.pop();
					var index = arLine.length - 1;

					if ( arLine[ index ].endsWith( "." ) ) {

						arLine[ index ] = arLine[ index ].substr( 0, arLine[ index ].length - 1)

					}


					arLine[ arLine.length - 1 ] = arLine[ arLine.length - 1 ]

					thisGbk.source.organism.lineage = arLine;

				}

			}

		}

		function parseReference() {

			getAllLines( "            " );

			line = line.substr( tag.length );

			var referenceNumber = parseReferenceNumber();

			parseBases( referenceNumber );
			
			// Parse one line at a time
			for ( ; iLine < rawGbkText.length; ) {

				line = rawGbkText[ iLine ];

				if ( line.substr( 0,2 ) != "  " ) {

					return;

				}

				tag = line.substr( 0, 12 );

				switch ( tag ) {

					case "  AUTHORS   ": parseAuthors( referenceNumber ); break;

					//case "  TITLE     ": parseTitle( referenceNumber ); break;

					//case "  JOURNAL   ": parseJournal( referenceNumber ); break;

					//case "  PUBMED    ": parsePubmed( referenceNumber ); break;

					default:

						console.log( "WARNING: Unrecognized Tag (\"" + tag + "\") at line " + (iLine + 1) + "." );

						iLine++;

					break;

				}

			}

			function parseReferenceNumber() {

				var char;
				var referenceNumber = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( char != " " ) {

						referenceNumber = referenceNumber + char;

					} else {

						break;

					}

				}

				if ( referenceNumber.length > 0 ) {

					thisGbk.reference[ referenceNumber ]  = {};

				} else {

					console.log( "WARNING: No Reference Number detected." );

				}

				line = line.substr( referenceNumber.length );

				return referenceNumber;

			}

			function parseBases( referenceNumber ) {

				line = line.trimLeft();

				var char;
				var fromBase = "";

				for ( iChar = 0; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( "0123456789".includes( char ) ) {

						fromBase = fromBase + char;

					} else if ( fromBase.length > 0 ) {

						break;

					}

				}

				if ( fromBase.length > 0 ) {

					thisGbk.reference[ referenceNumber ].fromBase  = fromBase;

				} else {

					console.log( "WARNING: No Base Reference detected." );

				}

				var toBase = "";

				for ( ; iChar < line.length; iChar++ ) {

					char = line.charAt( iChar )

					if ( "0123456789".includes( char ) ) {

						toBase = toBase + char;

					} else if ( toBase.length > 0 ) {

						break;

					}

				}

				if ( toBase.length > 0 ) {

					thisGbk.reference[ referenceNumber ].toBase  = toBase;

				} else {

					console.log( "WARNING: No Base Reference detected." );

				}

			}

			function parseAuthors( referenceNumber ) {

				getAllLines( "            " );

				line = line.substr( tag.length );

				thisGbk.reference[ referenceNumber ].authors = {};

				var char;
				var authorNumber = 1;
				var lastName = "";
				var firstName = "";
				var middleName = "";
				var middleNames = [];

				for ( iChar = 0; iChar < line.length; iChar++) {


				}

			}

			function parseTitle( referenceNumber ) {

			}

			function parseJournal( referenceNumber ) {

			}

			function parsePubmed( referenceNumber ) {

			}

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