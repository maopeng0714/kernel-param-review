var router = require("./lib/router");
var server = require("./lib/server");
var handler = require("./lib/handler");
var config = require("./lib/config");


var configPath = "./conf/config.json";
var myconfig = config(configPath);

var handle = {};
handle["/"] = handler.start;
handle["/start"] = handler.start;

server.start(myconfig, router.route, handle);