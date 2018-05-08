var sequelize = require("./sequelize");

module.exports = sequelize.import("commentProducer", function(sequelize, Datatypes) {
	return sequelize.define("CommentProducer", {
		idCommentProducer : {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
        },
        idProducer : {
			type : Datatypes.INTEGER,
			//unique: true
		},
		idUser : {
			type : Datatypes.INTEGER,
		},
		comment : {
			type : Datatypes.TEXT,
		},
		star : {
			type : Datatypes.INTEGER,
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "commentProducer"
	});
});
