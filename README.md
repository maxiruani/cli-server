# cli-server

A simple CLI static server.

## Installation

``` bash
  $ [sudo] npm install cli-server -g
```

## Usage

```
  $ forever --help
  usage: cli-server [options]

  options:
    -h, --help                      Output usage information
    -V, --version                   Output the version number
    -p, --port <n>                  Server listen to this port. Default: 5555.
    -d, --dir <path>                Serve static files from directory PATH.
                                    Default "./public", fallback to "." if not exists.
    -m, --mount <path>              Mount point or base on URL. Default: "/" (Root)
    -o, --open                      Serve at "0.0.0.0". Useful for mobile testing in a LAN.
                                    Default: "127.0.0.1".
    -a, --auth <username:password>  Basic auth http authentication. Default: None.
                                    Example: "username:password" -> "batman:brucewayne".
    -i, --index <filename>          Set custom index.html. Default: index.html
```

## Defaults

Option    | Default
-------   | ---------
port      | `5555`
dir       | `./public` or `.`
mount     | `/`
open      | `false`
auth      | `None`
index     | `index.html`

## Examples

Serve a specific directory at port 3500 with mount point /base.

``` bash
  $ cli-server --port 3500 --mount /base --dir D:/dev/project
```
Output
```
  Directory "./public" does not exist. Fallback to root "."
  Serving "D:\dev\project" at: http://127.0.0.1:3500/base
```

Serve the current working directory with a basic auth and change the default index.html and opened to '0.0.0.0'.
The --open flag is useful for mobile testing. You can browse them through the local LAN IP.

``` bash
  $ cli-server --open --auth batman:brucewayne --index hello.html
```

Output
```
  Directory "./public" does not exist. Fallback to root "."
  Serving "D:\dev\project" at: http://192.168.0.11:5555/
  Serving "D:\dev\project" at: http://127.0.0.1:5555/
```

#### License: MIT
#### Author: [Maximiliano Ruani](http://github.com/maxiruani)