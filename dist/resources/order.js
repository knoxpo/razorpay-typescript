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
class RazorOrders extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/orders');
    }
    get instance() {
        return new RazorOrders(this.services);
    }
    /**
    * Creates a order
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params) {
        const { notes } = params, rest = __rest(params, ["notes"]);
        const data = Object.assign(rest, helper_1.normalizeNotes(notes));
        return this.api.post({
            url: this.resourceUrl,
            data
        });
    }
    /**
    * Get all Orders
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query = {}) {
        let { from, to, count, skip } = query;
        if (from) {
            from = helper_1.normalizeDate(from);
        }
        if (to) {
            to = helper_1.normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return this.api.get({
            url: this.resourceUrl,
            data: Object.assign(Object.assign({}, query), { from,
                to,
                count,
                skip })
        });
    }
    /**
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    fetch(orderId) {
        if (!orderId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${orderId}`
        });
    }
    /**
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    edit(orderId, notes) {
        if (!orderId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!notes) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Notes'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${orderId}`,
            data: {
                notes: helper_1.normalizeNotes(notes),
            }
        });
    }
}
exports.RazorOrders = RazorOrders;
//# sourceMappingURL=order.js.map