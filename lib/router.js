var url = require("url");
var path = require('path');

function route(handle, request, response, pool) {
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");
	if (typeof handle[pathname] === 'function') {
		handle[pathname](request, response, pool);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {
			"Content-Type" : "text/html"
		});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;