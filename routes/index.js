module.exports = function(app, models, TokenUtils) {

	require("./user")(app, models, TokenUtils);
	
};
