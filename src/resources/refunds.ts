import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorQuery } from "../razorpay";
import { normalizeDate, IMap, normalizeNotes } from "../helper";

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


export class RazorRefunds extends RazorResourceInterface implements CIRazorRefunds {

    constructor(razor: Razorpay) {
        super(razor, '/refunds');
    }

    get instance(): RazorRefunds {
        return new RazorRefunds(this.services);
    }


    /**
    * Get all Refunds
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query: IRazorQuery = {}): Promise<{ entity: string; count: number; items: IRazorRefundId[]; }> {
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
            url: `${this.resourceUrl}`,
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
    * Fetches a refund given Refund ID
    *
    * @param {String} refundId
    *
    * @return {Promise}
    */
    fetch(refundId: string): Promise<IRazorRefundId> {
        if (!refundId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${refundId}`
        });
    }

    /**
    * Fetches a order given Order ID
    *
    * @param {String} orderId
    *
    * @return {Promise}
    */
   edit(refundId: string, notes: IMap<string>): Promise<IRazorRefundId> {

    if (!refundId) {
        return Promise.reject(this.MISSING_ID_ERROR);
    }
    
    if (!notes) {
        return Promise.reject(this.FIELD_MANDATORY_ERROR('Notes'));
    }

    return this.api.patch({
        url: `${this.resourceUrl}/${refundId}`,
        data: {
            notes: normalizeNotes(notes),
        }
    });
}

}

