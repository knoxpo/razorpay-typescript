import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorQuery } from "../razorpay";
import { normalizeDate, normalizeBoolean } from "../helper";

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


export class RazorItems extends RazorResourceInterface implements CIRazorItems {

    constructor(razor: Razorpay) {
        super(razor, '/items');
    }

    get instance(): RazorItems {
        return new RazorItems(this.services);
    }

    /**
    * Creates a item
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params: IRazorItem): Promise<IRazorItemId> {
        const { name, amount, currency } = params;
        if (!name) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Name'));
        }
        if (!amount) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Amount'));
        }
        if (!currency) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Currency'));
        }
        return this.api.post({
            url: this.resourceUrl,
            data: params,
        });
    }

    /**
    * Get all Items
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query: IRazorQuery = {}): Promise<{ entity: string; count: number; items: IRazorItemId[]; }> {
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
    * Fetches a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    fetch(itemId: string): Promise<IRazorItemId> {
        if (!itemId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${itemId}`
        });
    }

    /**
    * Edit a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    edit(itemId: string, params: IRazorItem): Promise<IRazorItemId> {

        if (!itemId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }

        if (!params) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Params'));
        }
        if (params.active) {
            params.active = normalizeBoolean(!!params.active);
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${itemId}`,
            data: params,
        });
    }


    /**
    * Delete a item given Item ID
    *
    * @param {String} itemId
    *
    * @return {Promise}
    */
    delete(itemId: string): Promise<[]> {
        if (!itemId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.delete({
            url: `${this.resourceUrl}/${itemId}`
        });
    }

}

