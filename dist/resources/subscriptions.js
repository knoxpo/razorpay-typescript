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
class RazorSubscriptions extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/subscriptions');
    }
    get instance() {
        return new RazorSubscriptions(this.services);
    }
    /**
    * Creates a Subscription
    *
    * @param {Object} params
    *  ---
    *  * Mention `notify_info` in params to send subscription link.
    *
    * @return {Promise}
    */
    create(params) {
        if (!params) {
            return Promise.reject("Params is mandatory.");
        }
        const { notes } = params, rest = __rest(params, ["notes"]);
        const data = Object.assign(rest, helper_1.normalizeNotes(notes));
        return this.api.post({
            url: this.resourceUrl,
            data
        });
    }
    /**
    * Get all Subscriptions
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
    * Fetches a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    fetch(subscriptionId) {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${subscriptionId}`
        });
    }
    /**
    * Cancel a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {Boolean} cancelAtCycleEnd
    *
    * @return {Promise}
    */
    cancel(subscriptionId, cancelAtCycleEnd) {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (typeof cancelAtCycleEnd !== "boolean") {
            return Promise.reject("The second parameter, Cancel at the end of cycle" +
                " should be a Boolean");
        }
        return this.api.post(Object.assign({ url: `${this.resourceUrl}/${subscriptionId}/cancel` }, (cancelAtCycleEnd && { data: { cancel_at_cycle_end: 1 } })));
    }
    /**
    * Update a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {IRazorUpdateSubscription} params
    *
    * @return {Promise}
    */
    update(subscriptionId, params) {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!params) {
            return Promise.reject("Params is mandatory.");
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${subscriptionId}`,
            data: params,
        });
    }
    /**
    * Fetches details of a pending update of a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    pendingUpdate(subscriptionId) {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${subscriptionId}/retrieve_scheduled_changes`,
        });
    }
    /**
    * Cancels a pending update of a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    cancelUpdate(subscriptionId) {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.post({
            url: `${this.resourceUrl}/${subscriptionId}/cancel_scheduled_changes`,
        });
    }
    /**
    * Create an add-on to a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {IRazorSubscriptionAddOn} params
    *
    * @return {Promise}
    */
    createAddon(subscriptionId, params) {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!params) {
            return Promise.reject("Params is mandatory.");
        }
        return this.api.post({
            url: `${this.resourceUrl}/${subscriptionId}/addons`,
            data: params,
        });
    }
    /**
    * Fetch all add-ons
    *
    * @param {IRazorQuery} query
    *
    * @return {Promise}
    */
    fetchAllAddons(query = {}) {
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
            url: `/addons`,
            data: Object.assign(Object.assign({}, query), { from,
                to,
                count,
                skip })
        });
    }
    /**
    * Fetch add-on with Add-on ID
    *
    * @param {String} addOnId
    *
    * @return {Promise}
    */
    fetchAddon(addOnId) {
        if (!addOnId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Add-on ID'));
        }
        return this.api.get({
            url: `/addons/${addOnId}`
        });
    }
    /**
    * Delete add-on with Add-on ID
    *
    * @param {String} addOnId
    *
    * @return {Promise}
    */
    deleteAddon(addOnId) {
        if (!addOnId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Add-on ID'));
        }
        return this.api.delete({
            url: `/addons/${addOnId}`
        });
    }
}
exports.RazorSubscriptions = RazorSubscriptions;
//# sourceMappingURL=subscriptions.js.map