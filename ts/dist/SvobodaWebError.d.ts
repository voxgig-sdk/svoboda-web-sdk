import { Context } from './Context';
declare class SvobodaWebError extends Error {
    isSvobodaWebError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { SvobodaWebError };
