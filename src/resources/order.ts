import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorOrderQuery } from "../razorpay";
import { normalizeNotes, normalizeDate, IMap } from "../helper";

export interface IRazorOrder {
    amount: number;
    currency: string;
    receipt?: string;
    payment_capture?: 0 | 1;
    notes?: { [key: string]: string; };
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


export class RazorOrders extends RazorResourceInterface implements CIRazorOrders {

    constructor(razor: Razorpay) {
        super(razor, '/orders');
    }

    get instance(): RazorOrders {
        return new RazorOrders(this.services);
    }

    /**
    * Creates a order
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params: IRazorOrder): Promise<IRazorOrderId> {
        const { notes, ...rest } = params;
        const data = Object.assign(rest, normalizeNotes(notes));
        return this.api.post({
            url: this.resourceUrl,
            data
        });
    }

    /**
    * Get all Orders
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query: IRazorOrderQuery = {}): Promise<{ entity: string; count: number; items: IRazorOrderId[]; }> {
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
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    fetch(orderId: string): Promise<IRazorOrderId> {
        if (!orderId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${orderId}`
        });
    }

    /**
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
    edit(orderId: string, notes: IMap<string>): Promise<IRazorOrderId> {

        if (!orderId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        
        if (!notes) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Notes'));
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${orderId}`,
            data: {
                notes: normalizeNotes(notes),
            }
        });
    }

}

