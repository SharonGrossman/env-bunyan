# env-bunyan [![Build Status](https://travis-ci.org/SharonGrossman/env-bunyan.svg?branch=master)](https://travis-ci.org/SharonGrossman/env-bunyan)[![Coverage Status](https://coveralls.io/repos/github/SharonGrossman/env-bunyan/badge.svg?branch=master)](https://coveralls.io/github/SharonGrossman/env-bunyan?branch=master)
Bunyan wrapper with environment variables

## Installation
``` bash
$ [sudo] npm install env-bunyan --save
```

## Usage

### Example
``` bash
$ LOG_NAME=my-app node server.js
```
``` js
import logger from 'env-bunyan';

if (err) { 
  logger.info({
    err,
    msg: 'Error'
  });
}

```

## License

[MIT](LICENSE)
