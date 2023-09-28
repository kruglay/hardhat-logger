import {extendProvider} from "hardhat/config";
import {ProviderWrapper} from 'hardhat/plugins'
import {EIP1193Provider, RequestArguments} from "hardhat/types";

export type MatcherType = string | string[] | RegExp | ((args: {method: string; params?: unknown[] | object;}) => boolean);

class LogProvider extends ProviderWrapper {
  constructor(
    protected readonly _wrappedProvider: EIP1193Provider,
    public matcher?: MatcherType,
    public depth: number = 3,
  ) {
    super(_wrappedProvider);
    if (matcher) {
      if (typeof matcher === 'string') {
        this.matcher = [matcher];
      } else {
        this.matcher = matcher;
      }
    }
    this.depth = depth;
  }

  public async request(args: RequestArguments) {
    if (this.matcher) {
      if (
        typeof this.matcher === 'function' && this.matcher(args) ||
        Array.isArray(this.matcher) && this.matcher.includes(args.method) ||
        this.matcher instanceof RegExp && this.matcher.test(args.method)
      ) {
        console.dir(args, {
          depth: this.depth,
          colors: true,
          compact: false,
        });
      }
    } else {
      console.dir(args, {
        depth: this.depth,
        colors: true,
        compact: false,
      });
    }

    return this._wrappedProvider.request(args);
  }
}

export const logger = (matcher?: MatcherType) => {
  extendProvider(async (provider: any, network: any) => {
    const newProvider = new LogProvider(provider, matcher);
    return newProvider;
  })
};
