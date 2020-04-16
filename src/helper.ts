export interface IMap<V> { [key: string]: V; }

export const getDateInSecs = (date: number) => {
    return (+new Date(date)) / 1000
}

export const normalizeDate = (date: number) => {
    return isNumber(date) ? date : getDateInSecs(date);
}

export const isNumber = (num: number) => {
    return !isNaN(Number(num))
}

export const isNonNullObject = (input: {}) => {
    return !!input && typeof input === "object" && !Array.isArray(input);
}

export const normalizeBoolean = (bool: boolean) => {
    if (bool === undefined) {
        return bool
    }
    return bool ? 1 : 0
}

export const isDefined = (value: any) => {
    return typeof value !== "undefined";
}

export const normalizeNotes = (notes: IMap<any> = {}) => {
    const normalizedNotes: IMap<any> = {};
    for (const key in notes) {
        normalizedNotes[`notes[${key}]`] = notes[key];
    }
    return normalizedNotes
}

/*
 * given an object , returns prettified string
 *
 * @param {Object} val
 * @return {String}
 */
export const prettify = (val: IMap<any>) => {
    return JSON.stringify(val, null, 2);
}

/*
 * @param {String} summary
 * @param {*} expectedVal
 * @param {*} gotVal
 *
 * @return {Error}
 */
export const getTestError = (summary: string, expectedVal: any, gotVal: any) => {
    return new Error(
        `\n${summary}\n` +
        `Expected(${typeof expectedVal})\n${prettify(expectedVal)}\n\n` +
        `Got(${typeof gotVal})\n${prettify(gotVal)}`
    );
}

/*
 * Verifies webhook signature
 *
 * @param {String} summary
 * @param {String} signature
 * @param {String} secret
 *
 * @return {Boolean}
 */
export const validateWebhookSignature = (body: string, signature: string, secret: string) => {

    const crypto = require("crypto");

    if (!isDefined(body) ||
        !isDefined(signature) ||
        !isDefined(secret)) {

        throw Error(
            "Invalid Parameters: Please give request body," +
            "signature sent in X-Razorpay-Signature header and " +
            "webhook secret from dashboard as parameters"
        );
    }

    const _body = body.toString();

    const expectedSignature = crypto.createHmac('sha256', secret)
        .update(_body)
        .digest('hex');

    return expectedSignature === signature;
};
