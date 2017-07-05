# wsc-broker
A simple broker engine for [ws-cluster](https://github.com/wscluster/ws-cluster). It allows you to scale ws-cluster horizontally across multiple machines.

## Installation

There are two ways to install wsc-broker.

### Global way

```bash
npm install -g wsc-broker
```

Then you can use run the broker server by command:

```bash
wsc-broker -p [port]
```

### Modular way

```bash
npm install wsc-broker --save
```

## Usage

### Server

```js
var broker = require('wsc-broker');

broker.createServer({
	secretKey: 'wsc-broker-pass'
}).listen(6667, function () {
	console.log('broker listening');
});
```

### Client

```js
var broker = require('wsc-broker');

var client = broker.connect({
	port: 6667,
	secretKey: 'wsc-broker-pass'
});
```

## API

### new broker.Server(options)

Simple broker server for ws-cluster.

#### options

Type: Object
    
##### options.secretKey

Type: String

A secret key to verify incoming sessions.

### new broker.Client(options)

#### options

Type: Object

##### options.host

Type: String Default: localhost

A domain name or IP address of the server.

##### options.port

Type: Number Default: 80

Port of remote server.

##### options.secretKey

Type: String

Should be match the `secretKey` option of `broker.Server`.

### broker.createServer(options)

Returns a new instance of `broker.Server`.

#### options

Will be passed to `broker.Server` constructor.

### broker.connect(options)

Returns a new instance of `broker.Client`.

#### options

Will be passed to `broker.Client` constructor.
