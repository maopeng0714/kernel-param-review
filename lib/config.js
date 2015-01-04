var fs = require("fs");

module.exports = function (configPath) {
	var config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
	return config;
};
