/*NameSpace NameSpaceA*///-----------------------------------------------

var NameSpaceA = {

/*Class ClassA*///-------------------------------------------------------

ClassA: {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new NameSpaceA_ClassA(this);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
},
}//--------------------------------------------------------End NameSpaceA

/*Class Constructors & Public instance Methods*///-----------------------

/*Class ClassA*///-------------------------------------------------------

//Constructor
function NameSpaceA_ClassA(rThis){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
}
/*Public instance Methods*/
NameSpaceA_ClassA.prototype.insMet = function(){};


/*NameSpace SlPhys*///---------------------------------------------------

var SlPhys = {

/*Class Render*///-------------------------------------------------------

Render: {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances
},

/*Class Body*///---------------------------------------------------------

Body: {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(rMass, rShape){
		/*Add New Instance to Hashtable & Call Constructor*/
		this.ins[this.nextId] = new SlPhys_Body(this, rMass, rShape);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.Shape.deleteAll();
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},


	/*Subclass Shape*///-----------------------------------------------------
	
	Shape: {

		/*Public Static Variables*/
		/*Factory*/
		createNew: function(){
			/*Call Subclass Factory*/
			return this.Circle.createNew();
		},
		/*Public Static Methods*/
		deleteAll: function(){
			this.Circle.deleteAll();
		},
		renderAll: function(){
			jQuery.map(this.Circle.ins, function(iCircle){
				console.log(iCircle.coordinates.getX());
				console.log(iCircle.coordinates.getY());
				console.log(iCircle.coordinates.getZ());
			});
		},

		/*Subclass Circle*///----------------------------------------------------
		
		Circle: {

			/*Public Static Variables*/
			nextId: 0, //holds next id
			ins: {},   //class instnace id as key, class instance as value
			count: 0,  //current total number of class instances

			/*Factory*/
			createNew: function(rCoordinates, rRadius){
				var id = this.nextId;
				/*Add New Instance to Hashtable & Call Constructor*/
				this.ins[id] = new SlPhys_Body_Shape_Circle(this, rCoordinates, rRadius);

				/*Update Static Variables*/
				this.nextId++;
				this.count++;

				/*Inject HTML*/
				var html = '<div id="circle-'+ id +'" class="circle uiDraggable"></div>';
				jQuery('body').append(html);

				return this.ins[id];
			},
			/*Public Static Methods*/
			deleteAll: function(){
				jQuery.map(this.ins, function(iCircle){
					console.log(iCircle.coordinates);
					iCircle.coordinates.deleteSelf();
				});
				this.ins = {};
				this.count = 0;
			},
			deleteIns: function(rId){
				delete  this.ins[rId];
				this.count--;
			},
		},

		/*Subclass Square*///----------------------------------------------------
		
		Square: {

			/*Public Static Variables*/
			nextId: 0, //holds next id
			ins: {},   //class instnace id as key, class instance as value
			count: 0,  //current total number of class instances

			/*Factory*/
			createNew: function(rCoordinates, rWidth, rPerimeter, rArea){
				var id = this.nextId;
				/*Add New Instance to Hashtable & Call Constructor*/
				this.ins[id] = new SlPhys_Body_Shape_Square(this, rCoordinates, rWidth, rPerimeter, rArea);

				/*Update Static Variables*/
				this.nextId++;
				this.count++;

				/*Inject HTML*/
				var html = '<div id="square-'+ id +'" class="square uiDraggable"></div>';
				jQuery('body').append(html);

				return this.ins[id];
			},
			/*Public Static Methods*/
			deleteAll: function(){
				jQuery.map(this.ins, function(iSquare){
					console.log(iSquare.coordinates);
					iSquare.coordinates.deleteSelf();
				});
				this.ins = {};
				this.count = 0;
			},
			deleteIns: function(rId){
				delete  this.ins[rId];
				this.count--;
			},
		},
	},
},

/*Class Force*///--------------------------------------------------------

Force: {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(rValue){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new SlPhys_Force(this, rValue);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
},

/*Class Coordinates*///--------------------------------------------------

Coordinates: {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(rCoordinates){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new SlPhys_Coordinates(this, rCoordinates);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
},

/*Class Vector*///-------------------------------------------------------

Vector: {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(rDimensions){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new SlPhys_Vector(this, rDimensions);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
},

/*Class Dimension*///----------------------------------------------------

Dimension: {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new SlPhys_Dimension(this);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
},
}//------------------------------------------------------------End SlPhys

/**********************************************************************/

SlPhys.Device = {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new SlPhys_Device(this);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
}
//Constructor         (     )
function SlPhys_Device(rThis){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 }
/*Public instance Methods*/
//SlPhys_Device.prototype.myMethod = function(){};
	
/**********************************************************************/

SlPhys.Device.Pump = {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(){
		var id = this.nextId;
		/*Add New instance to Hashtable*/
		this.ins[id] = new SlPhys_Device_Pump(this);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[id];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
}
//Constructor         (     )
function SlPhys_Device_Pump(rThis){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 }
/*Public instance Methods*/
//SlPhys_Device_Pump.prototype.myMethod = function(){};
	
/**********************************************************************/

SlPhys.Device.Motor = {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new SlPhys_Device_Motor(this);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
}
//Constructor         (     )
function SlPhys_Device_Motor(rThis){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 }
/*Public instance Methods*/
//SlPhys_Device_Motor.prototype.myMethod = function(){};

/**********************************************************************/

SlPhys.Structure = {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new SlPhys_Structure(this);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
}
//Constructor         (     )
function SlPhys_Structure(rThis){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 }
/*Public instance Methods*/
//SlPhys_Structure.prototype.myMethod = function(){};

/**********************************************************************/

SlPhys.Structure.PumpStation = {

	/*Public Static Variables*/
	nextId: 0, //holds next id
	ins: {},   //class instnace id as key, class instance as value
	count: 0,  //current total number of class instances

	/*Factory*/
	createNew: function(rAddress, rFieldBookPage, rThomasBrothersPage){
		/*Add New instance to Hashtable*/
		this.ins[this.nextId] = new SlPhys_Structure_PumpStation(this, rAddress, rFieldBookPage, rThomasBrothersPage);

		/*Update Static Variables*/
		this.nextId++;
		this.count++;

		return this.ins[this.nextId - 1];
	},
	/*Public Static Methods*/
	deleteAll: function(){
		this.ins = {};
		this.count = 0;
	},
	deleteIns: function(rId){
		delete  this.ins[rId];
		this.count--;
	},
}
//Constructor         (     )
function SlPhys_Structure_PumpStation(rThis, rAddress, rFieldBookPage, rThomasBrothersPage){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 	this.address = rAddress;
 	this.fieldBookPage = rFieldBookPage;
 	this.thomasBrothersPage = rThomasBrothersPage;
 }
/*Public instance Methods*/
//SlPhys_Structure_PumpStation.prototype.myMethod = function(){};

/**********************************************************************/

/*Class Constructors & Public instance Methods*///-----------------------

/*Class Body*///---------------------------------------------------------

//Constructor       (     ,Number, Shape )
function SlPhys_Body(rThis, rMass, rShape){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 	if (rMass===undefined){this.mass = 1;}
 	else{this.mass = rMass;}
 	if (rShape===undefined){this.shape = thisClass.Shape.createNew();}
 	else{this.shape = rShape;}
 }
/*Public instance Methods*/

/*Class Body.Shape.Circle*///-------------------------------------------------

//Constructor                    (     , Coordinates , Number   , Number        , Number)
function SlPhys_Body_Shape_Circle(rThis, rCoordinates, rDiameter, rCircumference, rArea ){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 	if (rCoordinates===undefined){this.coordinates = SlPhys.Coordinates.createNew();}
 	else{this.coordinates = rCoordinates;}
 	if (rRadius===undefined){this.radius = 1;}
 	else{this.radius = rRadius;}
}
/*Public instance Methods*/
SlPhys_Body_Shape_Circle.prototype.calcDiameter = function(){return 2*this.radius;};
SlPhys_Body_Shape_Circle.prototype.calcArea = function(){return Math.PI*this.radius*this.radius;};
SlPhys_Body_Shape_Circle.prototype.calcCircumference = function(){return 2*Math.PI*this.radius;};

/*Class Body.Shape.Square*///-------------------------------------------------

//Constructor                    (     , Coordinates , Number, Number    , Number)
function SlPhys_Body_Shape_Square(rThis, rCoordinates, rWidth, rPerimeter, rArea ){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 	if (rCoordinates!==undefined){this.coordinates = rCoordinates;}
 	else{this.coordinates = SlPhys.Coordinates.createNew();}
 	this.width = rWidth;
 	this.perimeter = rPerimeter;
 	this.area = rArea;
}
/*Public instance Methods*/
SlPhys_Body_Shape_Square.prototype.calcWidth = function(){
	if(this.width!==undefined){return this.width;}
	else if(this.perimeter!==undefined){return this.perimeter/4;}
	else{return Math.sqrt(this.area);}
};
SlPhys_Body_Shape_Square.prototype.calcPerimeter = function(){
	if(this.width!==undefined){return 4*this.width;}
	else if(this.perimeter!==undefined){return this.perimeter;}
	else{return 4*Math.sqrt(this.area);}
};
SlPhys_Body_Shape_Square.prototype.calcArea = function(){
	if(this.width!==undefined){return this.width*this.width;}
	else if(this.perimeter!==undefined){return Math.pow(this.perimeter/4,2);}
	else{return this.area;}
};

/*Class Coordinates*///--------------------------------------------------

//Constructor			   (     , Array(3)    )
function SlPhys_Coordinates(rThis, rCoordinates){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 	if (rCoordinates===undefined){this.coordinates = [0,0,0];}
 	else{this.coordinates = rCoordinates;}
}
/*Public instance Methods*/
SlPhys_Coordinates.prototype.deleteSelf = function(){SlPhys.Coordinates.deleteIns(this.id);};
SlPhys_Coordinates.prototype.getX = function(){return this.coordinates[0];};
SlPhys_Coordinates.prototype.getY = function(){return this.coordinates[1];};
SlPhys_Coordinates.prototype.getZ = function(){return this.coordinates[2];};

/*Class Force*///--------------------------------------------------------

//Constructor        (     , Vector )
function SlPhys_Force(rThis, rVector){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 	this.vector = rVector;
}
/*Public instance Methods*/

/*Class Vector*///-------------------------------------------------------

//Constructor		  (     , Array(3)   )
function SlPhys_Vector(rThis, rDimensions){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.dimensions = rDimensions;
}
/*Public instance Methods*/
SlPhys_Vector.prototype.getX = function(){return this.dimensions[0];};
SlPhys_Vector.prototype.getY = function(){return this.dimensions[1];};
SlPhys_Vector.prototype.getZ = function(){return this.dimensions[2];};

/*Class Dimension*///----------------------------------------------------

//Constructor
function SlPhys_Dimension(rThis, rName){
	var thisClass = rThis; //Parent object is passed to the constructor

 	/*Public instance Variables*/
 	this.id = thisClass.nextId;
 	this.name = rName;
}
/*Public instance Methods*/