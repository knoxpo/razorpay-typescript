"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = require("../../razorpay");
class RazorResourceInterface {
    constructor(instance, resourceUrl) {
        if (!instance) {
            throw new Error('`api` is mandatory');
        }
        this._razor = instance;
        this._resourceUrl = resourceUrl;
    }
    get resourceUrl() {
        return this._resourceUrl;
    }
    get api() {
        return this._razor.razorAPI;
    }
    get TAG() {
        return `[${new Date().toUTCString()} | ${this.constructor.name}]`;
    }
    get MISSING_ID_ERROR() {
        return `${this.resourceUrl.split('/')[0]} ID is mandatory`;
    }
    FIELD_MANDATORY_ERROR(field) {
        return `${field} is mandatory`;
    }
    get services() {
        return new razorpay_1.Razorpay(this._razor.config);
    }
}
exports.RazorResourceInterface = RazorResourceInterface;
//# sourceMappingURL=interface.js.map