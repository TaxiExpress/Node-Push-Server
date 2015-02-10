var restify = require('restify');
var stratton = require('stratton');

var ip_addr = process.env.OPENSHIFT_NODEJS_IP;
var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;

var server = restify.createServer({
    name : 'Node RESTful Push Server',
    version: '0.0.1'
});
 
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.post({path : '/push' , version: '0.0.1'}, sendPush);

function sendPush(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	pushId = req.params.pushId;
	data = req.params;
	data.pushId = '0';

	stratton.sendPush(pushId, data, function (result){
		if (result===true){
			console.log (new Date().toJSON().slice(0,10) + ' ' + new Date().toLocaleTimeString() + ' POST: /push 201');
			res.send(201);
			return next();    
		}
		else{
			console.log (new Date().toJSON().slice(0,10) + ' ' + new Date().toLocaleTimeString() + ' POST: /push ' + '409');
			return next(new restify.InvalidArgumentError(result));
		}
	});
}

server.listen(port ,ip_addr, function(){
	console.log('%s listening at %s ', server.name , server.url);
});
