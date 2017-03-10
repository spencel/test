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
function 