"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./util/interface");
const helper_1 = require("../helper");
class RazorSettlements extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/settlements');
    }
    get instance() {
        return new RazorSettlements(this.services);
    }
    /**
    * Get all Settlements
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
    * Fetches a settlement given Settlement ID
    *
    * @param {String} settlementId
    *
    * @return {Promise}
    */
    fetch(settlementId) {
        if (!settlementId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${settlementId}`
        });
    }
    /**
    * Fetches a settlement given Settlement ID
    *
    * @param {String} settlementId
    *
    * @return {Promise}
    */
    recon(year, month, day, query = {}) {
        let { count, skip } = query;
        if (!year) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Year'));
        }
        if (!month) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Month'));
        }
        if (!day) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Day'));
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return this.api.get({
            url: `${this.resourceUrl}/recon/combined`,
            data: {
                year,
                month,
                day,
            }
        });
    }
}
exports.RazorSettlements = RazorSettlements;
//# sourceMappingURL=settlements.js.map