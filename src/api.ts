import request = require('request');
import * as rp from 'request-promise';
import { isNonNullObject, IMap } from './helper';

export interface IRazorAPIPayload {
    url: string;
    data?: IMap<any>;
}

export class RazorAPI {
    private allowedHeaders = {
        "X-Razorpay-Account": ""
    };

    private rq: request.RequestAPI<rp.RequestPromise<any>, rp.RequestPromiseOptions, request.RequiredUriUrl>;
    private _options: IMap<any>;

    constructor(options: IMap<any>) {
        this._options = options;
        this.rq = rp.defaults({
            baseUrl: options.hostUrl,
            json: true,
            auth: {
                user: options.key_id,
                pass: options.key_secret
            },
            headers: Object.assign(
                { 'User-Agent': options.ua },
                this.getValidHeaders(options.headers)
            )
        })
    }

    get TAG(): string {
        return `[${new Date().toUTCString()} | ${this.constructor.name}]`;
    }
    
    get options() {
        return this._options;
    }

    async get(params: IRazorAPIPayload) {
        try {
            const res = await this.rq.get({
                url: params.url,
                qs: params.data,
            });
            return res;
        } catch (err) {
            this.normalizeError(err);
        }
    }

    async post(params: IRazorAPIPayload) {
        try {
            const res = await this.rq.post({
                url: params.url,
                qs: params.data,
            });
            return res;
        } catch (err) {
            this.normalizeError(err);
        }
    }

    async put(params: IRazorAPIPayload) {
        try {
            const res = await this.rq.put({
                url: params.url,
                qs: params.data,
            });
            return res;
        } catch (err) {
            this.normalizeError(err);
        }
    }

    async patch(params: IRazorAPIPayload) {
        try {
            const res = await this.rq.patch({
                url: params.url,
                qs: params.data,
            });
            return res;
        } catch (err) {
            this.normalizeError(err);
        }
    }

    async delete(params: IRazorAPIPayload) {
        try {
            const res = await this.rq.delete({
                url: params.url,
            });
            return res;
        } catch (err) {
            this.normalizeError(err);
        }
    }

    private getValidHeaders(headers: IMap<string>) {
        const result: IMap<any> = {};
        if (!isNonNullObject(headers)) {
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

    private normalizeError(err: any) {
        throw {
            statusCode: err.statusCode,
            error: err.error.error
        }
    }
}


