// parser.js

var path = require('path');
var colors = require('colors');
var helper = require('./helper');

function parsePort(port) {
    try {
        if (isNaN(parseFloat(port))) {
            console.error('Error: Invalid port.');
            return process.exit(1);
        }
        return parseInt(port);
    }
    catch (e) {
        console.error('Error: Invalid port.');
        return process.exit(1);
    }
}

function parseDefaultDir(defaultDir) {
    var cwd = process.cwd();
    var dir = path.join(cwd, defaultDir);
    if (!helper.dirExist(dir)) {
        console.log('Directory "' + './public'.red + '" does not exist. Fallback to root "' + '.'.green + '"');
        return cwd;
    }
    return dir;
}

function parseDir(dirpath) {
    var dir, cwd = process.cwd();
    if (helper.isAbsolutePath(dirpath)) {
        if (!helper.dirExist(dirpath)) {
            console.error('Error: Directory "' + dirpath.red + '" does not exist.');
            return process.exit(1);
        }
        else {
            return dirpath;
        }
    }
    else {
        dir = path.join(cwd, dirpath);
        if (!helper.dirExist(dir)) {
            console.error('Error: Directory "' + dirpath.red + '" does not exist.');
            return process.exit(1);
        }
        return dir;
    }
}

function parseMount(path) {
    if (!path) {
        return '/';
    }
    path = path[0] != '/' ? '/' + path : path;
    return path;
}

function parseAuth(value) {
    var split = value.split(':'), auth = {};
    if (split.length <= 1) {
        console.error('Error: User or password not provided. Example: "username:password" -> "batman:brucewayne".');
        return process.exit(1);
    }
    auth.username = split[0];
    auth.password = split.slice(1).join(':');
    return auth;
}

function parseIndex(dir, filename) {
    var filepath = path.join(dir, filename);
    if (!helper.fileExist(filepath)) {
        console.error('Error: Custom index.html filename "' + filename.red + '" does not exist in "' + dir.red + '".');
        return process.exit(1);
    }
    return filename;
}

module.exports = exports = {
    parsePort: parsePort,
    parseDefaultDir: parseDefaultDir,
    parseDir: parseDir,
    parseMount: parseMount,
    parseAuth: parseAuth,
    parseIndex: parseIndex
};