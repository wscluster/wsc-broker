var program = require('commander');
var pkg = require('../package.json');
var Server = require('../lib/server');

program
	.version(pkg.version, '-v, --version')
	.option('-p, --port [port]', 'listening port of broker server')
	.parse(process.argv);

var server = new Server();
server.listen(program['port'], function () {
	console.log('Listening to', server.address().port);
});
