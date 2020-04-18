import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorOrderQuery } from "../razorpay";
import { IMap } from "../helper";
export interface IRazorOrder {
    amount: number;
    currency: string;
    receipt?: string;
    payment_capture?: 0 | 1;
    notes?: {
        [key: string]: string;
    };
}
export interface IRazorOrderId extends IRazorOrder {
    id: string;
    amount_paid: number;
    amount_due: number;
    currency: string;
    status: 'created' | 'attempted' | 'paid';
    attempts: number;
    created_at: number;
}
export interface CIRazorOrders {
    create(params: IRazorOrder): Promise<IRazorOrderId>;
    fetchAll(query?: IRazorOrderQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorOrderId[];
    }>;
    fetch(orderId: string): Promise<IRazorOrderId>;
    edit(orderId: string, notes: IMap<string>): Promise<IRazorOrderId>;
}
export declare class RazorOrders extends RazorResourceInterface implements CIRazorOrders {
    constructor(razor: Razorpay);
    get instance(): RazorOrders;
    /**
    * Creates a order
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params: IRazorOrder): Promise<IRazorOrderId>;
    /**
    * Get all Orders
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorOrderQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorOrderId[];
    }>;
    /**
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    fetch(orderId: string): Promise<IRazorOrderId>;
    /**
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    edit(orderId: string, notes: IMap<string>): Promise<IRazorOrderId>;
}
