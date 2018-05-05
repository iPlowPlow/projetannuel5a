var sequelize = require("./sequelize");

module.exports = sequelize.import("Item", function(sequelize, Datatypes) {
	return sequelize.define("Item", {
		id : {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		price : {
			type : Datatypes.FLOAT
		},
		location : {
			type : Datatypes.STRING
		},
		quantity : {
			type : Datatypes.FLOAT
		},
		name : {
			type : Datatypes.STRING
		},
		description : {
			type : Datatypes.STRING
		},
		photoURL : {
			type : Datatypes.STRING
		},
		//kg, unité, litres, etc
		unitId : {
			type : Datatypes.INTEGER
		},
		idProduit : {
			type : Datatypes.INTEGER
		},
		idUser : {
			type : Datatypes.INTEGER
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "Item"
	});
});