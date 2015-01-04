var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var url = require("url");

function start(request, response, pool) {
	console.log("Request handler 'start' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain"
	});
	var method = request.method;
	var pathname = url.parse(request.url).pathname;
	pool.getConnection(function(err, conn) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		// Use the connection
		conn.query('SELECT bug_id FROM cert_records', function(err, rows) {

			for(var i = 0; i < rows.length; i++){
				console.log(rows[i]);
			}
			// And done with the connection.
			conn.release();
			// Don't use the connection here, it has been returned to the pool.
		});
	});
	if (method === "POST") {
		var postData = '';
		request.setEncoding("utf8");
		request.on("data", function(dataChunk) {
			postData += dataChunk;
		});
		request.on("end", function() {
			postData = querystring.parse(postData);
		});
		response.write("You've sent: " + method + " request for "
				+ querystring.parse(postData).text);
	} else {
		response.write("You've sent: " + method + " request for " + pathname);
	}
	response.end();
}

exports.start = start;
