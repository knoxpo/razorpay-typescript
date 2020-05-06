import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorInvoiceQuery } from "../razorpay";
import { IMap } from "../helper";
import { IRazorAddressId } from "./customers";
export interface IRazorInvoiceAddress {
    line1: string;
    line2?: string;
    zipcode: string;
    city: string;
    state?: string;
    country: string;
}
export interface IRazorCustomerDetails {
    name?: string | null;
    email?: string | null;
    contact?: string | null;
    billing_address?: IRazorInvoiceAddress;
    shipping_address?: IRazorInvoiceAddress;
}
export interface IRazorCustomerDetailsId extends IRazorCustomerDetails {
    id?: string;
    gstin?: string | null;
    customer_name?: string | null;
    customer_email?: string | null;
    customer_contact?: string | null;
    billing_address?: IRazorAddressId;
    shipping_address?: IRazorAddressId;
}
export interface IRazorLineInvoiceItem {
    item_id?: string | null;
    name?: string | null;
    description?: string;
    amount: number;
    currency: string;
    quantity: number;
}
export interface IRazorLineInvoiceItemId extends IRazorLineInvoiceItem {
    id: string;
    ref_id?: string | null;
    ref_type?: string | null;
    unit_amount?: number | null;
    gross_amount?: number | null;
    tax_amount?: number | null;
    taxable_amount?: number | null;
    net_amount?: number | null;
    type?: 'invoice';
    tax_inclusive?: boolean;
    hsn_code?: string | null;
    sac_code?: string | null;
    tax_rate?: number | null;
    unit?: string | null;
}
declare type TRazorInvoiceStatus = 'draft' | 'issued' | 'partially_paid' | 'paid' | 'cancelled' | 'cancelled' | 'expired' | 'deleted';
export interface IRazorInvoice {
    description?: string | null;
    customer_id: string;
    customer: IRazorCustomerDetails;
    order_id: string;
    line_items: IRazorLineInvoiceItem[];
    status?: TRazorInvoiceStatus;
    expire_by?: number | null;
    sms_notify?: 0 | 1;
    email_notify?: 0 | 1;
    partial_payment?: boolean;
}
export interface IRazorInvoiceId extends IRazorInvoice {
    id: string;
    entity: 'invoice';
    type: 'invoice';
    invoice_number: string;
    customer_details: IRazorCustomerDetailsId;
    order_id: string;
    line_items: IRazorLineInvoiceItemId[];
    issued_at?: number | null;
    paid_at?: number | null;
    cancelled_at?: number | null;
    expired_at?: number | null;
    sms_status?: 'pending' | 'sent' | null;
    email_status?: 'pending' | 'sent' | null;
    gross_amount?: number;
    tax_amount?: number;
    taxable_amount?: number;
    amount: number;
    amount_paid?: number;
    amount_due?: number;
    currency: string;
    notes?: IMap<string> | null;
    short_url?: string | null;
    billing_start?: number | null;
    billing_end?: number | null;
    group_taxes_discounts?: boolean;
    date?: number | null;
    terms?: number | null;
    comment?: number | null;
    created_at: number;
}
export interface CIRazorInvoices {
    create(params: IRazorInvoice): Promise<IRazorInvoiceId>;
    fetchAll(query?: IRazorInvoiceQuery): Promise<{
        entity: 'invoice';
        count: number;
        items: IRazorInvoiceId[];
    }>;
    fetch(invoiceId: string): Promise<IRazorInvoiceId>;
    cancel(invoiceId: string): Promise<IRazorInvoiceId>;
    edit(invoiceId: string, params: IRazorInvoiceId): Promise<IRazorInvoiceId>;
    notify(invoiceId: string, medium: 'sms' | 'email'): Promise<{
        success: boolean;
    }>;
}
export declare class RazorInvoices extends RazorResourceInterface implements CIRazorInvoices {
    constructor(razor: Razorpay);
    get instance(): RazorInvoices;
    /**
    * Creates a invoice
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params: IRazorInvoice): Promise<IRazorInvoiceId>;
    /**
    * Get all Invoices
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorInvoiceQuery): Promise<{
        entity: 'invoice';
        count: number;
        items: IRazorInvoiceId[];
    }>;
    /**
    * Fetches a invoice given Invoice ID
    *
    * @param {String} invoiceId
    *
    * @return {Promise}
    */
    fetch(invoiceId: string): Promise<IRazorInvoiceId>;
    /**
    * Edit a invoice given Invoice ID
    *
    * @param {String} invoiceId
    *
    * @return {Promise}
    */
    cancel(invoiceId: string): Promise<IRazorInvoiceId>;
    /**
    * Edit a invoice given Invoice ID
    *
    * @param {String} invoiceId
    *
    * @return {Promise}
    */
    edit(invoiceId: string, params: IRazorInvoiceId): Promise<IRazorInvoiceId>;
    /**
    * notify a invoice given Invoice ID
    *
    * @param {String} invoiceId
    * @param {String} medium
    *
    * @return {Promise}
    */
    notify(invoiceId: string, medium: 'sms' | 'email'): Promise<{
        success: boolean;
    }>;
}
export {};
