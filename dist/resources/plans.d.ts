import { IRazorQuery, Razorpay } from "../razorpay";
import { RazorResourceInterface } from "./util/interface";
export interface IRazorPlan {
    entity: "plan";
    interval: number;
    period: "daily" | "weekly" | "monthly" | "yearly";
    item: {
        id: string;
        active: boolean;
        name: string;
        description: string;
        amount: number;
        unit_amount: number;
        currency: string;
        type: "plan";
        unit: string | null;
        tax_inclusive: boolean;
        hsn_code: string | null;
        sac_code: string | null;
        tax_rate: string | null;
        tax_id: string | null;
        tax_group_id: string | null;
        created_at: number;
        updated_at: number;
    };
    notes: {
        [key: string]: string;
    };
    created_at: number;
}
export interface IRazorAddPlan {
    item: {
        name: string;
        description: string;
        amount: number;
        currency: string;
    };
    period: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    notes: {
        [key: string]: string;
    };
}
export interface IRazorPlanId extends IRazorPlan {
    id: string;
}
export interface CIRazorPlans {
    create(params: IRazorAddPlan): Promise<IRazorPlanId>;
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorPlanId[];
    }>;
    fetch(planId: string): Promise<IRazorPlanId>;
}
export declare class RazorPlans extends RazorResourceInterface implements CIRazorPlans {
    constructor(razor: Razorpay);
    get instance(): RazorPlans;
    /**
     * Creates a plan
     *
     * @param {Object} params
     *
     * @return {Promise}
     */
    create(params: IRazorAddPlan): Promise<IRazorPlanId>;
    /**
     * Get all Plans
     *
     * @param {Object} params
     *
     * @return {Promise}
     */
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorPlanId[];
    }>;
    /**
     * Fetches a plan given Plan ID
     *
     * @param {String} planId
     *
     * @return {Promise}
     */
    fetch(planId: string): Promise<IRazorPlanId>;
}
