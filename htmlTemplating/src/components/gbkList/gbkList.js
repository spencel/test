document.onclick = function( event ) {

	Events.current = event;

	console.log( event.target.id )

	strAr_event = event.target.id.split( "-" );

	switch( strAr_event[0] ) {

		case( "e" ): getGbkFile( event, strAr_event ); break;

	}

};

function getGbkFile( event, strAr_event ) {

	console.log( "getGbkFile");

	jQuery.ajax({
		url: "dat/gbk/getGbkFile.php",
		username: "phageteam",
		password: "sdsu2016",
		data: { data: strAr_event[1] },
		success: function( data ) {

			var x = new Gbk( { "rawGbkText": data } )
			x.injectHtml( "#gbkDump" );

		}
	});

}