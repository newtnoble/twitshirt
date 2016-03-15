/*Serial-to-websocket Server
using serialport.js
To call this type the following on the command line:
node wsServer.js portName
where portname is the name of your serial port, e.g. /dev/tty.usbserial-xxxx (on OSX)
created 28 Aug 2015
by Tom Igoe
*/

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'pWH3fdZm2C85bILd0MRMxMbYm',
  consumer_secret: '3fOuI0cgYGts2JxxS44qOCrePhLESv5HqYlJ47vAStyYgDPi34',
  access_token_key: '4920057555-zrhgzJKYiKAKy9LW4xXZt7CffruVYm9yTbDPDIT',
  access_token_secret: 'uKD7wIYOnBl48m6CHGy1qAczwQFlaI807Y5Uvoa8MeASX'
});

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var portName = process.argv[2];
var tweets="";
var allTweets ="";
var canSend = true;

//get timeline from twitter
var params = {count: 6};
client.get('statuses/user_timeline', params, gotData);

function gotData(error, data, response) {
	allTweets = data;
	tweets = allTweets[Math.floor(Math.random() * 6)].text;
	console.log(tweets);
};

var myPort = new SerialPort(portName, {
 baudRate: 9600,
  parser: serialport.parsers.readline("\n"),
  encoding: "UTF-8"
});

myPort.on("open", function () {
  console.log('open');
  myPort.on('data', function(data) {
    data = parseInt(data);
    if (data == 1){
		console.log("called");
	  if(allTweets != "" && canSend){
	  
		tweets = allTweets[Math.floor(Math.random() * 6)].text;
		myPort.write(tweets + "^", function(err, results) {});
		canSend = false;
		}
	}
	else if (data == 0) canSend = true;
  });

  
 //wait until Arduino has restarted before sending data
 setTimeout(function(){
	  myPort.write(tweets + "^", function(err, results) {
	  });
 },2000);
});