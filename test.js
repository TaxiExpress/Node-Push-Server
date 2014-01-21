var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
	url: 'http://localhost:8080',
	version: '0.0.1'
});

client.get('/logs', function (err, req, res, obj) {
	assert.ifError(err);
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  GET:  /logs ' + res.statusCode);
});


client.post('/sendClosestTaxi', { origin: 'world',  startpoint:'Pues que bien', travelID: 'android',valuation:'Pues que bien', device: 'android',
pushId0:'APA91bHJRkpSjXvlFA7L94ybyalAeW0BxE0Z1K4g99onHvXLIFgptSJDhBIMXckY9HBzaBpEWo4Se9zUCd2KjzWUHCJ5TLac-qF-Hu8ozi7Uoe14ZFRg2_c82xmL4ZXgMfuhec4UUd-eu_SkYsMPRt2bqNZ0K5Uzgpwd2en9454w8-f3c7pyEK0',
pushId1:'',
pushId2:'',
pushId3:'',
pushId4:''

 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi ' + res.statusCode);
});

client.post('/sendAcceptTravel', { latitude: '2125',  longitude:'4556', travelID: '01', device: 'android',
pushId0:'APA91bHJRkpSjXvlFA7L94ybyalAeW0BxE0Z1K4g99onHvXLIFgptSJDhBIMXckY9HBzaBpEWo4Se9zUCd2KjzWUHCJ5TLac-qF-Hu8ozi7Uoe14ZFRg2_c82xmL4ZXgMfuhec4UUd-eu_SkYsMPRt2bqNZ0K5Uzgpwd2en9454w8-f3c7pyEK0'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel ' + res.statusCode);
});

client.post('/sendTravelCompleted', { cost:'25', travelID: '01', device: 'android',
pushId0:'APA91bHJRkpSjXvlFA7L94ybyalAeW0BxE0Z1K4g99onHvXLIFgptSJDhBIMXckY9HBzaBpEWo4Se9zUCd2KjzWUHCJ5TLac-qF-Hu8ozi7Uoe14ZFRg2_c82xmL4ZXgMfuhec4UUd-eu_SkYsMPRt2bqNZ0K5Uzgpwd2en9454w8-f3c7pyEK0'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted ' + res.statusCode);
});

client.post('/sendTravelPaid', { paid:'true', travelID: '01', device: 'android',
pushId0:'APA91bHJRkpSjXvlFA7L94ybyalAeW0BxE0Z1K4g99onHvXLIFgptSJDhBIMXckY9HBzaBpEWo4Se9zUCd2KjzWUHCJ5TLac-qF-Hu8ozi7Uoe14ZFRg2_c82xmL4ZXgMfuhec4UUd-eu_SkYsMPRt2bqNZ0K5Uzgpwd2en9454w8-f3c7pyEK0'
 }, function(err, req, res, data) {
	assert.ifError(err); 
	console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid ' + res.statusCode);
});
