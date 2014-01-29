var restify = require('restify');
var gcm = require('node-gcm');
var mongojs = require('mongojs');
var apn = require('apn');

var ip_addr = '0.0.0.0';
var port = '8080';

var GCMID = 'AIzaSyCiWYVCwBJVfjg3Y9-CQm4VMe4eO1zsGgM'; // MUST change with your "GCM API Key for Browser Applications"     
var GCMSender = new gcm.Sender(GCMID);

var apnOptions = {gateway: 'gateway.sandbox.push.apple.com'};
var apnConnection = new apn.Connection(apnOptions);

var connection_string = '127.0.0.1:27017/mongojsdb';
var db = mongojs(connection_string, ['mongojsdb']);
var logs = db.collection('logs');

var server = restify.createServer({
        name : 'Node RESTful Push Server',
        version: '0.0.1'
});
 
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.post({path : '/sendClosestTaxi' , version: '0.0.1'} , sendClosestTaxi);
server.post({path : '/sendSelectedTaxi' , version: '0.0.1'} , sendSelectedTaxi);
server.post({path : '/sendAcceptTravel' , version: '0.0.1'} , sendAcceptTravel);
server.post({path : '/sendTravelCompleted' , version: '0.0.1'} , sendTravelCompleted);
server.post({path : '/sendTravelPaid' , version: '0.0.1'} , sendTravelPaid);
server.get({path : '/logs' , version : '0.0.1'} , getAllLogs);

function sendClosestTaxi(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');

		if (req.params.device === 'ANDROID'){
			var message = new gcm.Message();
			message.addData('message','SendClosestTaxi');
			message.addData('title', 'Taxi Express');
			message.addData('msgcnt','1'); // Shows up in the notification in the status bar
			message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
			message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
			
			message.addDataWithKeyValue('travelID', req.params.travelID);
			message.addDataWithKeyValue('origin', req.params.origin);
			message.addDataWithKeyValue('startpoint', req.params.startpoint);
			message.addDataWithKeyValue('valuation', req.params.valuation);
			message.addDataWithKeyValue('phone', req.params.phone);
			message.addDataWithKeyValue('code', 801);
			
			var registrationIds = [];
			if (req.params.pushId0 != '')
			registrationIds.push(req.params.pushId0);
			if (req.params.pushId1 != '')
			registrationIds.push(req.params.pushId1);
			if (req.params.pushId2 != '')        
			registrationIds.push(req.params.pushId2);
			if (req.params.pushId3 != '')        
			registrationIds.push(req.params.pushId3);
			if (req.params.pushId4 != '')
			registrationIds.push(req.params.pushId4);

			
			GCMSender.send(message, registrationIds, 4, function (err, result) {
					if (result.success === 1){
							res.send(201 , result);
							saveBD(req.params.device,801,'OK');
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi           ' + res.statusCode + '   ' + req.params.device);
							return next();        
					}
					else{
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi           ' + res.statusCode + '   ' + req.params.device);
							saveBD(req.params.device,801,err);
							return next(new restify.InvalidArgumentError((result.results)[0].error));
					}
			});
		}
		
		else if (req.params.device === 'IOS'){	
			
			var message = new apn.Notification();
			message.expiry = Math.floor(Date.now() / 1000) + 3600; 	
			message.badge = '1';
			message.sound = 'ping.aiff';
			message.alert = 'Taxi Express';
			message.payload = {'travelID' : req.params.travelID,
								'origin': req.params.origin,
								'startpoint': req.params.startpoint,
								'valuation': req.params.valuation,
								'phone': req.params.phone,
								'code': 801
							}; 
			
			var destionationDevice = new apn.Device(req.params.pushId0);
			apnConnection.pushNotification(message, destionationDevice);
			
			res.send(201, 'OK');
			saveBD(req.params.device,801,'OK');
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi           ' + res.statusCode + '   ' + req.params.device);
			return next();	
		}

}

function sendSelectedTaxi(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');
		
		if (req.params.device === 'ANDROID'){
			var message = new gcm.Message();
			message.addData('message','SendSelectedTaxi');
			message.addData('title','Taxi Express');
			message.addData('msgcnt','1'); // Shows up in the notification in the status bar
			message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
			message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
			
			message.addDataWithKeyValue('travelID', req.params.travelID);
			message.addDataWithKeyValue('origin', req.params.origin);
			message.addDataWithKeyValue('startpoint', req.params.startpoint);
			message.addDataWithKeyValue('valuation', req.params.valuation);
			message.addDataWithKeyValue('code', 802);
			message.addDataWithKeyValue('phone', req.params.phone);
			
			var registrationIds = [];
			if (req.params.pushId != '')
			registrationIds.push(req.params.pushId);

			
			GCMSender.send(message, registrationIds, 4, function (err, result) {
					if (result.success === 1){
							res.send(201 , result);
							saveBD(req.params.device,802,'OK');
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi         ' + res.statusCode + '   ' + req.params.device);
							return next();        
					}
					else{
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi         ' + res.statusCode + '   ' + req.params.device);
							saveBD(req.params.device,802,err);
							return next(new restify.InvalidArgumentError((result.results)[0].error));
					}
			});
		}
		
		else if (req.params.device === 'IOS'){	
			
			var message = new apn.Notification();
			message.expiry = Math.floor(Date.now() / 1000) + 3600; 	
			message.badge = '1';
			message.sound = 'ping.aiff';
			message.alert = 'Taxi Express';
			message.payload = {'travelID' : req.params.travelID,
								'origin': req.params.origin,
								'startpoint': req.params.startpoint,
								'valuation': req.params.valuation,
								'phone': req.params.phone,
								'code': 802
							}; 
			
			var destionationDevice = new apn.Device(req.params.pushId);
			apnConnection.pushNotification(message, destionationDevice);
			
			res.send(201, 'OK');
			saveBD(req.params.device,802,'OK');
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi          ' + res.statusCode + '   ' + req.params.device);
			return next();	
		}
		
}


function sendAcceptTravel(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');
		
		if (req.params.device === 'ANDROID'){
			var message = new gcm.Message();
			message.addData('message','SendAcceptTravel');
			message.addData('title','Taxi Express');
			message.addData('msgcnt','1'); // Shows up in the notification in the status bar
			message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
			message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
			
			message.addDataWithKeyValue('travelID', req.params.travelID);
			message.addDataWithKeyValue('latitude', req.params.latitude);
			message.addDataWithKeyValue('longitude', req.params.longitude);
			message.addDataWithKeyValue('code', 701);
			
			var registrationIds = [];
			if (req.params.pushId != '')
			registrationIds.push(req.params.pushId);

			
			GCMSender.send(message, registrationIds, 4, function (err, result) {
					if (result.success === 1){
							res.send(201 , result);
							saveBD(req.params.device,701,'OK');
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel         ' + res.statusCode + '   ' + req.params.device);
							return next();        
					}
					else{
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel         ' + res.statusCode + '   ' + req.params.device);
							saveBD(req.params.device,701,err);
							return next(new restify.InvalidArgumentError((result.results)[0].error));
					}
			});
		}
		
		else if (req.params.device === 'IOS'){	
			
			var message = new apn.Notification();
			message.expiry = Math.floor(Date.now() / 1000) + 3600; 	
			message.badge = '1';
			message.sound = 'ping.aiff';
			message.alert = 'Taxi Express';
			message.payload = {'travelID' : req.params.travelID,
								'latitude': req.params.latitude,
								'longitude': req.params.longitude,
								'code': 701
							}; 
			
			var destionationDevice = new apn.Device(req.params.pushId);
			apnConnection.pushNotification(message, destionationDevice);
			
			res.send(201, 'OK');
			saveBD(req.params.device,701,'OK');
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel          ' + res.statusCode + '   ' + req.params.device);
			return next();	
		}
}

function sendTravelCompleted(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');
		
		if (req.params.device === 'ANDROID'){
			var message = new gcm.Message();
			message.addData('message','SendTravelCompleted');
			message.addData('title','Taxi Express');
			message.addData('msgcnt','1'); // Shows up in the notification in the status bar
			message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
			message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
			
			message.addDataWithKeyValue('travelID', req.params.travelID);
			message.addDataWithKeyValue('cost', req.params.cost);
			message.addDataWithKeyValue('appPayment', req.params.appPayment);
			message.addDataWithKeyValue('code', 702);
			
			var registrationIds = [];
			if (req.params.pushId != '')
			registrationIds.push(req.params.pushId);

			
			GCMSender.send(message, registrationIds, 4, function (err, result) {
					if (result.success === 1){
							res.send(201 , result);
							saveBD(req.params.device,702,'OK');
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted   ' + res.statusCode + '   ' + req.params.device);
							return next();        
					}
					else{
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted   ' + res.statusCode + '   ' + req.params.device);
							saveBD(req.params.device,702,err);
							return next(new restify.InvalidArgumentError((result.results)[0].error));
					}
			});
		}
		
		else if (req.params.device === 'IOS'){	
			
			var message = new apn.Notification();
			message.expiry = Math.floor(Date.now() / 1000) + 3600; 	
			message.badge = '1';
			message.sound = 'ping.aiff';
			message.alert = 'Taxi Express';
			message.payload = {'travelID' : req.params.travelID,
								'cost': req.params.cost,
								'appPayment': req.params.appPayment,
								'code': 702
							}; 
			
			var destionationDevice = new apn.Device(req.params.pushId);
			apnConnection.pushNotification(message, destionationDevice);
			
			res.send(201, 'OK');
			saveBD(req.params.device,702,'OK');
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /SendTravelCompleted       ' + res.statusCode + '   ' + req.params.device);
			return next();	
		}
}

function sendTravelPaid(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');
			if (req.params.device === 'ANDROID'){
			var message = new gcm.Message();
			message.addData('message', 'SendTravelPaid');
			message.addData('title','Taxi Express');
			message.addData('msgcnt','1'); // Shows up in the notification in the status bar
			message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
			message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
			
			message.addDataWithKeyValue('travelID', req.params.travelID);
			message.addDataWithKeyValue('paid', req.params.paid);
			message.addDataWithKeyValue('code', 803);
			
			var registrationIds = [];
			if (req.params.pushId != '')
			registrationIds.push(req.params.pushId);

			
			GCMSender.send(message, registrationIds, 4, function (err, result) {
					if (result.success === 1){
							res.send(201 , result);
							saveBD(req.params.device,803,'OK');
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid             ' + res.statusCode + '   ' + req.params.device);
							return next();        
					}
					else{
							console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid             ' + res.statusCode + '   ' + req.params.device);
							saveBD(req.params.device,803,err);
							return next(new restify.InvalidArgumentError((result.results)[0].error));
					}
			});
		}
		
		else if (req.params.device === 'IOS'){	
			
			var message = new apn.Notification();
			message.expiry = Math.floor(Date.now() / 1000) + 3600; 	
			message.badge = '1';
			message.sound = 'ping.aiff';
			message.alert = 'Taxi Express';
			message.payload = {'travelID' : req.params.travelID,
								'paid': req.params.paid,
								'code': 803
							}; 
			
			var destionationDevice = new apn.Device(req.params.pushId);
			apnConnection.pushNotification(message, destionationDevice);
			
			res.send(201, 'OK');
			saveBD(req.params.device,803,'OK');
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid            ' + res.statusCode + '   ' + req.params.device);
			return next();	
		}
}

function getAllLogs(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    
    logs.find().limit(500).sort({postedOn : -1} , function(err , success){
        if(success){
                res.send(200 , success);
                console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  GET:  /logs                      ' + res.statusCode);
                return next();
        }else{
                console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  GET:  /logs                      ' + res.statusCode);
                return next(err);
        }
    });
}

function saveBD(device,statusCode,result){
        var log = {};
        log.date = Date();
        log.device = device;
        log.statusCode = statusCode; 
        log.result = result;
        logs.save(log);
}

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});
