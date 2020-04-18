import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorQuery } from "../razorpay";
import { IMap } from "../helper";
export interface IRazorRefund {
    amount?: number;
    speed?: 'normal' | 'optimum';
    notes?: IMap<number>;
    reverse_all?: 0 | 1;
    receipt?: string;
}
export interface IRazorRefundId extends IRazorRefund {
    id: string;
    entity: string;
    currency: string;
    payment_id: string;
    acquirer_data?: IMap<number>;
    speed_requested: 'normal' | 'optimum';
    speed_processed: 'normal' | 'optimum';
    status: 'pending' | 'processed';
    created_at: number;
}
export interface CIRazorRefunds {
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorRefundId[];
    }>;
    fetch(refundId: string): Promise<IRazorRefundId>;
    edit(refundId: string, notes: IMap<string>): Promise<IRazorRefundId>;
}
export declare class RazorRefunds extends RazorResourceInterface implements CIRazorRefunds {
    constructor(razor: Razorpay);
    get instance(): RazorRefunds;
    /**
    * Get all Refunds
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorRefundId[];
    }>;
    /**
    * Fetches a refund given Refund ID
    *
    * @param {String} refundId
    *
    * @return {Promise}
    */
    fetch(refundId: string): Promise<IRazorRefundId>;
    /**
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    edit(refundId: string, notes: IMap<string>): Promise<IRazorRefundId>;
}
