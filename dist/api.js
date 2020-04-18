"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const helper_1 = require("./helper");
class RazorAPI {
    constructor(options) {
        this.allowedHeaders = {
            "X-Razorpay-Account": ""
        };
        this._options = options;
        this.rq = rp.defaults({
            baseUrl: options.hostUrl,
            json: true,
            auth: {
                user: options.key_id,
                pass: options.key_secret
            },
            headers: Object.assign({ 'User-Agent': options.ua }, this.getValidHeaders(options.headers))
        });
    }
    get TAG() {
        return `[${new Date().toUTCString()} | ${this.constructor.name}]`;
    }
    get options() {
        return this._options;
    }
    get(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.rq.get({
                    url: params.url,
                    qs: params.data,
                });
                return res;
            }
            catch (err) {
                this.normalizeError(err);
            }
        });
    }
    post(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.rq.post({
                    url: params.url,
                    qs: params.data,
                });
                return res;
            }
            catch (err) {
                this.normalizeError(err);
            }
        });
    }
    put(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.rq.put({
                    url: params.url,
                    qs: params.data,
                });
                return res;
            }
            catch (err) {
                this.normalizeError(err);
            }
        });
    }
    patch(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.rq.patch({
                    url: params.url,
                    qs: params.data,
                });
                return res;
            }
            catch (err) {
                this.normalizeError(err);
            }
        });
    }
    delete(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.rq.delete({
                    url: params.url,
                });
                return res;
            }
            catch (err) {
                this.normalizeError(err);
            }
        });
    }
    getValidHeaders(headers) {
        const result = {};
        if (!helper_1.isNonNullObject(headers)) {
            return result;
        }
        // tslint:disable-next-line: no-shadowed-variable
        return Object.keys(headers).reduce((result, headerName) => {
            if (this.allowedHeaders.hasOwnProperty(headerName)) {
                result[headerName] = headers[headerName];
            }
            return result;
        }, result);
    }
    normalizeError(err) {
        throw {
            statusCode: err.statusCode,
            error: err.error.error
        };
    }
}
exports.RazorAPI = RazorAPI;
//# sourceMappingURL=api.js.map