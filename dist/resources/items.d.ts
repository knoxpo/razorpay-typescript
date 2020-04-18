import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorQuery } from "../razorpay";
export interface IRazorItem {
    name: string;
    description?: string;
    amount: number;
    currency: string;
    active?: boolean | 0 | 1;
}
export interface IRazorItemId extends IRazorItem {
    id: string;
}
export interface CIRazorItems {
    create(params: IRazorItem): Promise<IRazorItemId>;
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorItemId[];
    }>;
    fetch(itemId: string): Promise<IRazorItemId>;
    edit(itemId: string, params: IRazorItem): Promise<IRazorItemId>;
    delete(itemId: string): Promise<[]>;
}
export declare class RazorItems extends RazorResourceInterface implements CIRazorItems {
    constructor(razor: Razorpay);
    get instance(): RazorItems;
    /**
    * Creates a item
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params: IRazorItem): Promise<IRazorItemId>;
    /**
    * Get all Items
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorItemId[];
    }>;
    /**
    * Fetches a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    fetch(itemId: string): Promise<IRazorItemId>;
    /**
    * Edit a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    edit(itemId: string, params: IRazorItem): Promise<IRazorItemId>;
    /**
    * Delete a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    delete(itemId: string): Promise<[]>;
}
