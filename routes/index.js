module.exports = function(app, models) {
	require("./user")(app, models);
	require("./unit")(app, models);
	require("./category")(app, models);
	require("./item")(app, models);
	require("./product")(app, models);
};
