import { IRazorQuery, Razorpay, IRazorSubscriptionQuery } from "../razorpay";
import { RazorResourceInterface } from "./util/interface";
export interface IRazorSubscription {
    plan_id: string;
    customer_id?: string;
    total_count: number;
    customer_notify: 0 | 1 | boolean;
    start_at?: number;
    end_at?: number;
    quantity?: number;
    notes?: {
        [key: string]: string;
    };
    addons?: IRazorSubscriptionAddOnId[];
    status?: 'created' | 'authenticated' | 'active' | 'pending' | 'halted' | 'cancelled' | 'completed' | 'expired';
    paid_count?: number;
    current_start?: number;
    current_end?: number;
    ended_at?: number;
    charge_at?: number;
    remaining_count?: number;
    has_scheduled_changes?: 0 | 1 | boolean;
    schedule_change_at?: 'now' | 'cycle_end';
    auth_attempts?: number;
}
export interface IRazorUpdateSubscription {
    plan_id?: string;
    quantity?: number;
    remaining_count?: number;
    start_at?: number;
    schedule_change_at?: 'now' | 'cycle_end';
    customer_notify?: 0 | 1 | boolean;
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
        active: 0 | 1 | boolean;
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
export declare class RazorSubscriptions extends RazorResourceInterface implements CIRazorSubscriptions {
    constructor(razor: Razorpay);
    get instance(): RazorSubscriptions;
    /**
    * Creates a Subscription
    *
    * @param {Object} params
    *  ---
    *  * Mention `notify_info` in params to send subscription link.
    *
    * @return {Promise}
    */
    create(params: IRazorSubscription): Promise<IRazorSubscriptionId>;
    /**
    * Get all Subscriptions
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query?: IRazorSubscriptionQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorSubscriptionId[];
    }>;
    /**
    * Fetches a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    fetch(subscriptionId: string): Promise<IRazorSubscriptionId>;
    /**
    * Cancel a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {Boolean} cancelAtCycleEnd
    *
    * @return {Promise}
    */
    cancel(subscriptionId: string, cancelAtCycleEnd: boolean): Promise<IRazorSubscriptionId>;
    /**
    * Update a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {IRazorUpdateSubscription} params
    *
    * @return {Promise}
    */
    update(subscriptionId: string, params: IRazorUpdateSubscription): Promise<IRazorSubscriptionId>;
    /**
    * Fetches details of a pending update of a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    pendingUpdate(subscriptionId: string): Promise<IRazorSubscriptionId>;
    /**
    * Cancels a pending update of a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    *
    * @return {Promise}
    */
    cancelUpdate(subscriptionId: string): Promise<IRazorSubscriptionId>;
    /**
    * Create an add-on to a Subscription given Subscription ID
    *
    * @param {String} subscriptionId
    * @param {IRazorSubscriptionAddOn} params
    *
    * @return {Promise}
    */
    createAddon(subscriptionId: string, params: IRazorSubscriptionAddOn): Promise<IRazorSubscriptionAddOnId>;
    /**
    * Fetch all add-ons
    *
    * @param {IRazorQuery} query
    *
    * @return {Promise}
    */
    fetchAllAddons(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorSubscriptionAddOnId[];
    }>;
    /**
    * Fetch add-on with Add-on ID
    *
    * @param {String} addOnId
    *
    * @return {Promise}
    */
    fetchAddon(addOnId: string): Promise<IRazorSubscriptionAddOnId>;
    /**
    * Delete add-on with Add-on ID
    *
    * @param {String} addOnId
    *
    * @return {Promise}
    */
    deleteAddon(addOnId: string): Promise<IRazorSubscriptionAddOnId>;
}
