import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorQuery } from "../razorpay";
import { IMap } from "../helper";
export interface IRazorVirtualAccountPayload {
    receivers: {
        types: ('bank_account' | 'vpa')[];
        vpa?: {
            descriptor?: string;
        };
    };
    description?: string;
    customer_id?: string;
    notes?: IMap<string>;
    close_by?: number;
}
export interface IRazorVirtualAccount {
    name: string;
    description: string;
    amount_expected: number;
    amount_paid: number;
    customer_id: string;
    receivers: IRazorVirtualAccountReceiverId[];
    notes?: {
        [key: string]: string;
    };
}
export interface IRazorVirtualAccountId extends IRazorVirtualAccount {
    id: string;
    entity: 'virtual_account';
    status: 'active' | 'closed';
    close_by?: number;
    closed_at?: number;
    created_at?: number;
}
export interface IRazorVirtualAccountReceiverId {
    id?: string;
    entity?: string;
    ifsc?: string;
    bank_name?: string;
    account_number?: string;
    name?: string;
    notes?: {
        [key: string]: string;
    };
    username?: string;
    handle?: string;
    address?: string;
}
export interface IRazorBankTransferId {
    id?: string;
    entity?: 'bank_transfer';
    payment_id?: string;
    mode?: 'NEFT' | 'RTGS' | 'IMPS' | 'UPI';
    bank_reference?: string;
    payer_bank_account?: {
        id?: string;
        entity?: string;
        ifsc?: string;
        bank_name?: string;
        notes?: IMap<string>;
        account_number?: string;
    };
    virtual_account_id?: string;
    virtual_account?: IRazorVirtualAccountId;
}
export interface IRazorUpiTransferId {
    id?: string;
    entity?: 'upi_transfer';
    amount?: number;
    payer_vpa?: string;
    payer_bank?: string;
    payer_account?: string;
    payer_ifsc?: string;
    payment_id?: string;
    npci_reference_id?: string;
    virtual_account_id?: string;
    virtual_account?: IRazorVirtualAccountId;
}
export interface CIRazorVirtualAccounts {
    create(params: IRazorVirtualAccountPayload): Promise<IRazorVirtualAccountId>;
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorVirtualAccountId[];
    }>;
    fetch(virtualAccountId: string): Promise<IRazorVirtualAccountId>;
    fetchAllPayments(virtualAccountId: string, query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorVirtualAccountId[];
    }>;
    close(virtualAccountId: string): Promise<IRazorVirtualAccountId>;
}
export declare class RazorVirtualAccounts extends RazorResourceInterface implements CIRazorVirtualAccounts {
    constructor(razor: Razorpay);
    get instance(): RazorVirtualAccounts;
    /**
    * Creates a virtualAccount
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params: IRazorVirtualAccountPayload): Promise<IRazorVirtualAccountId>;
    /**
    * Get all VirtualAccounts
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorVirtualAccountId[];
    }>;
    /**
    * Fetches a virtualAccount given VirtualAccount ID
    *
    * @param {String} virtualAccountId
    *
    * @return {Promise}
    */
    fetch(virtualAccountId: string): Promise<IRazorVirtualAccountId>;
    /**
    * Get all VirtualAccounts
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAllPayments(virtualAccountId: string, query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorVirtualAccountId[];
    }>;
    /**
    * Fetches a virtualAccount given VirtualAccount ID
    *
    * @param {String} virtualAccountId
    *
    * @return {Promise}
    */
    close(virtualAccountId: string): Promise<IRazorVirtualAccountId>;
}
