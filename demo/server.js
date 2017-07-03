var broker = require('../');

broker.createServer().listen(6667, function () {
	console.log('broker listening');
});
