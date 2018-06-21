var ClsCommandLineInterface = {
	show: function() {
	}
}

var ClsMolecule = {
	nextId: 0,
	collection: [],
	dictionary: {},
	factory: function( data ) {
		var id = this.nextId.toString();
		this.nextId++;
		var atomCollection = [];
		for ( var i = 0; i < data.Atom_Table.length; i++) {
			atomCollection.push( ClsChemicalElementAtom.factory( data.Atom_Table[i] ) );
		}
		var bondCollection = [];
		for ( var i = 0; i < data.Bond_Table.length; i++) {
			bondCollection.push( ClsChemicalBond.factory( data.Bond_Table[i], atomCollection ) );
		}
		var instance = {
			id: id,
			atomCollection: atomCollection,
			bondCollection: bondCollection
		};
		this.collection.push( instance );
		this.dictionary[ id ] = instance;
		return instance;
	},
}
var ClsChemicalBond = {
		nextId: 0,
		collection: [],
		dictionary: {},
		factory: function( data, atomCollection ) {
			var id = this.nextId.toString();
			this.nextId++;
			var type = data[ 0 ];
			var atom1 = atomCollection[ data[ 1 ] ];
			var atom2 = atomCollection[ data[ 2 ] ];
			var instance = {
				id: id,
				type: type,
				atom1: atom1,
				atom2: atom2,
			};
			atom1.bondCollection.push( instance );
			atom2.bondCollection.push( instance );
			this.collection.push( instance );
			this.dictionary[ id ] = instance;
			return instance;
		}
	}
var ClsChemicalElementAtom = {
		nextId: 0,
		collection: [],
		dictionary: {},
		factory: function( data ) {
			var id = this.nextId.toString();
			this.nextId++;
			var symbol = data[0];
			var instance = {
				id: id,
				symbol: symbol,
				bondCollection: []
			};
			this.collection.push( instance );
			this.dictionary[ id ] = instance;
			return instance;
		}
	}