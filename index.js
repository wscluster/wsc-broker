var Server = require('./lib/server');
var Client = require('./lib/client');

/**
 * Create a WebSocket Cluster Server.
 * @method createServer
 * @param   {Object}   [options]
 * @param   {String}   [options.secretKey] A secret key to verify incoming sessions.
 * @return {Server}
 */
function createServer(options) {
	return new Server(options);
}

/**
 * Create a connection to the WebSocket Cluster Server.
 * @param  {Number|String|Object} [options]                  If options is a string, it is automatically parsed with url.parse().
 * @param  {String}               [options.host = localhost] A domain name or IP address of the server.
 * @param  {Number}               [options.port = 80|443]    Port of remote server.
 * @param  {String}               [options.secretKey]        Port of remote server.
 * @return {Client}
 */
function connect(options) {
	return new Client(options);
}

exports.Server = Server;
exports.Client = Client;
exports.createServer = createServer;
exports.connect = connect;
