var broker = require('../');

broker.createServer({
	secretKey: 'wsc-broker-pass'
}).listen(6667, function () {
	console.log('broker listening');
});
