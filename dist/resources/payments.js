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
class RazorPayments extends interface_1.RazorResourceInterface {
    constructor(razor) {
        super(razor, '/payments');
    }
    get instance() {
        return new RazorPayments(this.services);
    }
    /**
    * Perform some essential action to a payment
    *
    * @param {String} paymentId
    * @param {String} amount
    * @param {String} currency
    *
    * @return {Promise}
    */
    payment(paymentId) {
        return new RazorPayment(this.services, paymentId);
    }
    /**
    * Capture payment
    *
    * @param {String} paymentId
    * @param {String} amount
    * @param {String} currency
    *
    * @return {Promise}
    */
    capture(paymentId, amount, currency) {
        if (!paymentId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Payment ID'));
        }
        if (!amount) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Amount'));
        }
        if (!currency) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Currency'));
        }
        return this.api.post({
            url: `${this.resourceUrl}/${paymentId}/capture`,
            data: {
                amount: amount.toString(),
                currency,
            }
        });
    }
    /**
    * Fetches a order given Payment ID
    *
    * @param {String} paymentId
    * @param {('card' | 'emi')[]} expand
    *
    * @return {Promise}
    */
    fetch(paymentId, expand) {
        if (!paymentId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Payment ID'));
        }
        const payload = {};
        if (expand) {
            for (const e of expand) {
                if (e !== 'card' && e !== 'emi') {
                    return Promise.reject(`\`expand[]\` value can contain either \`card\` or \`emi\`. But found "${e}" as one of the array value.`);
                }
            }
            payload.expand = expand;
        }
        return this.api.get({
            url: `${this.resourceUrl}/${paymentId}`,
            data: payload
        });
    }
    /**
    * Get all Payments
    *
    * @param {Object} query
    *
    * @return {Promise}
    */
    fetchAll(query = {}) {
        let { from, to, count, skip, expand } = query;
        if (from) {
            from = helper_1.normalizeDate(from);
        }
        if (to) {
            to = helper_1.normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        if (expand) {
            for (const e of expand) {
                if (e !== 'card' && e !== 'emi') {
                    return Promise.reject(`\`expand[]\` value can contain either \`card\` or \`emi\`. But found "${e}" as one of the array value.`);
                }
            }
            expand = expand;
        }
        return this.api.get({
            url: this.resourceUrl,
            data: Object.assign(Object.assign({}, query), { from,
                to,
                count,
                skip })
        });
    }
    /**
    * Get all Payments of an order with Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    orderPayments(orderId) {
        if (!orderId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Order ID'));
        }
        return this.api.get({
            url: `/orders/${orderId}${this.resourceUrl}`,
        });
    }
}
exports.RazorPayments = RazorPayments;
class RazorPayment extends interface_1.RazorResourceInterface {
    constructor(razor, paymentId) {
        super(razor, '/payments');
        if (!paymentId) {
            throw this.FIELD_MANDATORY_ERROR('Payment ID');
        }
        this._paymentId = paymentId;
    }
    /**
    * Creates a Refunds
    *
    * @param {Object} params
    *
    * set the ``reverse_all`` parameter to `1` for refunding all related payment transfers.
    *
    * @return {Promise}
    */
    refund(params = {}) {
        const { notes } = params, rest = __rest(params, ["notes"]);
        const data = Object.assign(rest, helper_1.normalizeNotes(notes));
        if (!data.speed) {
            data.speed = 'normal';
        }
        if (data.amount) {
            data.amount = Number(data.amount);
        }
        return this.api.post({
            url: `${this.resourceUrl}/${this._paymentId}/refund`,
            data
        });
    }
    /**
    * Get all Refunds
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAllRefunds(query = {}) {
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
            url: `${this.resourceUrl}/${this._paymentId}/refunds`,
            data: Object.assign(Object.assign({}, query), { from,
                to,
                count,
                skip })
        });
    }
    /**
    * Fetches a refund given Refund ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    fetchRefund(refundId) {
        if (!refundId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Refund ID'));
        }
        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/refunds/${refundId}`
        });
    }
    /**
    * Update a payment's notes with given Payment ID
    *
    * @param {IMap<string>} notes
    *
    * @return {Promise}
    */
    edit(notes) {
        if (!notes) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Notes'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${this._paymentId}`,
            data: {
                notes: helper_1.normalizeNotes(notes),
            },
        });
    }
    /**
    * Transfer funds to accounts from payment
    *
    * @param {IMap<string>} notes
    *
    * @return {Promise}
    */
    transfer(transfers) {
        const payload = {
            transfers: [],
        };
        if (!transfers || (transfers && transfers.length === 0)) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('transfers'));
        }
        for (const transfer of transfers) {
            transfer.on_hold = helper_1.normalizeBoolean(!!transfer.on_hold);
            payload.transfers.push(transfer);
        }
        return this.api.post({
            url: `${this.resourceUrl}/${this._paymentId}/transfers`,
            data: payload,
        });
    }
    /**
    * Get all Transfers
    *
    * @param {Object} query
    *
    * @return {Promise}
    */
    fetchAllTransfer(query = {}) {
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
            url: `${this.resourceUrl}/${this._paymentId}/transfers`,
            data: Object.assign(Object.assign({}, query), { from,
                to,
                count,
                skip })
        });
    }
    /**
    * Get Fetch Payment Details of the Card of the Payment
    *
    * @return {Promise}
    */
    card() {
        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/card`,
        });
    }
    /**
    * Get Fetch Payment Details of the Bank of the Payment
    *
    * @return {Promise}
    */
    bankTransfer() {
        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/bank_transfer`,
        });
    }
    /**
    * Get Fetch Payment Details of the UPI of the Payment
    *
    * @return {Promise}
    */
    upiTransfer() {
        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/upi_transfer`,
        });
    }
}
exports.RazorPayment = RazorPayment;
//# sourceMappingURL=payments.js.map