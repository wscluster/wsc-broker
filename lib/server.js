var util = require('util');
var auth = require('basic-auth');
var ws = require('websocket-lib');

/**
 * Broker Server
 * @constructor
 * @param   {Object}   [options]
 * @param   {String}   [options.secretKey] A secret key to verify incoming sessions.
 */
function Server(options) {
	options = options || {};
	this.subscribers = {};
	this.secretKey = options['secretKey'];
	if (this.secretKey) {
		options['autoAccept'] = false;
		ws.Server.call(this, options, this._handleSession);
	} else {
		ws.Server.call(this, options);
	}
}

util.inherits(Server, ws.Server);

Server.prototype._handleSession = function (session) {
	var credentials = auth(session.request);
	if (!credentials || credentials['name'] !== 'wsc-broker-client' || credentials['pass'] !== this.secretKey) {
		session.reject(401);
	} else {
		session.accept();
	}
};

Server.prototype.handleSubscribe = function (session, channel) {
	var subscribers = this.subscribers;
	var sessions = subscribers[channel];
	if (!sessions) {
		sessions = subscribers[channel] = [];
	}
	var index = sessions.indexOf(session);
	if (index >= 0) {
		return;
	}
	sessions.push(session);
};

Server.prototype.handleUnsubscribe = function (session, channel) {
	var subscribers = this.subscribers;
	var sessions = subscribers[channel];
	if (!sessions) {
		return;
	}
	var index = sessions.indexOf(session);
	if (index < 0) {
		return;
	}
	sessions.splice(index, 1);
	if (!sessions.length) {
		delete subscribers[channel];
	}
};

Server.prototype.publish = function (channel, data) {
	var sessions = this.subscribers[channel];
	if (!sessions) {
		return;
	}
	sessions.forEach(function (session) {
		session.sendText(JSON.stringify({
			type: 'message',
			channel: channel,
			data: data
		}));
	});
};

function ServerSession() {
	ws.Server.Session.apply(this, arguments);
	this.on('data', this._handleData);
}

util.inherits(ServerSession, ws.Server.Session);

ServerSession.prototype._handleData = function (data) {
	try {
		this._handleEvent(JSON.parse(data));
	} catch (e) {
	}
};

ServerSession.prototype._handleEvent = function (event) {
	var type = event['type'];
	if (type === 'subscribe') {
		this.server.handleSubscribe(this, event['channel']);
	} else if (type === 'unsubscribe') {
		this.server.handleUnsubscribe(this, event['channel']);
	} else if (type === 'message') {
		this.server.publish(event['channel'], event['data']);
	}
};

module.exports = Server;
Server.Session = ServerSession;
