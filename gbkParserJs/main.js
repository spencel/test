function main() {

	var x = new Gbk( { "rawGbkText": gbkFile } );

	console.log( x )

	x.injectHtml( "body" );

}