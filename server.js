var restify = require('restify');
var gcm = require('node-gcm');
var mongojs = require('mongojs');

var ip_addr = '0.0.0.0';
var port = '8080';
var GCMID = 'AIzaSyCiWYVCwBJVfjg3Y9-CQm4VMe4eO1zsGgM'; // MUST change with your "GCM API Key for Browser Applications"     

var connection_string = '127.0.0.1:27017/mongojsdb';
var db = mongojs(connection_string, ['mongojsdb']);
var logs = db.collection('logs');

var server = restify.createServer({
        name : 'Node RESTful GCM Server',
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

        var message = new gcm.Message();
        message.addData('message','a');
        message.addData('title','sendClosestTaxi');
        message.addData('msgcnt','1'); // Shows up in the notification in the status bar
        message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
        message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
        
        message.addDataWithKeyValue('travelID', req.params.travelID);
        message.addDataWithKeyValue('origin', req.params.origin);
        message.addDataWithKeyValue('startpoint', req.params.startpoint);
        message.addDataWithKeyValue('valuation', req.params.valuation);
        message.addDataWithKeyValue('phone', req.params.phone);

        message.addDataWithKeyValue('code', 801);
        
        var sender = new gcm.Sender(GCMID);
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

        
        sender.send(message, registrationIds, 4, function (err, result) {
                if (result.success === 1){
                        res.send(201 , result);
                        saveBD(req.params.device,801,'OK');
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi          ' + res.statusCode);
                        return next();        
                }
                else{
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi          ' + res.statusCode);
                        saveBD(req.params.device,801,error);
                        return next(new restify.InvalidArgumentError((result.results)[0].error));
                }
        });
}

function sendSelectedTaxi(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');

        var message = new gcm.Message();
        message.addData('message','a');
        message.addData('title','sendSelectedTaxi');
        message.addData('msgcnt','1'); // Shows up in the notification in the status bar
        message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
        message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
        
        message.addDataWithKeyValue('travelID', req.params.travelID);
        message.addDataWithKeyValue('origin', req.params.origin);
        message.addDataWithKeyValue('startpoint', req.params.startpoint);
        message.addDataWithKeyValue('valuation', req.params.valuation);
        message.addDataWithKeyValue('code', 802);
        message.addDataWithKeyValue('phone', req.params.phone);
        
        var sender = new gcm.Sender(GCMID);
        var registrationIds = [];
        if (req.params.pushId != '')
        registrationIds.push(req.params.pushId);

        
        sender.send(message, registrationIds, 4, function (err, result) {
                if (result.success === 1){
                        res.send(201 , result);
                        saveBD(req.params.device,802,'OK');
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi         ' + res.statusCode);
                        return next();        
                }
                else{
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi         ' + res.statusCode);
                        saveBD(req.params.device,802,error);
                        return next(new restify.InvalidArgumentError((result.results)[0].error));
                }
        });
}


function sendAcceptTravel(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');

        var message = new gcm.Message();
        message.addData('message','a');
        message.addData('title','sendAcceptTravel');
        message.addData('msgcnt','1'); // Shows up in the notification in the status bar
        message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
        message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
        
        message.addDataWithKeyValue('travelID', req.params.travelID);
        message.addDataWithKeyValue('latitude', req.params.latitude);
        message.addDataWithKeyValue('longitude', req.params.longitude);
        message.addDataWithKeyValue('code', 701);
        
        var sender = new gcm.Sender(GCMID);
        var registrationIds = [];
        if (req.params.pushId != '')
        registrationIds.push(req.params.pushId0);

        
        sender.send(message, registrationIds, 4, function (err, result) {
                if (result.success === 1){
                        res.send(201 , result);
                        saveBD(req.params.device,701,'OK');
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel         ' + res.statusCode);
                        return next();        
                }
                else{
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel         ' + res.statusCode);
                        saveBD(req.params.device,701,error);
                        return next(new restify.InvalidArgumentError((result.results)[0].error));
                }
        });
}

function sendTravelCompleted(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');

        var message = new gcm.Message();
        message.addData('message','a');
        message.addData('title','sendTravelCompleted');
        message.addData('msgcnt','1'); // Shows up in the notification in the status bar
        message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
        message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
        
        message.addDataWithKeyValue('travelID', req.params.travelID);
        message.addDataWithKeyValue('cost', req.params.cost);
        message.addDataWithKeyValue('appPayment', req.params.appPayment);
        message.addDataWithKeyValue('code', 702);
        
        var sender = new gcm.Sender(GCMID);
        var registrationIds = [];
        if (req.params.pushId != '')
        registrationIds.push(req.params.pushId0);

        
        sender.send(message, registrationIds, 4, function (err, result) {
                if (result.success === 1){
                        res.send(201 , result);
                        saveBD(req.params.device,702,'OK');
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted      ' + res.statusCode);
                        return next();        
                }
                else{
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted      ' + res.statusCode);
                        saveBD(req.params.device,702,error);
                        return next(new restify.InvalidArgumentError((result.results)[0].error));
                }
        });
}

function sendTravelPaid(req , res , next){
        res.setHeader('Access-Control-Allow-Origin','*');

        var message = new gcm.Message();
        message.addData('message', 'a');
        message.addData('title','sendTravelPaid');
        message.addData('msgcnt','1'); // Shows up in the notification in the status bar
        message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
        message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified
        
        message.addDataWithKeyValue('travelID', req.params.travelID);
        message.addDataWithKeyValue('paid', req.params.paid);
        message.addDataWithKeyValue('code', 803);
        
        var sender = new gcm.Sender(GCMID);
        var registrationIds = [];
        if (req.params.pushId != '')
        registrationIds.push(req.params.pushId0);

        
        sender.send(message, registrationIds, 4, function (err, result) {
                if (result.success === 1){
                        res.send(201 , result);
                        saveBD(req.params.device,803,'OK');
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid           ' + res.statusCode);
                        return next();        
                }
                else{
                        console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid           ' + res.statusCode);
                        saveBD(req.params.device,803,error);
                        return next(new restify.InvalidArgumentError((result.results)[0].error));
                }
        });
}

function getAllLogs(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    
    logs.find().limit(500).sort({postedOn : -1} , function(err , success){
        if(success){
                res.send(200 , success);
                console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  GET:  /logs                     ' + res.statusCode);
                return next();
        }else{
                console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  GET:  /logs                     ' + res.statusCode);
                return next(err);
        }
    });
}

function saveBD(device,messageType,result){
        var log = {};
        log.date = Date();
        log.device = device;
        log.messageType = messageType; 
        log.result = result;
        logs.save(log);
}

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});
