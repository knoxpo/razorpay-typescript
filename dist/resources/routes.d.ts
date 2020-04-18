import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorRouteQuery } from "../razorpay";
import { IMap } from "../helper";
export interface IRazorTransfer {
    source?: string;
    recipient?: string;
    account?: string;
    amount: number;
    currency: string;
    notes?: IMap<string>;
    amount_reversed?: number;
    on_hold?: boolean | 0 | 1;
    on_hold_until?: number;
    active?: boolean | 0 | 1;
}
export interface IRazorTransferId extends IRazorTransfer {
    id: string;
    entity: string;
    created_at: number;
}
export interface CIRazorRoutes {
    transfer(params: IRazorTransfer): Promise<IRazorTransferId>;
    reversal(transferId: string, params?: IRazorTransfer): Promise<IRazorTransferId>;
    fetch(transferId: string): Promise<IRazorTransferId>;
    fetchAll(query?: IRazorRouteQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorTransferId[];
    }>;
    hold(transferId: string, onHold: boolean): Promise<IRazorTransferId>;
    edit(transferId: string, notes: IMap<string>): Promise<IRazorTransferId>;
}
export declare class RazorRoutes extends RazorResourceInterface implements CIRazorRoutes {
    constructor(razor: Razorpay);
    get instance(): RazorRoutes;
    /**
    * Creates a transfer
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    transfer(params: IRazorTransfer): Promise<IRazorTransferId>;
    /**
    * Reversal a transfer
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    reversal(transferId: string, params?: IRazorTransfer): Promise<IRazorTransferId>;
    /**
    * Fetches a route given Route ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
    fetch(transferId: string): Promise<IRazorTransferId>;
    /**
    * Get all Transfers
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorRouteQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorTransferId[];
    }>;
    /**
    * Hold a transfer given Route ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
    hold(transferId: string, onHold: boolean): Promise<IRazorTransferId>;
    /**
    * Update a transfer given Transfer ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
    edit(transferId: string, notes: IMap<string>): Promise<IRazorTransferId>;
}
