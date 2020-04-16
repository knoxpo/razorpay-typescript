"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./util/interface");
const helper_1 = require("../helper");
class RazorCustomers extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/customers');
    }
    get instance() {
        return new RazorCustomers(this.services);
    }
    create(params) {
        const { notes } = params, rest = __rest(params, ["notes"]);
        const data = Object.assign(rest, helper_1.normalizeNotes(notes));
        return this.api.post({
            url: `${this.resourceUrl}`,
            data
        });
    }
    fetchAll() {
        return this.api.get({
            url: `${this.resourceUrl}`,
        });
    }
    fetch(customerId) {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${customerId}`,
        });
    }
    edit(customerId, params) {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        const { notes } = params, rest = __rest(params, ["notes"]);
        const data = Object.assign(rest, helper_1.normalizeNotes(notes));
        return this.api.put({
            url: `${this.resourceUrl}/${customerId}`,
            data
        });
    }
    fetchTokens(customerId) {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${customerId}/tokens`,
        });
    }
    fetchToken(customerId, tokenId) {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!tokenId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Token ID'));
        }
        return this.api.get({
            url: `${this.resourceUrl}/${customerId}/tokens/${tokenId}`,
        });
    }
    deleteToken(customerId, tokenId) {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!tokenId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Token ID'));
        }
        return this.api.delete({
            url: `${this.resourceUrl}/${customerId}/tokens/${tokenId}`,
        });
    }
}
exports.RazorCustomers = RazorCustomers;
//# sourceMappingURL=customers.js.map