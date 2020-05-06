import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorPaymentQuery, IRazorQuery } from "../razorpay";
import { IMap } from "../helper";
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
    notes?: {
        [key: string]: string;
    };
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
export declare class RazorPayments extends RazorResourceInterface implements CIRazorPayments {
    constructor(razor: Razorpay);
    get instance(): RazorPayments;
    /**
    * Perform some essential action to a payment
    *
    * @param {String} paymentId
    * @param {String} amount
    * @param {String} currency
    *
    * @return {Promise}
    */
    payment(paymentId: string): RazorPayment;
    /**
    * Capture payment
    *
    * @param {String} paymentId
    * @param {String} amount
    * @param {String} currency
    *
    * @return {Promise}
    */
    capture(paymentId: string, amount: number, currency: string): Promise<IRazorPaymentId>;
    /**
    * Fetches a order given Payment ID
    *
    * @param {String} paymentId
    * @param {('card' | 'emi')[]} expand
    *
    * @return {Promise}
    */
    fetch(paymentId: string, expand?: ('card' | 'emi')[]): Promise<IRazorPaymentId>;
    /**
    * Get all Payments
    *
    * @param {Object} query
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorPaymentQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorPaymentId[];
    }>;
    /**
    * Get all Payments of an order with Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    orderPayments(orderId: string): Promise<{
        entity: string;
        count: number;
        items: IRazorPaymentId[];
    }>;
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
export declare class RazorPayment extends RazorResourceInterface implements CIRazorPayment {
    private _paymentId;
    constructor(razor: Razorpay, paymentId: string);
    /**
    * Creates a Refunds
    *
    * @param {Object} params
    *
    * set the ``reverse_all`` parameter to `1` for refunding all related payment transfers.
    *
    * @return {Promise}
    */
    refund(params?: IRazorRefund): Promise<IRazorRefundId>;
    /**
    * Get all Refunds
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAllRefunds(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorRefundId[];
    }>;
    /**
    * Fetches a refund given Refund ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    fetchRefund(refundId: string): Promise<IRazorRefundId>;
    /**
    * Update a payment's notes with given Payment ID
    *
    * @param {IMap<string>} notes
    *
    * @return {Promise}
    */
    edit(notes: IMap<string>): Promise<IRazorPaymentId>;
    /**
    * Transfer funds to accounts from payment
    *
    * @param {IMap<string>} notes
    *
    * @return {Promise}
    */
    transfer(transfers: IRazorTransfer[]): Promise<{
        entity: string;
        count: number;
        items: IRazorTransferId[];
    }>;
    /**
    * Get all Transfers
    *
    * @param {Object} query
    *
    * @return {Promise}
    */
    fetchAllTransfer(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorTransferId[];
    }>;
    /**
    * Get Fetch Payment Details of the Card of the Payment
    *
    * @return {Promise}
    */
    card(): Promise<IRazorPaymentCardId>;
    /**
    * Get Fetch Payment Details of the Bank of the Payment
    *
    * @return {Promise}
    */
    bankTransfer(): Promise<IRazorBankTransferId>;
    /**
    * Get Fetch Payment Details of the UPI of the Payment
    *
    * @return {Promise}
    */
    upiTransfer(): Promise<IRazorUpiTransferId>;
}
