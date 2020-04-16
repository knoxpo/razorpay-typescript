"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./util/interface");
const helper_1 = require("../helper");
class RazorItems extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/items');
    }
    get instance() {
        return new RazorItems(this.services);
    }
    /**
    * Creates a item
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params) {
        const { name, amount, currency } = params;
        if (!name) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Name'));
        }
        if (!amount) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Amount'));
        }
        if (!currency) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Currency'));
        }
        return this.api.post({
            url: this.resourceUrl,
            data: params,
        });
    }
    /**
    * Get all Items
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
    * Fetches a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    fetch(itemId) {
        if (!itemId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${itemId}`
        });
    }
    /**
    * Edit a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    edit(itemId, params) {
        if (!itemId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!params) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Params'));
        }
        if (params.active) {
            params.active = helper_1.normalizeBoolean(!!params.active);
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${itemId}`,
            data: params,
        });
    }
    /**
    * Delete a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    delete(itemId) {
        if (!itemId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.delete({
            url: `${this.resourceUrl}/${itemId}`
        });
    }
}
exports.RazorItems = RazorItems;
//# sourceMappingURL=items.js.map