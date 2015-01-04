var mysql = require('mysql');

module.exports = function(config) {
	var pool = mysql.createPool({
		connectionLimit : 10,
		host : config.db_host,
		user : config.db_user,
		password : config.db_pass,
		database : config.db_name,
		port : config.db_port
	});
	return pool;
};
