$(document).ready(function(){

var myTime = performance.now();
var myColor = "#000000";
var myIterationsCount = 0;
var myAvgIterations = 0;

var myConsole = {
	eleId: "consoleOutput"
}

var myMouse = {
	isMousedown:false,
	object:0,
	offsetX:0,
	offsetY:0,
}

// Commands
var commands = {
	addNumbers: {
		init:function(commandArray) {
			var commandArray_length = commandArray.length;
			var value = Number(commandArray[1]);
			for (var i = 2; i < commandArray_length; i++) {
				value = value + Number(commandArray[i]);
			}

			document.getElementById( myConsole.eleId ).innerHTML = value;
		}
	},
	calculate1:{
		init:function(commandArray) {
			// Reconstruct string then reparse it
			var length = commandArray.length;
			var myString = commandArray[1];
			for (var i = 2; i < length; i++){
				myString = myString + commandArray[i];
			}
			// 2 * ( (6 - 8) * 7 + 3 + 5 )
			// [2, * , (6 - 8) * 7 + 3 + 5]
			// [2, * , 6 - 8, *, 7, +, 3, +, 5]
			// [2, * , 6, -, 8, *, 7, +, 3, +, 5]

			// 2 * ( (6 - 8) * 7 + 3 + 5 )
			// [2, (6 - 8) * 7 + 3 + 5]; [*]
			// [2, 6 - 8, 7, +, 3, +, 5]; [*, *]
			// [2, 6, 8, *, 7, +, 3, +, 5]; [-, *, *]

			// -2 * ( 3 + (6 - 8) * 7 + 5 )
			// 1) 6 - 8 = -2
			// 2) -2 * 7 = -14
			// 3) -14 + 3 = -11
			// 4) -11 + 5 = -6
			// 5) -6 * -2 = -12

			// calculate1 -2 * ( 3 + (6 - 8) * 7 + 5 )
			// [-, 2, *, (, 3, +, (, 6, -, 8, ), *, 7, +, 5, )]
			/*
				*( = (
				)* = )
				-- = +
				+- = -
			*/

			// Put numbers and operators into an array
			var value;
			var output = [];
			var outputLength = 0;
			var myString_length = myString.length;
			var numbers;
			var i = 0;
			var tempString = myString.charAt(i);
			switch (tempString) {//initialize loop
				case "-": 
					if (myString.charAt(i + 1) == "(") {
						tempString = "-(";
						numbers = false;
						i+=2;
					} else {
						tempString = "-"
						numbers = true;
						i++;
					}
				break;
				case "0": case "1": case "2": case "3": case "4":
				case "5": case "6": case "7": case "8": case "9": case ".":
					numbers = true;
				break;
				default:
					numbers = false;
			}
			for ( ; i < myString_length; i++) {
				value = myString.charAt(i)
				switch (value) {
					case "0": case "1": case "2": case "3": case "4": case "5":
					case "6": case "7": case "8": case "9": case ".":
						if (numbers == true) {
							tempString = tempString + value;
						} else {
							numbers = true;
							output.push(tempString);
							tempString = value;
						}						
					break;
					default:
						if (numbers == false) {
							tempString = tempString + value;
						} else {
							numbers = false;
							output.push(tempString);
							tempString = value;
						}	
				}
			}
			console.log(output);
			for (var i = 0; i < output.length; i++){

			}

			document.getElementById(myConsole.eleId).innerHTML = output;
		}
	},
	calculate2:{
		init:function(commandArray) {
			// calculate2 -2 * ( 3 + (6 - 8) * 7 + 5 )

			// Put numbers and operators into an array
			var value;
			var output = [];
			var outputLength = 0;
			var myString_length = myString.length;
			var numbers;
			var numA = "";
			var numB = "";
			var pChar = "";
			var numString = "";
			var buildingNum = false;
			var isOpenBrac = false;
			var isNegNum = false;
			var hasDeciAlready = false;
			var numStarters = "+-.012345689";
			for (var i = 0; i < myString_length; i++){
				pChar = myString.charAt(i);
				if (buildingNum) {
				} else {
					if (numStarters.indexOf(pChar) != -1) {
						numString = pChar;
					} else {
						console.log("not a number");
					}
				}				
			}

			document.getElementById(myConsole.eleId).innerHTML = output;
		}
	},
	divideNumbers: {
		init:function(commandArray) {
			var commandArray_length = commandArray.length;
			var value = Number(commandArray[1]);
			for (var i = 2; i < commandArray_length; i++) {
				value = value / Number(commandArray[i]);
			}

			document.getElementById( myConsole.eleId ).innerHTML = value;
		}
	},
	getModuloAfterDividingNumbers: {
		init:function(commandArray){
			var length = commandArray.length - 1;
			var value = Number(commandArray[1]);
			for (var i = 2; i < length; i++) {
				value = value / Number(commandArray[i]);
			}
			value = value % Number(commandArray[i++])

			document.getElementById( myConsole.eleId ).innerHTML = value;
		}
	},
	multiplyNumbers: {
		init:function(commandArray){
			var commandArray_length = commandArray.length;
			var value = Number(commandArray[1]);
			for (var i = 2; i < commandArray_length; i++) {
				value = value * Number(commandArray[i]);
			}

			document.getElementById( myConsole.eleId ).innerHTML = value;
		}
	},
	scanForModuli: {
		active:false,
		x:0,
		y:0,
		max:0,
		scanIncrement:0,
		upperSensitivity:0,
		lowerSensitivity:0,
		sigfigs:0,
		z:[],
		savedStep:0,
		init:function(commandArray) {
			myIterationsCount = 0;
			myAvgIterations = 0;
			this.active = true;
			this.x = Number(commandArray[1]);
			this.y = Number(commandArray[2]);
			if (Number(commandArray[1]) > Number(commandArray[2])) {
				this.max = Number(commandArray[1]);
			} else {
				this.max = Number(commandArray[2]);
			}
			this.scanIncrement = Number(commandArray[3]);
			this.savedStep = 1;
			this.upperSensitivity = this.scanIncrement/2;
			this.lowerSensitivity = -1*this.upperSensitivity;
			this.sigFigs = -1*(Math.ceil(Math.log10(this.scanIncrement)));
			this.z = [];
		},
		exec:function() {
			var startTime = performance.now();
			var this_x = this.x;
			var this_y = this.y;
			var this_max = this.max;
			var this_scanIncrement = this.scanIncrement;
			var this_upperSensitivity = this.upperSensitivity;
			var this_lowerSensitivity = this.lowerSensitivity;
			var this_sigFigs = this.sigFigs;
			for (var i = this.savedStep; i < this_max; i += this_scanIncrement) {

				if (((this_x%i)-(this_y%i)) < this_upperSensitivity && ((this_x%i)-(this_y%i)) > this_lowerSensitivity) {
					this.z.push(i.toFixed(this_sigFigs));
				}
				if ((performance.now() - startTime) > 16) {
					document.getElementById( myConsole.eleId ).innerHTML = (i/this_y*100).toFixed(1) + "%";
					myIterationsCount++;
					document.getElementById( "iterations" ).innerHTML = (((i - 1)/this_scanIncrement)/myIterationsCount).toFixed(0) + " | avg. iterations"
					this.savedStep = i;
					return;
				}
			}
			var output = this.z[0];
			for (var i = 1; i < this.z.length; i++) {
				output = output + ", " + this.z[i];
			}
			document.getElementById( myConsole.eleId ).innerHTML = output;
			this.active = false;
		}
	},
	subtractNumbers: {
		init:function(commandArray) {
			var commandArray_length = commandArray.length;
			var value = Number(commandArray[1]);
			for (var i = 2; i < commandArray_length; i++) {
				value = value - Number(commandArray[i]);
			}

			document.getElementById( myConsole.eleId ).innerHTML = value;
		}
	}
}

function main() {
	
	window.requestAnimationFrame ( main );

	var startTime = performance.now();

	/* Start Actual Program's Code */

	if (commands.scanForModuli.active == true) {
		commands.scanForModuli.exec();
	}

	if ((startTime - myTime) > 1000) {
		myTime = performance.now();
		if (myColor == "#FFFFFF") {
			myColor = "#000000";
		} else {
			myColor = "#FFFFFF";
		}
		document.getElementById( "loading" ).style.backgroundColor = myColor;
	}

	/* End Actual Program's Code */

	var elapsedTime = performance.now() - startTime;

	/* Analytics and Debug */
	document.getElementById( "elapsedTime" ).innerHTML = elapsedTime.toFixed(3) + " | elapsedTime";
	document.getElementById( "fps" ).innerHTML = (1000/elapsedTime).toFixed(1) + " | fps";	
}

main(performance.now());

// Input: Keyboard
$( document ).on("keydown", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements

	var event_keyCode = event.keyCode;
	switch ( event_keyCode ) {

		// Key: Enter
		case 13:
			// Context: Console
			if ( event.target.id == "consoleInput" ) {

	 			var commandString = event.target.value;
				var commandArray = commandString.split( " " );
				var command = commandArray[0];

				commands[command].init(commandArray);

				/*
				switch ( command ) {
					case "addNumbers": commands.addNumbers.init(commandArray); break;
					case "subtractNumbers": commands.subtractNumbers.init(commandArray); break;
					case "multiplyNumbers": commands.multiplyNumbers.init(commandArray); break;
					case "divideNumbers": commands.divideNumbers.init(commandArray); break;
					case "getModuloAfterDividingNumbers": commands.getModuloAfterDividingNumbers.init(commandArray); break;
					case "scanForModuli": commands.scanForModuli.init(commandArray); break;
					case "calculate1": commands.calculate.init(commandArray); break;
					default: document.getElementById( myConsole.eleId ).innerHTML = "Command doesn't exist.";
				}*/

				event.target.value = ""; // Deletes input text but need to delete extra line break on keyup
			}

		break;
	}
});
$( document ).on("keyup", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements
	var event_keyCode = event.keyCode;
	switch ( event_keyCode ) {
		// Key: Enter
		case 13:
			// Context: Console
			if ( event.target.id == "consoleInput" ) {
				event.target.value = ""; // Deletes extra line break
			}

	}
});

// Input: Mouse
$(document).on("mousedown", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements
	// Analytics/Debug 
	{
	document.getElementById( "mousedown" ).innerHTML = event.pageX + " px | " + event.pageY + " px | mousedown";
	}

	//Actual Code
	var event_target_id = event.target.id;
	switch ( event_target_id ) {
		case "moveConsole":
			myMouse.isMousedown = true;
			myMouse.object = $( "#consoleContainer" );
			myMouse.offsetX = event.pageX - myMouse.object.offset().left;
			myMouse.offsetY = event.pageY - myMouse.object.offset().top;
		break;
	}
});
$(document).on("mousemove", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements

	// Analytics/Debug
	{
	document.getElementById( "mousemove" ).innerHTML = event.pageX + " px | " + event.pageY + " px | mousemove";
	}
	if ( myMouse.isMousedown == true ) {
		myMouse.object.offset({top: event.pageY - myMouse.offsetY, left: event.pageX - myMouse.offsetX});
	}
});
$(document).on("mouseup", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements

	// Analytics/Debug
	{
	document.getElementById( "mouseup" ).innerHTML = event.pageX + " px | " + event.pageY + " px | mouseup";
	}
	myMouse.isMousedown = false;
});


}); // end $(document).ready(function(){
