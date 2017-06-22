var util = require('util');
var ws = require('websocket-lib');

function Server(options) {
	ws.Server.call(this, options);
	this.subscribers = {};
}

util.inherits(Server, ws.Server);

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
