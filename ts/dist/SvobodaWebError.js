"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvobodaWebError = void 0;
class SvobodaWebError extends Error {
    isSvobodaWebError = true;
    sdk = 'SvobodaWeb';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.SvobodaWebError = SvobodaWebError;
//# sourceMappingURL=SvobodaWebError.js.map