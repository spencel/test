var SDocument = {
	categories: [
		"word", 	// 0
		"title",	// 1
		"paragraph"	// 2
	],
	referenceList: {

	},
	Word: {
		selected: {}
	},
	collection: [],
	editing: [],
	newOld1: function( paWords ) {
		var insText = {
			words: [],
			dictionary: {},
			sections: {}
		};
		var paWords_length = paWords.length;
		var word = "";
		var c = "";
		for ( var i = 0; i < paWords_length; i++ ) {
			c = paWords.charAt(i);
			switch ( c ) {
				case " ":
					if ( word.length > 0 ) {
						insSDocument.words.push( word );
						word = "";
					}
					break;
				default:
					word = word + c;
			}
		}
		if ( word.length > 0 ) { // add last word
			insSDocument.words.push( word );
			word = "";
		}
		SDocument.collection.push( insText );
		return SDocument.collection[ SDocument.collection.length - 1 ];
	},
	constructor: function( args ) {
		var instance = {
			words: [],
			dictionary: {},
			sections: args[2]
		};
		SDocument.collection.push( instance );
		return SDocument.collection[ SDocument.collection.length - 1 ];
	},
	new: function() {
		var newSDocument = SDocument.constructor( [[], {}, {"section-0": "Title"}] );
		var strHtml = 
			"<div id='sow-0' class='sow'>"
				+ "<div id='section-0'>"
					+ "<div id='" + SDocument.categories[1] + "-0' class='title'>SOW Title</div>"
				+ "</div>"
			+ "</div>";
		jQuery( "body" ).append( strHtml );
	},
	newParagraph: function() {

	},
	finishEditing: function() {

	}
	toHtml: function( index ) {
		var category = SDocument.categories[0];
		var textArray = SDocument.collection[ index ].words;
		var limit = textArray.length - 1;
		var strHtml = "<div>";
		for ( var i = 0; i < limit; i++ ) {
			strHtml += "<div id='" + category + "-" + i + "' class='" + category + "'>" + textArray[ i ] + "</div> ";
		}
		strHtml += "<div id='" + category + "-" + i + "'class='" + category + "'>" + textArray[ i ] + "</div></div>";
		jQuery( "body" ).append( strHtml );
	},
	activateEventHandlers: function () {
		jQuery( document ).on( "click", function( event ) {
			var event_target_id = event.target.id;
			var jQuery_target;
			if ( event_target_id.length > 0 ) {
				jQuery_target = jQuery( "#" + event_target_id );
			}
			var arEvent_target_id = event_target_id.split( "-" );
			var category = arEvent_target_id[0];
			event.stopPropagation(); // stops the event from triggering subsequent parent elements
			switch ( category ) {
				// category = title
				case SDocument.categories[1]:
					if ( jQuery_target.hasClass( "editing" ) ) {

					} else {
						jQuery_target.addClass( "editing" );
						jQuery_target.html("<textarea id='" + event_target_id + "'>" + jQuery_target.html() + "</textarea>");
					}
				break;
				// category = word
				case SDocument.categories[0]:
					if ( jQuery_target.hasClass( "clicked" ) ) {
						delete SDocument.Word.selected[ event_target_id ];
						jQuery_target.removeClass( "clicked" );
					} else {
						SDocument.Word.selected[ event_target_id ] = 1;
						jQuery_target.addClass( "clicked" );
					}
				break;
				case "newParagraph":
					jQuery( "#buttonRow" ).remove();
					var appendToId = event_target_id.slice(13);
					jQuery( "#" + appendToId ).after("<div id='" + SDocument.categories[2] + "-0' class='" + SDocument.categories[2] + " editing'><textarea></textarea></div>");
				break;
			}
		});
		jQuery( document ).on( "keypress", function( event ) {
			var event_target_id = event.target.id;
			var jQuery_target;
			if ( event_target_id.length > 0 ) {
				jQuery_target = jQuery( "#" + event_target_id );
			}
			var arEvent_target_id = event_target_id.split( "-" );
			var category = arEvent_target_id[0];
			event.stopPropagation(); // stops the event from triggering subsequent parent elements
			switch ( event.keyCode ) {
				// Enter
				case 13:
					switch ( category ) {
						// category = title
						case SDocument.categories[1]:
							jQuery("div#" + event_target_id).html(event.target.value).removeClass( "editing" );
						break;
					}
				break;
			}
		});
		jQuery( document ).on( "mouseover", function( event ) {
			var event_target_id = event.target.id;
			var jQuery_target;
			if ( event_target_id.length > 0 ) {
				jQuery_target = jQuery( "#" + event_target_id );
			}
			var arEvent_target_id = event_target_id.split( "-" );
			var category = arEvent_target_id[0];
			//event.stopPropagation(); // stops the event from triggering subsequent parent elements
			switch ( category ) {
				// category = title
				case SDocument.categories[1]:
				// category = paragraph
				case SDocument.categories[2]:
					jQuery( "#buttonRow" ).remove(); // remove all button rows so that they don't accumulate from repeated mouseovers
					strHtml = "<div id='buttonRow'><div id='newParagraph-" + event_target_id + "' class='button'>+p</div></div>";
					jQuery( "#" + event_target_id ).after( strHtml );
				break;	
			}
		});

	}
}

