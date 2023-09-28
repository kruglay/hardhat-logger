"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const config_1 = require("hardhat/config");
const plugins_1 = require("hardhat/plugins");
class LogProvider extends plugins_1.ProviderWrapper {
    constructor(_wrappedProvider, matcher, depth = 3) {
        super(_wrappedProvider);
        this._wrappedProvider = _wrappedProvider;
        this.matcher = matcher;
        this.depth = depth;
        if (matcher) {
            if (typeof matcher === 'string') {
                this.matcher = [matcher];
            }
            else {
                this.matcher = matcher;
            }
        }
        this.depth = depth;
    }
    async request(args) {
        if (this.matcher) {
            if (typeof this.matcher === 'function' && this.matcher(args) ||
                Array.isArray(this.matcher) && this.matcher.includes(args.method) ||
                this.matcher instanceof RegExp && this.matcher.test(args.method)) {
                console.dir(args, {
                    depth: this.depth,
                    colors: true,
                    compact: false,
                });
            }
        }
        else {
            console.dir(args, {
                depth: this.depth,
                colors: true,
                compact: false,
            });
        }
        return this._wrappedProvider.request(args);
    }
}
const logger = (matcher) => {
    (0, config_1.extendProvider)(async (provider, network) => {
        const newProvider = new LogProvider(provider, matcher);
        return newProvider;
    });
};
exports.logger = logger;
