var util = require('util');
var Stream = require('stream');
var ws = require('websocket-lib');

/**
 * Broker Client
 * @constructor
 * @param  {Number|String|Object} [options]                  If options is a string, it is automatically parsed with url.parse().
 * @param  {String}               [options.host = localhost] A domain name or IP address of the server.
 * @param  {Number}               [options.port = 80|443]    Port of remote server.
 * @param  {String}               [options.secretKey]        Port of remote server.
 */
function Client(options) {
	Stream.Duplex.call(this, {
		decodeStrings: false
	});
	var self = this;

	if (options && options['secretKey']) {
		options['auth'] = 'wsc-broker-client:' + options['secretKey'];
	}

	ws.connect(options, function (session) {
		self.pipe(session);
		session.on('data', function (data) {
			self._handleData(data);
		});
	});
}

util.inherits(Client, Stream.Duplex);

Client.prototype.sendObject = function (event) {
	this.write(JSON.stringify(event));
};

Client.prototype.subscribe = function (channel) {
	this.sendObject({
		type: 'subscribe',
		channel: channel
	});
};

Client.prototype.unsubscribe = function (channel) {
	this.sendObject({
		type: 'unsubscribe',
		channel: channel
	});
};

Client.prototype.publish = function (channel, data) {
	this.sendObject({
		type: 'message',
		channel: channel,
		data: data
	});
};

Client.prototype._write = function (chunk, encoding, callback) {
	this.push(chunk);
	callback();
};

Client.prototype._read = function () {
};

Client.prototype._handleData = function (data) {
	try {
		var event = JSON.parse(data);
		if (event['type'] === 'message') {
			this.emit('message', event['channel'], event['data']);
		}
	} catch (e) {
	}
};

module.exports = Client;
