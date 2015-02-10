var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
	url: 'http://127.6.39.129:8080',
	version: '0.0.1'
});


client.post('/push', { origin: 'world',  startpoint:'Pues que bien', travelID: 'android',valuation:'Pues que bien', device: 'IOS', phone: '666666666',
pushId0:'a1d561ed1a6a037c90603fd2b18c8ce2dc229863091cd4f3dc67a86691edc28c'
}, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi          ' + res.statusCode);
});
