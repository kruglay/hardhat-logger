# hardhat-logger

_Show transaction params before hardhat send transaction to network_

## Installation

```bash
npm install hardhat-logger
```

or

```bash
yarn add hardhat-logger
```

Import the plugin in your `hardhat.config.ts` or `hardhat.config.js`:

```ts
//hardhat.config.ts

import {logger, MatcherType} from 'hardhat-logger'//or const {logger} = require('hardhat-logger');

// type MatcherType = string | string[] | RegExp | ((args: {method: string; params?: unknown[] | object;}) => boolean);

const matcher: MatcherType  = /eth_getBalance/; 
logger(matcher); // or without arguments logger() 
```
here what you see if you run `npx hardhat test` in [Lock hardhat example](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start)
```
...
{
  method: 'eth_getBalance',
  params: [
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    '0x3'
  ]
}
{
  method: 'eth_getBalance',
  params: [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x2'
  ]
}
...
```

