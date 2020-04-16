"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./util/interface");
const helper_1 = require("../helper");
class RazorRefunds extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/refunds');
    }
    get instance() {
        return new RazorRefunds(this.services);
    }
    /**
    * Get all Refunds
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
            url: `${this.resourceUrl}`,
            data: Object.assign(Object.assign({}, query), { from,
                to,
                count,
                skip })
        });
    }
    /**
    * Fetches a refund given Refund ID
    *
    * @param {String} refundId
    *
    * @return {Promise}
    */
    fetch(refundId) {
        if (!refundId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${refundId}`
        });
    }
    /**
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    edit(refundId, notes) {
        if (!refundId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!notes) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Notes'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${refundId}`,
            data: {
                notes: helper_1.normalizeNotes(notes),
            }
        });
    }
}
exports.RazorRefunds = RazorRefunds;
//# sourceMappingURL=refunds.js.map