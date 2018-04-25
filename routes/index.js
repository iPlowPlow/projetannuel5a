module.exports = function(app, models) {
	require("./user")(app, models);
	require("./unit")(app, models);
	require("./category")(app, models);
};
