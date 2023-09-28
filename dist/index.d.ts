export type MatcherType = string | string[] | RegExp | ((args: {
    method: string;
    params?: unknown[] | object;
}) => boolean);
export declare const logger: (matcher?: MatcherType) => void;
