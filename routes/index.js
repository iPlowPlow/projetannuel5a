module.exports = function(app, models, TokenUtils) {

	require("./user")(app, models, TokenUtils);
	require("./unit")(app, models);
	require("./category")(app, models);
	
	
};
