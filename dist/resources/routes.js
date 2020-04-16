"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./util/interface");
const helper_1 = require("../helper");
class RazorRoutes extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/transfers');
    }
    get instance() {
        return new RazorRoutes(this.services);
    }
    /**
    * Creates a transfer
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    transfer(params) {
        if (!params) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Params'));
        }
        if (!params.account) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Account'));
        }
        if (!params.currency) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Currency'));
        }
        if (!params.amount) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Amount'));
        }
        const payload = params;
        payload.amount = Number(payload.amount);
        payload.on_hold = helper_1.normalizeBoolean(!!payload.on_hold);
        return this.api.post({
            url: `${this.resourceUrl}`,
            data: payload,
        });
    }
    /**
    * Reversal a transfer
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    reversal(transferId, params) {
        if (!transferId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Transfer Id'));
        }
        return this.api.post(Object.assign({ url: `${this.resourceUrl}/${transferId}/reversals` }, (!!params ? { data: params } : { data: {} })));
    }
    /**
    * Fetches a route given Route ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
    fetch(transferId) {
        if (!transferId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${transferId}`
        });
    }
    /**
    * Get all Transfers
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
    * Hold a transfer given Route ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
    hold(transferId, onHold) {
        if (!transferId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (onHold !== undefined) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('onHold'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${transferId}`,
            data: {
                on_hold: helper_1.normalizeBoolean(!!onHold),
            },
        });
    }
    /**
    * Update a transfer given Transfer ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
    edit(transferId, notes) {
        if (!transferId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!notes) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Notes'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${transferId}`,
            data: {
                notes: helper_1.normalizeNotes(notes),
            }
        });
    }
}
exports.RazorRoutes = RazorRoutes;
//# sourceMappingURL=routes.js.map