var Server = require('./lib/server');
var Client = require('./lib/client');

/**
 * Create a WebSocket Cluster Server.
 * @method createServer
 * @param  {Object}   [options]
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
 * @param  {Object}               [options.headers]          Headers to be sent to the server.
 * @param  {String|Array}         [options.subProtocols]     The list of WebSocket sub-protocols.
 * @return {Client}
 */
function connect(options) {
	return new Client(options);
}

module.exports = connect;
module.exports.Server = Server;
module.exports.Client = Client;
module.exports.createServer = createServer;
module.exports.connect = connect;
