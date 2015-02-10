var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
	url: process.env.OPENSHIFT_NODEJS_IP && ':' && parseInt(process.env.OPENSHIFT_NODEJS_PORT),
	version: '0.0.1'
});

client.post('/push', { origin: 'world',  startpoint:'Pues que bien', travelID: 'android',valuation:'Pues que bien', device: 'ANDROID', phone: '666666666',
pushId:'APA91bHdfAsMRF1C3YXJhv0AGOSUFN8tr66zue3J6HdVtUlcZYk9OAoix2ZNzHuIKZ9khVxKvxRR25OTwnFKu9WlACi8IvnPaD4qfts8Jjih4259AoR0u52HdaMLhkBq4NCpDcOZl5a2RJYAuQaFs9Gl8FwTtrodo2jdSdoVItbYaIixV2cfKXI'
}, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /push          ' + res.statusCode);
});
