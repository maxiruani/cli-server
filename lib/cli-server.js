// lib/cli-server.js

var colors = require('colors');
var program = require('commander');
var morgan = require('morgan');
var express = require('express');
var auth = require('basic-auth');

var pjson = require('../package.json');

var helper = require('./helper.js');
var parser = require('./parser.js');

var defaultArgs = {
    port: 5555,
    dir: './public',
    mount: '/',
    open: false,
    auth: undefined,
    index: 'index.html'
};

function start () {
    program
        .version(pjson.version)
        .option('-p, --port <n>', 'Server listen to this port. Default: 5555.', parser.parsePort)
        .option('-d, --dir <path>', 'Serve static files from directory PATH. Default "./public", fallback to "." if not exists.', parser.parseDir)
        .option('-m, --mount <path>', 'Mount point or base on URL. Default: "/" (Root)', parser.parseMount)
        .option('-o, --open', 'Serve at "0.0.0.0". Useful for mobile testing in a LAN. Default: "127.0.0.1".')
        .option('-a, --auth <username:password>', 'Basic auth http authentication. Default: none. Example: "username:password" -> "batman:brucewayne".', parser.parseAuth)
        .option('-i, --index <filename>', 'Set custom index.html. Default: index.html')
        .parse(process.argv);

    program.port = program.port || defaultArgs.port;
    program.dir = program.dir || parser.parseDefaultDir(defaultArgs.dir);
    program.mount = program.mount || defaultArgs.mount;

    program.index = program.index ? parser.parseIndex(program.dir, program.index) : defaultArgs.index;

    // Express
    var app = express();
    app.use(morgan('dev'));

    if (program.auth) {
        app.use(function(req, res, next) {
            var credentials = auth(req);
            if (credentials === undefined || credentials['name'] !== program.auth.username || credentials['pass'] !== program.auth.password) {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
                res.end('Unauthorized');
            } else {
                next();
            }
        });
    }

    app.use(program.mount, express.static(program.dir, {
        maxage: 1,
        index: program.index
    }));

    var ip = program.open ? '0.0.0.0' : '127.0.0.1';

    var server = app.listen(program.port, ip, function (err) {
        if (err) {
            console.error('Error at server initialization. Message: %s', err.message);
            return process.exit(err.code);
        }
        helper.getIPAddresses(program.open).forEach(function (address) {
            console.log('Serving "' + program.dir.green + '" at: ' + 'http://'.gray + address.blue + ':' + program.port.toString().blue + program.mount.cyan);
        });
    });
}

exports.start = start;