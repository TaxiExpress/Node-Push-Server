var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
	url: 'http://ec2-54-84-17-105.compute-1.amazonaws.com:8080',
	version: '0.0.1'
});

client.post('/sendTravelPaid', { paid:'true', travelID: '01', device: 'IOS',
pushId:'a1d561ed1a6a037c90603fd2b18c8ce2dc229863091cd4f3dc67a86691edc28c'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid           ' + res.statusCode);
});


