var util = require("util");
var lt = require("localtunnel");
var http = require('http');

http.createServer(function (req, res) {
	console.log(req.method + " " + req.url)
	req.on("data", function(chunk) {
		console.log("Body: " + chunk)
	});

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('');
}).listen(1337, '0.0.0.0');


var tunnel = lt(1337, {
	subdomain: process.argv[2]
}, function(err, tunnel) {
	if (err) {
		console.log("error starting tunnel: " + err);
		process.exit(1);
	}

	console.log(tunnel.url)
});

process.on("exit", function() {
	tunnel.close();
	console.log("closing tunnel..");
})

process.on("SIGINT", function() {
	tunnel.close();
	process.exit();
})
