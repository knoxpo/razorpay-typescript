"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./util/interface");
const helper_1 = require("../helper");
class RazorInvoices extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/invoices');
    }
    get instance() {
        return new RazorInvoices(this.services);
    }
    /**
    * Creates a invoice
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params) {
        const { line_items, customer_id, customer, } = params;
        if (!customer_id && !customer) {
            return Promise.reject("Ether `customer_id` or `customer` must be provided but found none.");
        }
        if (!line_items || (line_items === null || line_items === void 0 ? void 0 : line_items.length) === 0) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('line_items'));
        }
        for (const { item_id, name, amount } of line_items) {
            if (!item_id && !name) {
                return Promise.reject("Ether `item_id` or `name` must be provided but found none.");
            }
            if (!item_id && !amount) {
                return Promise.reject("Ether `item_id` or `amount` must be provided but found none.");
            }
        }
        return this.api.post({
            url: this.resourceUrl,
            data: Object.assign({ type: 'invoice' }, params),
        });
    }
    /**
    * Get all Invoices
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
    * Fetches a invoice given Invoice ID
    *
    * @param {String} invoiceId
    *
    * @return {Promise}
    */
    fetch(invoiceId) {
        if (!invoiceId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${invoiceId}`
        });
    }
    /**
    * Edit a invoice given Invoice ID
    *
    * @param {String} invoiceId
    *
    * @return {Promise}
    */
    cancel(invoiceId) {
        if (!invoiceId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.post({
            url: `${this.resourceUrl}/${invoiceId}/cancel`,
        });
    }
    /**
    * Edit a invoice given Invoice ID
    *
    * @param {String} invoiceId
    *
    * @return {Promise}
    */
    edit(invoiceId, params) {
        if (!invoiceId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!params) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Params'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${invoiceId}`,
            data: params,
        });
    }
    /**
    * notify a invoice given Invoice ID
    *
    * @param {String} invoiceId
    * @param {String} medium
    *
    * @return {Promise}
    */
    notify(invoiceId, medium) {
        if (!invoiceId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.post({
            url: `${this.resourceUrl}/${invoiceId}/notify_by/${medium}`
        });
    }
}
exports.RazorInvoices = RazorInvoices;
//# sourceMappingURL=invoices.js.map