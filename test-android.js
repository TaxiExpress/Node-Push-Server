var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
	url: 'http://ec2-54-208-174-101.compute-1.amazonaws.com:8080',
	version: '0.0.1'
});

client.get('/logs', function (err, req, res, obj) {
	assert.ifError(err);
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  GET:  /logs                     ' + res.statusCode);
});


client.post('/sendClosestTaxi', { origin: 'world',  startpoint:'Pues que bien', travelID: 'android',valuation:'Pues que bien', device: 'ANDROID', phone: '666666666',
pushId0:'APA91bHdfAsMRF1C3YXJhv0AGOSUFN8tr66zue3J6HdVtUlcZYk9OAoix2ZNzHuIKZ9khVxKvxRR25OTwnFKu9WlACi8IvnPaD4qfts8Jjih4259AoR0u52HdaMLhkBq4NCpDcOZl5a2RJYAuQaFs9Gl8FwTtrodo2jdSdoVItbYaIixV2cfKXI',
pushId1:'',
pushId2:'',
pushId3:'',
pushId4:''

 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi          ' + res.statusCode);
});


client.post('/sendSelectedTaxi', { origin: 'world',  startpoint:'Pues que bien', travelID: 'android',valuation:'Pues que bien', device: 'ANDROID', phone: '666666666',
pushId:'APA91bHdfAsMRF1C3YXJhv0AGOSUFN8tr66zue3J6HdVtUlcZYk9OAoix2ZNzHuIKZ9khVxKvxRR25OTwnFKu9WlACi8IvnPaD4qfts8Jjih4259AoR0u52HdaMLhkBq4NCpDcOZl5a2RJYAuQaFs9Gl8FwTtrodo2jdSdoVItbYaIixV2cfKXI',
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi         ' + res.statusCode);
});



client.post('/sendAcceptTravel', { latitude: '2125',  longitude:'4556', travelID: '01', device: 'ANDROID',
pushId:'APA91bHdfAsMRF1C3YXJhv0AGOSUFN8tr66zue3J6HdVtUlcZYk9OAoix2ZNzHuIKZ9khVxKvxRR25OTwnFKu9WlACi8IvnPaD4qfts8Jjih4259AoR0u52HdaMLhkBq4NCpDcOZl5a2RJYAuQaFs9Gl8FwTtrodo2jdSdoVItbYaIixV2cfKXI',
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel         ' + res.statusCode);
});


client.post('/sendTravelCompleted', { cost:'25', travelID: '01', device: 'ANDROID', appPayment:'false',
pushId:'APA91bHdfAsMRF1C3YXJhv0AGOSUFN8tr66zue3J6HdVtUlcZYk9OAoix2ZNzHuIKZ9khVxKvxRR25OTwnFKu9WlACi8IvnPaD4qfts8Jjih4259AoR0u52HdaMLhkBq4NCpDcOZl5a2RJYAuQaFs9Gl8FwTtrodo2jdSdoVItbYaIixV2cfKXI',
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted      ' + res.statusCode);
});

client.post('/sendTravelPaid', { paid:'true', travelID: '01', device: 'ANDROID',
pushId:'APA91bHdfAsMRF1C3YXJhv0AGOSUFN8tr66zue3J6HdVtUlcZYk9OAoix2ZNzHuIKZ9khVxKvxRR25OTwnFKu9WlACi8IvnPaD4qfts8Jjih4259AoR0u52HdaMLhkBq4NCpDcOZl5a2RJYAuQaFs9Gl8FwTtrodo2jdSdoVItbYaIixV2cfKXI',
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid           ' + res.statusCode);
});

