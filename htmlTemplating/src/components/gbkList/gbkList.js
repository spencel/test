function getGbkFileList() {

	jQuery.ajax({
		url: phpDir + "/getGbkFileList.php",
		username: "phageteam",
		password: "sdsu2016",
		success: function( gbkFileNames ) {

			var arFilesNames = gbkFileNames.split( "\n" );

			populateGbkFileList( arFilesNames );

		}
	});
	
}

function populateGbkFileList( arFilesNames ) {

	var strHtml = "<ul>";

	for ( var i = 0; i < arFilesNames.length; i++ ) {

		strHtml += "<li><a id=\"e-" + arFilesNames[ i ] + "\">" + arFilesNames[ i ] + "</a></li>";
	}

	strHtml += "</ul>";

	document.getElementById( "gbkList" ).innerHTML =  strHtml;

}

function getGbkFile( event, strAr_event ) {

	console.log( "getGbkFile");

	jQuery.ajax({
		url: phpDir + "/getGbkFile.php",
		username: "phageteam",
		password: "sdsu2016",
		data: { data: strAr_event[1] },
		success: function( data ) {

			var x = new Gbk( { "rawGbkText": data } )
			x.injectHtml( "#gbkDump" );

		}
	});

}

document.onclick = function( event ) {

	Events.current = event;

	console.log( event.target.id )

	strAr_event = event.target.id.split( "-" );

	switch( strAr_event[0] ) {

		case( "e" ): getGbkFile( event, strAr_event ); break;

	}

};