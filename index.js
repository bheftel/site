// web.js - stolen from example page
var express = require("express");
var logfmt = require("logfmt");
var static = require("node-static");

// var app = express();
// app.use(logfmt.requestLogger());
// app.get('/', function(req, res) {
// 	res.send('Hello World!');
// });
var port = Number(process.env.PORT || 5000);
// app.listen(port, function() {
//     console.log("Listening on " + port);
// });
//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server();

require('http').createServer(function (request, response) {
    // request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    // }).resume();
}).listen(port);