// helper.js

var fs = require('fs');
var os = require('os');

function isAbsolutePath(path) {
    return /^(?:\/|[a-z]+:\/\/)/.test(path);
}

function dirExist(path) {
    if (fs.existsSync(path)) {
        var stats = fs.lstatSync(path);
        return stats.isDirectory();
    }
    return false;
}

function fileExist(path) {
    if (fs.existsSync(path)) {
        var stats = fs.lstatSync(path);
        return !stats.isDirectory();
    }
    return false;
}

function getIPAddresses(isOpen) {
    if (!isOpen) {
        return ['127.0.0.1'];
    }
    var addresses = [];
    var interfaces = os.networkInterfaces();
    for (var dev in interfaces) {
        if (!interfaces.hasOwnProperty(dev)) {
            return;
        }
        interfaces[dev].forEach(function(details) {
            if (details.family == 'IPv4') {
                addresses.push(details.address);
            }
        });
    }
    return addresses;
}

module.exports = exports = {
    isAbsolutePath: isAbsolutePath,
    dirExist: dirExist,
    fileExist: fileExist,
    getIPAddresses: getIPAddresses
};