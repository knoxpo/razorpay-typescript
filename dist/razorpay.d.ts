import { RazorAPI } from './api';
import { RazorCustomers } from './resources/customers';
import { RazorPlans } from './resources/plans';
import { RazorSubscriptions } from './resources/subscriptions';
import { RazorOrders } from './resources/order';
import { RazorPayments, RazorPayment } from './resources/payments';
import { RazorSettlements } from './resources/settlements';
import { RazorRefunds } from './resources/refunds';
import { RazorRoutes } from './resources/routes';
import { RazorVirtualAccounts } from './resources/virtual-accounts';
interface IRazorpayAuthKey {
    key_id: string;
    key_secret: string;
}
interface IRazorpayConfig {
    authKey: IRazorpayAuthKey;
    headers?: any;
    image?: string;
}
interface IRazorQuery {
    from?: number;
    to?: number;
    count?: number;
    skip?: number;
}
interface IRazorSubscriptionQuery extends IRazorQuery {
    plan_id?: number;
}
interface IRazorOrderQuery extends IRazorQuery {
    authorized?: 0 | 1;
    receipt?: string;
}
interface IRazorPaymentQuery extends IRazorQuery {
    expand?: ('emi' | 'card')[];
}
interface IRazorRouteQuery extends IRazorQuery {
    payment_id?: string;
}
interface IRazorSettlementQuery {
    count?: number;
    skip?: number;
}
declare class Razorpay {
    private _config;
    private _authKey;
    private _api;
    constructor(config: IRazorpayConfig);
    static get VERSION(): any;
    protected get TAG(): string;
    get razorAPI(): RazorAPI;
    get config(): IRazorpayConfig;
    get customers(): RazorCustomers;
    get plans(): RazorPlans;
    get subscriptions(): RazorSubscriptions;
    get orders(): RazorOrders;
    get payments(): RazorPayments;
    get settlements(): RazorSettlements;
    get refunds(): RazorRefunds;
    get routes(): RazorRoutes;
    get virtualAccounts(): RazorVirtualAccounts;
}
export { Razorpay, IRazorQuery, IRazorSubscriptionQuery, IRazorOrderQuery, IRazorPaymentQuery, IRazorSettlementQuery, IRazorRouteQuery, IRazorpayConfig, IRazorpayAuthKey, RazorSubscriptions, RazorPlans, RazorCustomers, RazorOrders, RazorPayments, RazorPayment, RazorSettlements, RazorRefunds, RazorRoutes, RazorVirtualAccounts, };
//# sourceMappingURL=razorpay.d.ts.map