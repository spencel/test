jQuery( document ).ready(function() {

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
	handler:function( event ) {
		var commandString = event.target.value;
		var commandArray = commandString.split( " " );
		var command = commandArray[0];

		commands[command].init(commandArray);

		event.target.value = ""; // Deletes input text but need to delete extra line break on keyup
	},
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
	calculate:{
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

			// calculate -2 * ( 3 + (6 - 8) * 7 + 5 )
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
			var tempString = myString.charAt(0);
			switch (tempString) {//initialize loop
				case "0":case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":case ".":
					numbers == true;
				break;
				default:
					numbers = false;
			}
			for (var i = 1; i < myString_length; i++) {
				value = myString.charAt(i)
				switch (value) {
					case "0":case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":case ".":
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
			for (var i = 0; i < output.length; i++){

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
			console.log(this)
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
				if ((performance.now() - startTime) > 32) {
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
	},
	listOrbitals: {
		init:function(commandArray) {

			var ed; // Element Data
			var t = ""; // Electron Configuration

			for ( var i = 0; i < chemistry.elements.length; i++ ) {
				ed = chemistry.elements[i];
				switch (ed[12]){ // 1s
					case 1: t = t + "1s¹";break;
					case 2: t = t + "1s²";break;
				}		
				switch (ed[13]){ // 2s
					case 1: t = t + "2s¹";break;
					case 2: t = t + "2s²";break;
				}
				switch (ed[14]+ed[15]+ed[16]){ // 2p
					case 1: t = t + "2p¹";break;
					case 2: t = t + "2p²";break;
					case 3: t = t + "2p³";break;
					case 4: t = t + "2p⁴";break;
					case 5: t = t + "2p⁵";break;
					case 6: t = t + "2p⁶";break;
				}
				switch (ed[17]){ // 3s
					case 1: t = t + "3s¹";break;
					case 2: t = t + "3s²";break;
				}
				switch (ed[18]+ed[19]+ed[20]){ // 3p
					case 1: t = t + "3p¹";break;
					case 2: t = t + "3p²";break;
					case 3: t = t + "3p³";break;
					case 4: t = t + "3p⁴";break;
					case 5: t = t + "3p⁵";break;
					case 6: t = t + "3p⁶";break;
				}
				switch (ed[21]){ // 4s
					case 1: t = t + "4s¹";break;
					case 2: t = t + "4s²";break;
				}
				switch (ed[22]+ed[23]+ed[24]+ed[25]+ed[26]){ // 3d
					case 1: t = t + "3d¹";break;
					case 2: t = t + "3d²";break;
					case 3: t = t + "3d³";break;
					case 4: t = t + "3d⁴";break;
					case 5: t = t + "3d⁵";break;
					case 6: t = t + "3d⁶";break;
					case 7: t = t + "3d⁷";break;
					case 8: t = t + "3d⁸";break;
					case 9: t = t + "3d⁹";break;
					case 10: t = t + "3d¹⁰";break;
				}
				// 4p 
				switch (ed[27]+ed[28]+ed[29]){ // 4p
					case 1: t = t + "4p¹";break;
					case 2: t = t + "4p²";break;
					case 3: t = t + "4p³";break;
					case 4: t = t + "4p⁴";break;
					case 5: t = t + "4p⁵";break;
					case 6: t = t + "4p⁶";break;
				}
				switch (ed[30]){ // 5s
					case 1: t = t + "5s¹";break;
					case 2: t = t + "5s²";break;
				}
				// 4d
				switch (ed[31]+ed[32]+ed[33]+ed[34]+ed[35]){
					case 1: t = t + "4d¹";break;
					case 2: t = t + "4d²";break;
					case 3: t = t + "4d³";break;
					case 4: t = t + "4d⁴";break;
					case 5: t = t + "4d⁵";break;
					case 6: t = t + "4d⁶";break;
					case 7: t = t + "4d⁷";break;
					case 8: t = t + "4d⁸";break;
					case 9: t = t + "4d⁹";break;
					case 10: t = t + "4d¹⁰";break;
				}
				// 5p
				switch (ed[36]+ed[37]+ed[38]){
					case 1: t = t + "5p¹";break;
					case 2: t = t + "5p²";break;
					case 3: t = t + "5p³";break;
					case 4: t = t + "5p⁴";break;
					case 5: t = t + "5p⁵";break;
					case 6: t = t + "5p⁶";break;
				}
				// 6s
				switch (ed[39]){
					case 1: t = t + "6s¹";break;
					case 2: t = t + "6s²";break;
				}
				// 4f
				switch (ed[40]+ed[41]+ed[42]+ed[43]+ed[44]+ed[45]+ed[46]){
					case 1: t = t + "4f¹";break;
					case 2: t = t + "4f²";break;
					case 3: t = t + "4f³";break;
					case 4: t = t + "4f⁴";break;
					case 5: t = t + "4f⁵";break;
					case 6: t = t + "4f⁶";break;
					case 7: t = t + "4f⁷";break;
					case 8: t = t + "4f⁸";break;
					case 9: t = t + "4f⁹";break;
					case 10: t = t + "4f¹⁰";break;
					case 11: t = t + "4f¹¹";break;
					case 12: t = t + "4f¹²";break;
					case 13: t = t + "4f¹³";break;
					case 14: t = t + "4f¹⁴";break;
				}
				// 5d
				switch (ed[47]+ed[48]+ed[49]+ed[50]+ed[51]){
					case 1: t = t + "5d¹";break;
					case 2: t = t + "5d²";break;
					case 3: t = t + "5d³";break;
					case 4: t = t + "5d⁴";break;
					case 5: t = t + "5d⁵";break;
					case 6: t = t + "5d⁶";break;
					case 7: t = t + "5d⁷";break;
					case 8: t = t + "5d⁸";break;
					case 9: t = t + "5d⁹";break;
					case 10: t = t + "5d¹⁰";break;
				}
				// 6p
				switch (ed[52]+ed[53]+ed[54]){
					case 1: t = t + "6p¹";break;
					case 2: t = t + "6p²";break;
					case 3: t = t + "6p³";break;
					case 4: t = t + "6p⁴";break;
					case 5: t = t + "6p⁵";break;
					case 6: t = t + "6p⁶";break;
				}
				switch (ed[55]){ // 7s
					case 1: t = t + "7s¹";break;
					case 2: t = t + "7s²";break;
				}
				// 5f
				switch (ed[56]+ed[57]+ed[58]+ed[59]+ed[60]+ed[61]+ed[62]){
					case 1: t = t + "5f¹";break;
					case 2: t = t + "5f²";break;
					case 3: t = t + "5f³";break;
					case 4: t = t + "5f⁴";break;
					case 5: t = t + "5f⁵";break;
					case 6: t = t + "5f⁶";break;
					case 7: t = t + "5f⁷";break;
					case 8: t = t + "5f⁸";break;
					case 9: t = t + "5f⁹";break;
					case 10: t = t + "5f¹⁰";break;
					case 11: t = t + "5f¹¹";break;
					case 12: t = t + "5f¹²";break;
					case 13: t = t + "5f¹³";break;
					case 15: t = t + "5f¹⁴";break;
				}
				// 6d
				switch (ed[63]+ed[64]+ed[65]+ed[66]+ed[67]){
					case 1: t = t + "6d¹";break;
					case 2: t = t + "6d²";break;
					case 3: t = t + "6d³";break;
					case 4: t = t + "6d⁴";break;
					case 5: t = t + "6d⁵";break;
					case 6: t = t + "6d⁶";break;
					case 7: t = t + "6d⁷";break;
					case 8: t = t + "6d⁸";break;
					case 9: t = t + "6d⁹";break;
					case 10: t = t + "6d¹⁰";break;
				}
				// 7p
				switch (ed[68]+ed[69]+ed[70]){
					case 1: t = t + "7p¹";break;
					case 2: t = t + "7p²";break;
					case 3: t = t + "7p³";break;
					case 4: t = t + "7p⁴";break;
					case 5: t = t + "7p⁵";break;
					case 6: t = t + "7p⁶";break;
				}
				t = t + "<br>";
			}
			jQuery( "body" ).append( t );
		}
	},
	
	showPeriodicTable: {
		init: function( commandArray ) {
			// Find Period Column
			var periodColName = "Period";
			var periodCol;
			var symbolColName = "Symbol";
			var symbolCol;
			var zColName = "Z";
			var zCol;

			for ( var i = 0; i < chemistry.meta.elements.columnNames.length; i++ ) {
				if ( chemistry.meta.elements.columnNames[i] == periodColName ) {
					periodCol = i;
				}
				if ( chemistry.meta.elements.columnNames[i] == symbolColName ) {
					symbolCol = i;
				}
				if ( chemistry.meta.elements.columnNames[i] == zColName ) {
					zCol = i;
				}
			}

			for ( var i = 0; i < chemistry.elements.length; i++ ) {
				var period = chemistry.elements[i][periodCol];
				var symbol = chemistry.elements[i][symbolCol];
				var z = chemistry.elements[i][zCol];

				var k = "_" + z;
				console.log(k);
				globals.elements.z[k] = i;

				k = "Period" + period;

				if (!(globals.elements.hasOwnProperty(k))){
					globals.elements[k] = [];
				}

				globals.elements[k].push(symbol);
			}

			console.log(globals);

			var cellId = zCol;

			var t = "<table>" +
				"<tr>" +
					"<td id='" + globals.elements.z._1 + "'></td>" +
					"<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>" +
					"<td id='" + globals.elements.z._2 + "'></td>" +
				"</tr>" +
			"</table>";
			console.log(t);
			jQuery( "body" ).append( t );
		}
	},
}

var myTime = performance.now();
var myColor = "#000000";
var myIterationsCount = 0;
var myAvgIterations = 0;
var globals = {
	elements: {
		z: {}
	}
};

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

// Input: Keyboard
jQuery( document ).on("keydown", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements

	var event_keyCode = event.keyCode;
	switch ( event_keyCode ) {

		// Key: Enter
		case 13:
			// Context: Console
			if ( event.target.id == "consoleInput" ) {

				commands.handler( event );

			}

		break;
	}
});

jQuery( document ).on("keyup", function( event ) { // Possibly consider using "window" instead of "document".
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
jQuery(document).on("mousedown", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements
	// Analytics/Debug 
	{
	document.getElementById( "mousedown" ).innerHTML = event.offsetX + " px | " + event.offsetY + " px | mousedown";
	}

	//Actual Code
	var event_target_id = event.target.id;
	switch ( event_target_id ) {
		case "moveConsole":
			myMouse.isMousedown = true;
			myMouse.object = jQuery( "#consoleContainer" );
			myMouse.offsetX = event.pageX - myMouse.object.offset().left;
			myMouse.offsetY = event.pageY - myMouse.object.offset().top;
		break;
	}
});

jQuery(document).on("mousemove", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements

	// Analytics/Debug
	{
	document.getElementById( "mousemove" ).innerHTML = event.offsetX + " px | " + event.offsetY + " px | mousemove";
	}
	if ( myMouse.isMousedown == true ) {
		myMouse.object.offset({top: event.pageY - myMouse.offsetY, left: event.pageX - myMouse.offsetX});
	}
});

jQuery(document).on("mouseup", function( event ) { // Possibly consider using "window" instead of "document".
	event.stopPropagation(); // stops the event from triggering subsequent parent elements

	// Analytics/Debug
	{
	document.getElementById( "mouseup" ).innerHTML = event.offsetX + " px | " + event.offsetY + " px | mouseup";
	}
	myMouse.isMousedown = false;
});

}); // End jQuery( document ).ready()