function main() {

	MyGame = {};
	MyGame.tickLength = 500; //This sets your simulation to run at 50 Hz (20 ms)
	MyGame.lastTick = performance.now();
	MyGame.nextTick = MyGame.lastTick + MyGame.tickLength;

	mainLoop( ); // Start the cycle

	function mainLoop( tFrame ) {

	  document.getElementById( "tFrame" ).innerHTML = Math.floor( tFrame );

	  if ( tFrame >= MyGame.nextTick ) {

	    MyGame.nextTick += MyGame.tickLength;

	    document.getElementById( "delta" ).innerHTML = Math.floor( performance.now() - tFrame );

	    document.getElementById( "fps" ).innerHTML = Math.floor( 1 / ( performance.now() - tFrame ) * 1000 );

	  }

	  window.requestAnimationFrame( mainLoop );
  
  } 

}