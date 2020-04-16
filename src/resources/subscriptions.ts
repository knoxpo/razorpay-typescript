import { IRazorQuery, Razorpay, IRazorSubscriptionQuery } from "../razorpay";
import { RazorResourceInterface } from "./util/interface";
import { normalizeNotes, normalizeDate } from "../helper";

export interface IRazorSubscription {
    plan_id: string;
    customer_id?: string;
    total_count: number;
    customer_notify: 0 | 1;
    start_at?: number;
    quantity?: number;
    notes?: { [key: string]: string; };
    addons?: IRazorSubscriptionAddOnId[];
    status?: 'created' | 'authenticated' | 'active' | 'pending' | 'halted' | 'cancelled' | 'completed' | 'expired';
    paid_count?: number;
    current_start?: number;
    current_end?: number;
    ended_at?: number;
    charge_at?: number;
    auth_attempts?: number;
}

export interface IRazorUpdateSubscription {
    plan_id?: string;
    quantity?: number;
    remaining_count?: number;
    start_at?: number;
    schedule_change_at?: number;
    customer_notify?: 0 | 1;
}

export interface IRazorSubscriptionId extends IRazorSubscription {
    id: string;
}

export interface IRazorSubscriptionAddOn {
    item: {
        name: string;
        amount: number;
        currency: string;
        description: string;
        active: boolean;
    };
    quantity: number;
    subscription_id: string;
    invoice_id?: string;
}

export interface IRazorSubscriptionAddOnId extends IRazorSubscriptionAddOn {
    id?: string;
    created_at?: number;
}

export interface CIRazorSubscriptions {
    create(params: IRazorSubscription): Promise<IRazorSubscriptionId>;
    fetchAll(query?: IRazorSubscriptionQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorSubscriptionId[];
    }>;
    fetch(subscriptionId: string): Promise<IRazorSubscriptionId>;
    cancel(subscriptionId: string, cancelAtCycleEnd: boolean): Promise<IRazorSubscriptionId>;
    update(subscriptionId: string, params: IRazorUpdateSubscription): Promise<IRazorSubscriptionId>;
    pendingUpdate(subscriptionId: string): Promise<IRazorSubscriptionId>;
    cancelUpdate(subscriptionId: string): Promise<IRazorSubscriptionId>;
    createAddon(subscriptionId: string, params: IRazorSubscriptionAddOn): Promise<IRazorSubscriptionAddOnId>;
    fetchAllAddons(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorSubscriptionAddOnId[];
    }>;
    fetchAddon(addOnId: string): Promise<IRazorSubscriptionAddOnId>;
    deleteAddon(addOnId: string): Promise<IRazorSubscriptionAddOnId>;
}

export class RazorSubscriptions extends RazorResourceInterface implements CIRazorSubscriptions {

    constructor(razor: Razorpay) {
        super(razor, '/subscriptions');
    }

    get instance(): RazorSubscriptions {
        return new RazorSubscriptions(this.services);
    }

    /**
    * Creates a Subscription
    *
    * @param {Object} params
    *  ---
    *  * Mention `notify_info` in params to send subscription link.
    * 
    * @return {Promise}
    */
    create(params: IRazorSubscription): Promise<IRazorSubscriptionId> {
        if (!params) {
            return Promise.reject("Params is mandatory.");
        }
        const { notes, ...rest } = params;
        const data = Object.assign(rest, normalizeNotes(notes));

        return this.api.post({
            url: this.resourceUrl,
            data
        });
    }

    /**
    * Get all Subscriptions
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query: IRazorSubscriptionQuery = {}): Promise<{ entity: string; count: number; items: IRazorSubscriptionId[]; }> {
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
    * Fetches a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    fetch(subscriptionId: string): Promise<IRazorSubscriptionId> {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${subscriptionId}`
        });
    }

    /**
    * Cancel a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {Boolean} cancelAtCycleEnd
    *
    * @return {Promise}
    */
    cancel(subscriptionId: string, cancelAtCycleEnd: boolean): Promise<IRazorSubscriptionId> {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (typeof cancelAtCycleEnd !== "boolean") {
            return Promise.reject("The second parameter, Cancel at the end of cycle" +
                " should be a Boolean");
        }
        return this.api.post({
            url: `${this.resourceUrl}/${subscriptionId}/cancel`,
            ...(cancelAtCycleEnd && { data: { cancel_at_cycle_end: 1 } }),
        });
    }

    /**
    * Update a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {IRazorUpdateSubscription} params
    *
    * @return {Promise}
    */
    update(subscriptionId: string, params: IRazorUpdateSubscription): Promise<IRazorSubscriptionId> {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!params) {
            return Promise.reject("Params is mandatory.");
        }
        return this.api.patch({
            url: `${this.resourceUrl}/${subscriptionId}`,
            data: params,
        });
    }

    /**
    * Fetches details of a pending update of a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    pendingUpdate(subscriptionId: string): Promise<IRazorSubscriptionId> {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${subscriptionId}/retrieve_scheduled_changes`,
        });
    }

    /**
    * Cancels a pending update of a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    cancelUpdate(subscriptionId: string): Promise<IRazorSubscriptionId> {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.post({
            url: `${this.resourceUrl}/${subscriptionId}/cancel_scheduled_changes`,
        });
    }

    /**
    * Create an add-on to a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {IRazorSubscriptionAddOn} params
    *
    * @return {Promise}
    */
    createAddon(subscriptionId: string, params: IRazorSubscriptionAddOn): Promise<IRazorSubscriptionAddOnId> {
        if (!subscriptionId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!params) {
            return Promise.reject("Params is mandatory.");
        }
        return this.api.post({
            url: `${this.resourceUrl}/${subscriptionId}/addons`,
            data: params,
        });
    }

    /**
    * Fetch all add-ons
    *
    * @param {IRazorQuery} query
    *
    * @return {Promise}
    */
    fetchAllAddons(query: IRazorQuery = {}): Promise<{
        entity: string;
        count: number;
        items: IRazorSubscriptionAddOnId[];
    }> {
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
            url: `/addons`,
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
    * Fetch add-on with Add-on ID
    *
    * @param {String} addOnId
    *
    * @return {Promise}
    */
    fetchAddon(addOnId: string): Promise<IRazorSubscriptionAddOnId> {
        if (!addOnId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Add-on ID'));
        }
        return this.api.get({
            url: `/addons/${addOnId}`
        });
    }

    /**
    * Delete add-on with Add-on ID
    *
    * @param {String} addOnId
    *
    * @return {Promise}
    */
    deleteAddon(addOnId: string): Promise<IRazorSubscriptionAddOnId> {
        if (!addOnId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Add-on ID'));
        }
        return this.api.delete({
            url: `/addons/${addOnId}`
        });
    }

}