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
const pkg = require('../package.json');
// const cors = require('cors')({ origin: true });
// const request = require("request");

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



class Razorpay {
    
    private _config: IRazorpayConfig = {
        authKey: {
            key_id: '',
            key_secret: '',
        }
    }
    private _authKey: IRazorpayAuthKey = {
        key_id: '',
        key_secret: '',
    };

    private _api: RazorAPI;


    constructor(config: IRazorpayConfig) {
        const { authKey, headers } = config;

        if (!authKey) {
            throw new Error('`authKey` is mandatory')
        }

        if (authKey && !authKey.key_id) {
            throw new Error('`key_id` is mandatory')
        }

        if (authKey && !authKey.key_secret) {
            throw new Error('`key_secret` is mandatory')
        }

        this._authKey.key_id = authKey.key_id;
        this._authKey.key_secret = authKey.key_secret;

        this._api = new RazorAPI({
            hostUrl: 'https://api.razorpay.com/v1/',
            ua: `razorpay-node@${Razorpay.VERSION}`,
            key_id: this._authKey.key_id,
            key_secret: this._authKey.key_secret,
            headers
        });
    }

    static get VERSION() { return pkg.version; };

    protected get TAG(): string {
        return `[${new Date().toUTCString()} | ${this.constructor.name}]`;
    }

    get razorAPI() {
        return this._api;
    }

    get config() {
        return this._config;
    }

    get customers(): RazorCustomers {
        return new RazorCustomers(this);
    }

    get plans(): RazorPlans {
        return new RazorPlans(this);
    }

    get subscriptions(): RazorSubscriptions {
        return new RazorSubscriptions(this);
    }

    get orders(): RazorOrders {
        return new RazorOrders(this);
    }
    
    get payments(): RazorPayments {
        return new RazorPayments(this);
    }

    get settlements(): RazorSettlements {
        return new RazorSettlements(this);
    }

    get refunds(): RazorRefunds {
        return new RazorRefunds(this);
    }

    get routes(): RazorRoutes {
        return new RazorRoutes(this);
    }

    get virtualAccounts(): RazorVirtualAccounts {
        return new RazorVirtualAccounts(this);
    }

}

export {
    Razorpay,
    IRazorQuery,
    IRazorSubscriptionQuery,
    IRazorOrderQuery,
    IRazorPaymentQuery,
    IRazorSettlementQuery,
    IRazorRouteQuery,
    IRazorpayConfig,
    IRazorpayAuthKey,
    RazorSubscriptions,
    RazorPlans,
    RazorCustomers,
    RazorOrders,
    RazorPayments,
    RazorPayment,
    RazorSettlements,
    RazorRefunds,
    RazorRoutes,
    RazorVirtualAccounts,
};