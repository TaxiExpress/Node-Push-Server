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

server.post({path : '/push' , version: '0.0.1'}, sendPush);
server.post({path : '/sendClosestTaxi' , version: '0.0.1'} , sendClosestTaxi);
server.post({path : '/sendSelectedTaxi' , version: '0.0.1'} , sendSelectedTaxi);
server.post({path : '/sendTravelCompleted' , version: '0.0.1'} , sendTravelCompleted);
server.post({path : '/sendTravelPaid' , version: '0.0.1'} , sendTravelPaid);
server.post({path : '/sendTravelCanceled' , version: '0.0.1'} , sendTravelCanceled);

function sendPush(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	pushId = req.params.pushId;
	data = req.params;
	data.pushId = '0';
	console.log(data);

	stratton.sendPush(pushId, data, function (result){
		if (result===true){
			res.send(201);
			console.log (new Date().toJSON().slice(0,10) + ' ' + new Date().toLocaleTimeString() + ' POST: /push ' + res.statusCode + '   ' + data.message);
			return next();    
		}
		else{
			console.log (new Date().toJSON().slice(0,10) + ' ' + new Date().toLocaleTimeString() + ' POST: /push ' + '409' + '   ' + data.message);
			return next(new restify.InvalidArgumentError(result));
		}
	});
}

function sendClosestTaxi(req , res , next){
	res.setHeader('Access-Control-Allow-Origin','*');
	
	var pushId = [];
	if (req.params.pushId0 != '')
		pushId.push(req.params.pushId0);

	data = {title : 'Taxi Express' , message : 'SendSelectedTaxi', travelID : req.params.travelID , origin: req.params.origin, startpoint: req.params.startpoint[0] + "," + req.params.startpoint[1], valuation : req.params.valuation, phone: req.params.phone, code : 802};

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

server.listen(port ,ip_addr, function(){
	console.log('%s listening at %s ', server.name , server.url);
});
