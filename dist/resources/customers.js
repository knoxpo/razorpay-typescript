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
    customer(customerId) {
        return new RazorCustomer(this.services, customerId);
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
}
exports.RazorCustomers = RazorCustomers;
class RazorCustomer extends interface_1.RazorResourceInterface {
    constructor(razor, customerId) {
        super(razor, '/customers');
        if (!customerId) {
            throw this.FIELD_MANDATORY_ERROR('Customer ID');
        }
        this._customerId = customerId;
    }
    /**
    * Creates a Address
    *
    * @param {Object} params
    *
    *
    * @return {Promise}
    */
    createAddress(params) {
        const data = params;
        if (data.primary !== undefined && data.primary !== null) {
            data.primary = data.primary ? 1 : 0;
        }
        return this.api.post({
            url: `${this.resourceUrl}/${this._customerId}/addresses`,
            data
        });
    }
    /**
    * Fetch all Addresses
    *
    * @param {Object} params
    *
    *
    * @return {Promise}
    */
    fetchAllAddresses() {
        return this.api.get({
            url: `${this.resourceUrl}/${this._customerId}/addresses`
        });
    }
    /**
    * Get a Address
    *
    * @param {String} addressId
    *
    *
    * @return {Promise}
    */
    fetchAddress(addressId) {
        return this.api.get({
            url: `${this.resourceUrl}/${this._customerId}/addresses/${addressId}`
        });
    }
    /**
    * Delete a Address
    *
    * @param {String} addressId
    *
    *
    * @return {Promise}
    */
    deleteAddress(addressId) {
        return this.api.delete({
            url: `${this.resourceUrl}/${this._customerId}/addresses/${addressId}`
        });
    }
    edit(params) {
        const { notes } = params, rest = __rest(params, ["notes"]);
        const data = Object.assign(rest, helper_1.normalizeNotes(notes));
        return this.api.put({
            url: `${this.resourceUrl}/${this._customerId}`,
            data
        });
    }
    fetchAllTokens() {
        return this.api.get({
            url: `${this.resourceUrl}/${this._customerId}/tokens`,
        });
    }
    fetchToken(tokenId) {
        if (!tokenId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Token ID'));
        }
        return this.api.get({
            url: `${this.resourceUrl}/${this._customerId}/tokens/${tokenId}`,
        });
    }
    deleteToken(tokenId) {
        if (!tokenId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Token ID'));
        }
        return this.api.delete({
            url: `${this.resourceUrl}/${this._customerId}/tokens/${tokenId}`,
        });
    }
}
exports.RazorCustomer = RazorCustomer;
//# sourceMappingURL=customers.js.map