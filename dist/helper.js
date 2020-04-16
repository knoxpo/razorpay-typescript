"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateInSecs = (date) => {
    return (+new Date(date)) / 1000;
};
exports.normalizeDate = (date) => {
    return exports.isNumber(date) ? date : exports.getDateInSecs(date);
};
exports.isNumber = (num) => {
    return !isNaN(Number(num));
};
exports.isNonNullObject = (input) => {
    return !!input && typeof input === "object" && !Array.isArray(input);
};
exports.normalizeBoolean = (bool) => {
    if (bool === undefined) {
        return bool;
    }
    return bool ? 1 : 0;
};
exports.isDefined = (value) => {
    return typeof value !== "undefined";
};
exports.normalizeNotes = (notes = {}) => {
    const normalizedNotes = {};
    for (const key in notes) {
        normalizedNotes[`notes[${key}]`] = notes[key];
    }
    return normalizedNotes;
};
/*
 * given an object , returns prettified string
 *
 * @param {Object} val
 * @return {String}
 */
exports.prettify = (val) => {
    return JSON.stringify(val, null, 2);
};
/*
 * @param {String} summary
 * @param {*} expectedVal
 * @param {*} gotVal
 *
 * @return {Error}
 */
exports.getTestError = (summary, expectedVal, gotVal) => {
    return new Error(`\n${summary}\n` +
        `Expected(${typeof expectedVal})\n${exports.prettify(expectedVal)}\n\n` +
        `Got(${typeof gotVal})\n${exports.prettify(gotVal)}`);
};
/*
 * Verifies webhook signature
 *
 * @param {String} summary
 * @param {String} signature
 * @param {String} secret
 *
 * @return {Boolean}
 */
exports.validateWebhookSignature = (body, signature, secret) => {
    const crypto = require("crypto");
    if (!exports.isDefined(body) ||
        !exports.isDefined(signature) ||
        !exports.isDefined(secret)) {
        throw Error("Invalid Parameters: Please give request body," +
            "signature sent in X-Razorpay-Signature header and " +
            "webhook secret from dashboard as parameters");
    }
    const _body = body.toString();
    const expectedSignature = crypto.createHmac('sha256', secret)
        .update(_body)
        .digest('hex');
    return expectedSignature === signature;
};
//# sourceMappingURL=helper.js.map