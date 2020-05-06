import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorPaymentQuery, IRazorQuery } from "../razorpay";
import { normalizeNotes, normalizeDate, IMap, normalizeBoolean } from "../helper";
import { IRazorRefundId, IRazorRefund } from "./refunds";
import { IRazorTransfer, IRazorTransferId } from "./routes";
import { IRazorBankTransferId, IRazorUpiTransferId } from "./virtual-accounts";

export interface IRazorPayment {
    entity?: 'payment';
    amount: number;
    currency: string;
    base_amount?: string;
    base_currency?: string;
    method?: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi';
    order_id?: string;
    description?: string;
    international?: boolean;
    refund_status?: 'null' | 'partial' | 'full';
    amount_refunded?: number;
    captured?: boolean;
    email?: string;
    contact?: string;
    tax?: number;
    notes?: { [key: string]: string; };
    invoice_id?: string | null;
    card_id?: string | null;
    bank?: string | null;
    wallet?: string | null;
    vpa?: string | null;
    customer_id?: string | null;
    token_id?: string | null;
}

export interface IRazorPaymentId extends IRazorPayment {
    id: string;
    status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
    fee: number;
    error_code: string;
    error_description: string;
    created_at: number;
}

export interface IRazorPaymentCardId {
    id: string;
    entity: string;
    name: string;
    last4: string;
    network: 'American Express' | 'Diners Club' | 'Maestro' | 'MasterCard' | 'RuPay' | 'Unknown' | 'Visa';
    type: 'Credit' | 'Debit' | 'Unknown';
    issuer: string;
    international: boolean;
    emi: boolean;
}

export interface CIRazorPayments {
    payment(paymentId: string): RazorPayment;
    capture(paymentId: string, amount: number, currency: string): Promise<IRazorPaymentId>;
    fetch(paymentId: string, expand?: ('card' | 'emi')[]): Promise<IRazorPaymentId>;
    fetchAll(query?: IRazorPaymentQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorPaymentId[];
    }>;
    orderPayments(orderId: string): Promise<{
        entity: string;
        count: number;
        items: IRazorPaymentId[];
    }>;
}


export class RazorPayments extends RazorResourceInterface implements CIRazorPayments {

    constructor(razor: Razorpay) {
        super(razor, '/payments');
    }

    get instance(): RazorPayments {
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
    payment(paymentId: string): RazorPayment {
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
    capture(paymentId: string, amount: number, currency: string): Promise<IRazorPaymentId> {
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
    fetch(paymentId: string, expand?: ('card' | 'emi')[]): Promise<IRazorPaymentId> {
        if (!paymentId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Payment ID'));
        }
        const payload: IMap<any> = {};
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
    fetchAll(query: IRazorPaymentQuery = {}): Promise<{ entity: string; count: number; items: IRazorPaymentId[]; }> {
        let { from, to, count, skip, expand } = query;

        if (from) {
            from = normalizeDate(from);
        }

        if (to) {
            to = normalizeDate(to);
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
            data: {
                ...query,
                from,
                to,
                count,
                skip
            }
        });
    }

    /**
    * Get all Payments of an order with Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    orderPayments(orderId: string): Promise<{ entity: string; count: number; items: IRazorPaymentId[]; }> {
        if (!orderId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Order ID'));
        }
        return this.api.get({
            url: `/orders/${orderId}${this.resourceUrl}`,
        });
    }

}

export interface CIRazorPayment {
    refund(params: IRazorRefund): Promise<IRazorRefundId>;
    fetchAllRefunds(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorRefundId[];
    }>;
    fetchRefund(refundId: string): Promise<IRazorRefundId>;
    edit(notes: IMap<string>): Promise<IRazorPaymentId>;
    transfer(transfers: IRazorTransfer[]): Promise<{
        entity: string;
        count: number;
        items: IRazorTransferId[];
    }>;
    fetchAllTransfer(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorTransferId[];
    }>;
    card(): Promise<IRazorPaymentCardId>;
    bankTransfer(): Promise<IRazorBankTransferId>;
    upiTransfer(): Promise<IRazorUpiTransferId>;
}

export class RazorPayment extends RazorResourceInterface implements CIRazorPayment {

    private _paymentId: string;

    constructor(razor: Razorpay, paymentId: string) {
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
    refund(params: IRazorRefund = {}): Promise<IRazorRefundId> {
        const { notes, ...rest } = params;
        const data = Object.assign(rest, normalizeNotes(notes));
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
    fetchAllRefunds(query: IRazorQuery = {}): Promise<{ entity: string; count: number; items: IRazorRefundId[]; }> {
        let { from, to, count, skip } = query;

        if (from) {
            from = normalizeDate(from)
        }

        if (to) {
            to = normalizeDate(to)
        }

        count = Number(count) || 10
        skip = Number(skip) || 0

        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/refunds`,
            data: {
                ...query,
                from,
                to,
                count,
                skip
            }
        });
    }

    /**
    * Fetches a refund given Refund ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    fetchRefund(refundId: string): Promise<IRazorRefundId> {
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
    edit(notes: IMap<string>): Promise<IRazorPaymentId> {
        if (!notes) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Notes'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${this._paymentId}`,
            data: {
                notes: normalizeNotes(notes),
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
    transfer(transfers: IRazorTransfer[]): Promise<{ entity: string; count: number; items: IRazorTransferId[]; }> {
        const payload: { transfers: IRazorTransfer[]; } = {
            transfers: [],
        };
        if (!transfers || (transfers && transfers.length === 0)) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('transfers'));
        }
        for (const transfer of transfers) {
            transfer.on_hold = normalizeBoolean(!!transfer.on_hold);
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
    fetchAllTransfer(query: IRazorQuery = {}): Promise<{ entity: string; count: number; items: IRazorTransferId[]; }> {
        let { from, to, count, skip } = query;

        if (from) {
            from = normalizeDate(from)
        }

        if (to) {
            to = normalizeDate(to)
        }

        count = Number(count) || 10
        skip = Number(skip) || 0

        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/transfers`,
            data: {
                ...query,
                from,
                to,
                count,
                skip
            }
        });
    }


    /**
    * Get Fetch Payment Details of the Card of the Payment
    *
    * @return {Promise}
    */
    card(): Promise<IRazorPaymentCardId> {
        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/card`,
        });
    }

    /**
    * Get Fetch Payment Details of the Bank of the Payment
    *
    * @return {Promise}
    */
    bankTransfer(): Promise<IRazorBankTransferId> {
        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/bank_transfer`,
        });
    }
    /**
    * Get Fetch Payment Details of the UPI of the Payment
    *
    * @return {Promise}
    */
    upiTransfer(): Promise<IRazorUpiTransferId> {
        return this.api.get({
            url: `${this.resourceUrl}/${this._paymentId}/upi_transfer`,
        });
    }

}

