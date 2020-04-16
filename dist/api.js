"use strict";
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
    async get(params) {
        try {
            const res = await this.rq.get({
                url: params.url,
                qs: params.data,
            });
            return res;
        }
        catch (err) {
            this.normalizeError(err);
        }
    }
    async post(params) {
        try {
            const res = await this.rq.post({
                url: params.url,
                qs: params.data,
            });
            return res;
        }
        catch (err) {
            this.normalizeError(err);
        }
    }
    async put(params) {
        try {
            const res = await this.rq.put({
                url: params.url,
                qs: params.data,
            });
            return res;
        }
        catch (err) {
            this.normalizeError(err);
        }
    }
    async patch(params) {
        try {
            const res = await this.rq.patch({
                url: params.url,
                qs: params.data,
            });
            return res;
        }
        catch (err) {
            this.normalizeError(err);
        }
    }
    async delete(params) {
        try {
            const res = await this.rq.delete({
                url: params.url,
            });
            return res;
        }
        catch (err) {
            this.normalizeError(err);
        }
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