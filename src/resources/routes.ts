import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorRouteQuery } from "../razorpay";
import { normalizeBoolean, IMap, normalizeDate, normalizeNotes } from "../helper";

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
    fetchAll(query?: IRazorRouteQuery): Promise<{ entity: string; count: number; items: IRazorTransferId[]; }>;
    hold(transferId: string, onHold: boolean): Promise<IRazorTransferId>;
    edit(transferId: string, notes: IMap<string>): Promise<IRazorTransferId>;
}


export class RazorRoutes extends RazorResourceInterface implements CIRazorRoutes {

    constructor(razor: Razorpay) {
        super(razor, '/transfers');
    }

    get instance(): RazorRoutes {
        return new RazorRoutes(this.services);
    }

    /**
    * Creates a transfer
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    transfer(params: IRazorTransfer): Promise<IRazorTransferId> {
        if (!params) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Params'));
        }
        if (!params.account) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Account'));
        }
        if (!params.currency) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Currency'));
        }
        if (!params.amount) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Amount'));
        }
        const payload: IRazorTransfer = params;
        payload.amount = Number(payload.amount);
        payload.on_hold = normalizeBoolean(!!payload.on_hold);
        return this.api.post({
            url: `${this.resourceUrl}`,
            data: payload,
        });
    }

    /**
    * Reversal a transfer
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    reversal(transferId: string, params?: IRazorTransfer): Promise<IRazorTransferId> {
        if (!transferId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Transfer Id'));
        }
        return this.api.post({
            url: `${this.resourceUrl}/${transferId}/reversals`,
            ...(!!params ? { data: params } : { data: {} })
        });
    }

    /**
    * Fetches a route given Route ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
    fetch(transferId: string): Promise<IRazorTransferId> {
        if (!transferId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${transferId}`
        });
    }

    /**
    * Get all Transfers
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
   fetchAll(query: IRazorRouteQuery = {}): Promise<{ entity: string; count: number; items: IRazorTransferId[]; }> {
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
    * Hold a transfer given Route ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
    hold(transferId: string, onHold: boolean): Promise<IRazorTransferId> {

        if (!transferId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }

        if (onHold !== undefined) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('onHold'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${transferId}`,
            data: {
                on_hold: normalizeBoolean(!!onHold),
            },
        });
    }

    /**
    * Update a transfer given Transfer ID
    *
    * @param {String} transferId
    *
    * @return {Promise}
    */
   edit(transferId: string, notes: IMap<string>): Promise<IRazorTransferId> {

    if (!transferId) {
        return Promise.reject(this.MISSING_ID_ERROR);
    }
    
    if (!notes) {
        return Promise.reject(this.FIELD_MANDATORY_ERROR('Notes'));
    }
    return this.api.patch({
        url: `${this.resourceUrl}/${transferId}`,
        data: {
            notes: normalizeNotes(notes),
        }
    });
}

}

