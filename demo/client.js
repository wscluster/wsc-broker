var broker = require('../');

var client = broker.connect({
	port: 6667,
	secretKey: 'wsc-broker-pass'
});

client.subscribe('test');
client.publish('test', 'message');
client.on('message', function (channel, data) {
	console.log(channel + ': ' + data);
});
