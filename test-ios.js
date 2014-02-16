var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
	url: 'http://ec2-54-84-17-105.compute-1.amazonaws.com:8080',
	version: '0.0.1'
});

client.post('/sendClosestTaxi', { origin: 'world',  startpoint:'Pues que bien', travelID: 'android',valuation:'Pues que bien', device: 'IOS', phone: '666666666',
pushId0:'a1d561ed1a6a037c90603fd2b18c8ce2dc229863091cd4f3dc67a86691edc28c',
pushId1:'',
pushId2:'',
pushId3:'',
pushId4:''
}, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi          ' + res.statusCode);
});

client.post('/sendSelectedTaxi', { origin: 'world',  startpoint:'Pues que bien', travelID: 'android',valuation:'Pues que bien', device: 'IOS', phone: '666666666',
pushId:'a1d561ed1a6a037c90603fd2b18c8ce2dc229863091cd4f3dc67a86691edc28c'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi         ' + res.statusCode);
});

client.post('/sendAcceptTravel', { latitude: '2125',  longitude:'4556', travelID: '01', device: 'IOS',
pushId:'a1d561ed1a6a037c90603fd2b18c8ce2dc229863091cd4f3dc67a86691edc28c'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel         ' + res.statusCode);
});

client.post('/sendTravelCompleted', { cost:'25', travelID: '01', device: 'IOS', appPayment:'false',
pushId:'a1d561ed1a6a037c90603fd2b18c8ce2dc229863091cd4f3dc67a86691edc28c'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted      ' + res.statusCode);
});

client.post('/sendTravelPaid', { paid:'true', travelID: '01', device: 'IOS',
pushId:'a1d561ed1a6a037c90603fd2b18c8ce2dc229863091cd4f3dc67a86691edc28c'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid           ' + res.statusCode);
});

client.post('/sendTravelCanceled', {travelID: '01', device: 'IOS',
pushId:'a1d561ed1a6a037c90603fd2b18c8ce2dc229863091cd4f3dc67a86691edc28c'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCanceled       ' + res.statusCode);
});
