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

Use the function for more complex filtering. It's also possible to change **args** to check some guesses on the fly.

```ts
//show only 'eth_sendTransaction' and change gas for the transaction
const matcher = (args: {method: string, params?: any}) => {
  if(args.method === 'eth_sendTransaction') {    
    args.params[0].gas = '0x1C9C38';
    return true;
  }

  return false;
};

logger(matcher);
```

and result

```
...
{
  method: 'eth_sendTransaction',
  params: [
    {
      gas: '0x1C9C38',
      from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      to: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
      data: '0x3ccfd60b',
      maxFeePerGas: '0x32b1a62c',
      maxPriorityFeePerGas: '0x0'
    }
  ]
}
...
```

