import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorQuery, IRazorSettlementQuery } from "../razorpay";
export interface IRazorSettlement {
    amount: number;
    tax: number;
    utr: string;
}
export interface IRazorSettlementId extends IRazorSettlement {
    id: string;
    entity: string;
    fees: number;
    status: 'created' | 'processed';
    created_at: number;
}
export interface IRazorSettlementRecon {
    entity_id: string;
    type: string;
    debit: number;
    credit: number;
    amount: number;
    currency: string;
    fees: number;
    tax: number;
    on_hold: boolean;
    settled: boolean;
    created_at: number;
    settled_at: number;
    settlement_id: string;
    description: string;
    payment_id: string;
    settlement_utr: string;
    order_id: string;
    order_receipt: string;
    method: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi';
    card_network: 'American Express' | 'Diners Club' | 'Maestro' | 'MasterCard' | 'RuPay' | 'Visa';
    card_issuer: string;
    card_type: 'credit' | 'debit';
    dispute_id: string;
}
export interface CIRazorSettlements {
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorSettlementId[];
    }>;
    fetch(settlementId: string): Promise<IRazorSettlementId>;
    recon(year: number, month: number, day: number, query?: IRazorSettlementQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorSettlementRecon[];
    }>;
}
export declare class RazorSettlements extends RazorResourceInterface implements CIRazorSettlements {
    constructor(razor: Razorpay);
    get instance(): RazorSettlements;
    /**
    * Get all Settlements
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorSettlementId[];
    }>;
    /**
    * Fetches a settlement given Settlement ID
    *
    * @param {String} settlementId
    *
    * @return {Promise}
    */
    fetch(settlementId: string): Promise<IRazorSettlementId>;
    /**
    * Fetches a settlement given Settlement ID
    *
    * @param {String} settlementId
    *
    * @return {Promise}
    */
    recon(year: number, month: number, day: number, query?: IRazorSettlementQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorSettlementRecon[];
    }>;
}
