"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const customers_1 = require("./resources/customers");
exports.RazorCustomers = customers_1.RazorCustomers;
const plans_1 = require("./resources/plans");
exports.RazorPlans = plans_1.RazorPlans;
const subscriptions_1 = require("./resources/subscriptions");
exports.RazorSubscriptions = subscriptions_1.RazorSubscriptions;
const order_1 = require("./resources/order");
exports.RazorOrders = order_1.RazorOrders;
const payments_1 = require("./resources/payments");
exports.RazorPayments = payments_1.RazorPayments;
exports.RazorPayment = payments_1.RazorPayment;
const settlements_1 = require("./resources/settlements");
exports.RazorSettlements = settlements_1.RazorSettlements;
const refunds_1 = require("./resources/refunds");
exports.RazorRefunds = refunds_1.RazorRefunds;
const routes_1 = require("./resources/routes");
exports.RazorRoutes = routes_1.RazorRoutes;
const virtual_accounts_1 = require("./resources/virtual-accounts");
exports.RazorVirtualAccounts = virtual_accounts_1.RazorVirtualAccounts;
const items_1 = require("./resources/items");
exports.RazorItems = items_1.RazorItems;
const invoices_1 = require("./resources/invoices");
exports.RazorInvoices = invoices_1.RazorInvoices;
const pkg = require('../package.json');
class Razorpay {
    constructor(config) {
        this._config = {
            authKey: {
                key_id: '',
                key_secret: '',
            }
        };
        this._authKey = {
            key_id: '',
            key_secret: '',
        };
        const { authKey, headers } = config;
        if (!authKey) {
            throw new Error('`authKey` is mandatory');
        }
        if (authKey && !authKey.key_id) {
            throw new Error('`key_id` is mandatory');
        }
        if (authKey && !authKey.key_secret) {
            throw new Error('`key_secret` is mandatory');
        }
        this._authKey = authKey;
        this._config.authKey = authKey;
        if (headers) {
            this._config.headers = headers;
        }
        this._api = new api_1.RazorAPI({
            hostUrl: 'https://api.razorpay.com/v1/',
            ua: `razorpay-node@${Razorpay.VERSION}`,
            key_id: this._authKey.key_id,
            key_secret: this._authKey.key_secret,
            headers
        });
    }
    static get VERSION() { return pkg.version; }
    ;
    get TAG() {
        return `[${new Date().toUTCString()} | ${this.constructor.name}]`;
    }
    get razorAPI() {
        return this._api;
    }
    get config() {
        return this._config;
    }
    get customers() {
        return new customers_1.RazorCustomers(this);
    }
    get items() {
        return new items_1.RazorItems(this);
    }
    get invoices() {
        return new invoices_1.RazorInvoices(this);
    }
    get plans() {
        return new plans_1.RazorPlans(this);
    }
    get subscriptions() {
        return new subscriptions_1.RazorSubscriptions(this);
    }
    get orders() {
        return new order_1.RazorOrders(this);
    }
    get payments() {
        return new payments_1.RazorPayments(this);
    }
    get settlements() {
        return new settlements_1.RazorSettlements(this);
    }
    get refunds() {
        return new refunds_1.RazorRefunds(this);
    }
    get routes() {
        return new routes_1.RazorRoutes(this);
    }
    get virtualAccounts() {
        return new virtual_accounts_1.RazorVirtualAccounts(this);
    }
}
exports.Razorpay = Razorpay;
//# sourceMappingURL=razorpay.js.map