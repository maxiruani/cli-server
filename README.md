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
    -o, --open                      Serve at "0.0.0.0". Useful for mobile 
                                    testing in a LAN. Default: "127.0.0.1".
    -a, --auth <username:password>  Basic auth http authentication. Default: None.
                                    Example: "username:password"->"batman:brucewayne".
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

#### License: MIT
#### Author: [Maximiliano Ruani](http://github.com/maxiruani)
