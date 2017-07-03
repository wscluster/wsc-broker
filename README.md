# wsc-simple-broker
A simple broker engine for [ws-cluster](https://github.com/wscluster/ws-cluster).

## Installation

There are two ways to install wsc-simple-broker.

### Global way

```bash
npm install -g wsc-simple-broker
```

Then you can use run the broker server by command:

```bash
wsc-broker -p [port]
```

### Modular way

```bash
npm install wsc-simple-broker
```

## Usage

### new broker.Server(options);

Simple broker server for ws-cluster.

#### options
    
##### options.httpServer

Type: Object

The Node http or https server instance to attach to.

##### options.autoAccept

Type: Boolean Default: true

If true, the server will accept sessions automatically, otherwise, you should resolve sessions by calling `session.accept()` or `session.reject()` method in `session` event.

### new broker.Client(options);

#### options

Type: Object

##### options.host

Type: String Default: localhost

A domain name or IP address of the server.

##### options.port

Type: Number Default: 80

Port of remote server.

### broker.createServer(options)

Returns a new instance of `broker.Server`.

#### options

Will be passed to `broker.Server` constructor.

### broker.connect(options)

Returns a new instance of `broker.Client`.

#### options

Will be passed to `broker.Client` constructor.
