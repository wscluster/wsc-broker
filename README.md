# wsc-simple-broker
A simple broker engine for [ws-cluster](https://github.com/wscluster/ws-cluster). It allows you to scale ws-cluster horizontally across multiple machines.

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
