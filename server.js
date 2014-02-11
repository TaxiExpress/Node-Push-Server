var restify = require('restify');
var stratton = require('stratton');

var ip_addr = '0.0.0.0';
var port = '8080';

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
server.post({path : '/sendTravelCanceled' , version: '0.0.1'} , sendTravelCanceled);

function sendClosestTaxi(req , res , next){
	res.setHeader('Access-Control-Allow-Origin','*');
	
	var pushId = [];
	if (req.params.pushId0 != '')
		pushId.push(req.params.pushId0);
	if (req.params.pushId1 != '')
		pushId.push(req.params.pushId1);
	if (req.params.pushId2 != '')       
		pushId.push(req.params.pushId2);
	if (req.params.pushId3 != '')       
		pushId.push(req.params.pushId3);
	if (req.params.pushId4 != '')
		pushId.push(req.params.pushId4);	
	
	data = {title : 'Taxi Express' , message : 'SendClosestTaxi', travelID : req.params.travelID , origin: req.params.origin, startpoint: req.params.startpoint, valuation : req.params.valuation, phone : req.params.phone, code : 801};
	
	stratton.sendPush(pushId, data, function (result){
		if (result){
			res.send(201);
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi            ' + res.statusCode);							
			return next();
		}
		else{
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendClosestTaxi            409');
			return next(new restify.InvalidArgumentError(result));
		}
	});
}

function sendSelectedTaxi(req , res , next){
	res.setHeader('Access-Control-Allow-Origin','*');
	
	data = {title : 'Taxi Express' , message : 'SendSelectedTaxi', travelID : req.params.travelID , origin: req.params.origin, startpoint1: req.params.valuation[0], startpoint2: req.params.valuation[1], valuation : req.params.valuation, phone : req.params.phone, code : 802};

	stratton.sendPush(req.params.pushId, data, function (result){
		if (result){
			res.send(201);
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi           ' + res.statusCode);							
			return next();
		}
		else{
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendSelectedTaxi           ' + res.statusCode);
			return next(new restify.InvalidArgumentError(result));
		}
	});
}

function sendAcceptTravel(req , res , next){
	res.setHeader('Access-Control-Allow-Origin','*');
	data = {title : 'El taxista ha aceptado su solicitud' , message : 'SendAcceptTravel', travelID : req.params.travelID , latitude: req.params.latitude, longitude: req.params.longitude, code : 701};
	
	stratton.sendPush(req.params.pushId, data, function (result){
		if (result){
			res.send(201);
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel           ' + res.statusCode);							
			return next();
		}
		else{
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendAcceptTravel           409');
			return next(new restify.InvalidArgumentError(result));
		}
	});
}
	
function sendTravelCompleted(req , res , next){
	res.setHeader('Access-Control-Allow-Origin','*');
	
	data = {title : 'Pago del trayecto' , message : 'SendTravelCompleted', travelID : req.params.travelID , cost: req.params.cost, appPayment: req.params.appPayment, code : 702};
	
	stratton.sendPush(req.params.pushId, data, function (result){
		if (result){
			res.send(201);
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted        ' + res.statusCode);							
			return next();
		}
		else{
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCompleted        409');
			return next(new restify.InvalidArgumentError(result));
		}
	});
}

function sendTravelPaid(req , res , next){
	res.setHeader('Access-Control-Allow-Origin','*');

	data = {title : 'Taxi Express' , message : 'SendTravelPaid', travelID : req.params.travelID , paid: req.params.paid, code : 803};
	
	stratton.sendPush(req.params.pushId, data, function (result){
		if (result){
			res.send(201);
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid             ' + res.statusCode);							
			return next();
		}
		else{
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelPaid             409');
			return next(new restify.InvalidArgumentError(result));
		}
	});
}

function sendTravelCanceled(req , res , next){
	res.setHeader('Access-Control-Allow-Origin','*');

	data = {title : 'Taxi Express' , message : 'SendTravelCanceled', travelID : req.params.travelID , code : 703};
	
	stratton.sendPush(req.params.pushId, data, function (result){
		if (result){
			res.send(201);
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCanceled         ' + res.statusCode);							
			return next();
		}
		else{
			console.log (new Date().toJSON().slice(0,10) + '  ' + new Date().toLocaleTimeString()  + '  POST: /sendTravelCanceled         409');
			return next(new restify.InvalidArgumentError(result));
		}
	});
}

server.listen(port ,ip_addr, function(){
	console.log('%s listening at %s ', server.name , server.url);
});
