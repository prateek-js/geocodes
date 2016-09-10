
var express = require('express'); //Create Express Server
var app = express(); // create a instance of express and assign it to app variable
var fs = require("fs"); //Read File
var static = require('node-static'); //Modules to Make Static File accessable
//Lets define a port we want to listen to
const PORT=3003;// the port on which server should run
var dataFileUser = __dirname + "/public/" + "location.json"; // Static Data JSON file path
var bodyParser = require('body-parser'); //Modules for parsing all POST / PUT / DETELE data
var fileCharset = 'utf8'; // CharSet of the File Whlie reading
app.use(bodyParser.json()); //parses and returns the json 
app.use(bodyParser.urlencoded({ extended: true })); // parses url encoded 

// cors enabled
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}


app.get('/api/location', function (req, res) {
	console.log("Get Locations Lists");
   		fs.readFile(dataFileUser , fileCharset, function (err, data) {
       	//console.log(data);
    		data = JSON.parse(data);
       		res.end( JSON.stringify(data));
   	});
});

//Lets start our server
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

/* EXTRA CODE ADDED TO TEST ALL THE API */
// create a static server
var file = new static.Server('./public');
app.get('/*', function (req, res) {
  console.log("Requesting File");
  file.serve(req, res);
});
/*ENDS HERE*/