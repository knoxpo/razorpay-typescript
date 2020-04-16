import { IRazorQuery, Razorpay } from "../razorpay";
import { RazorResourceInterface } from "./util/interface";
export interface IRazorPlan {
    name: string;
    description: string;
    amount: number;
    currency: string;
    period: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    notes: {
        [key: string]: string;
    };
}
export interface IRazorPlanId extends IRazorPlan {
    id: string;
}
export interface CIRazorPlans {
    create(params: IRazorPlan): Promise<IRazorPlanId>;
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
    create(params: IRazorPlan): Promise<IRazorPlanId>;
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
//# sourceMappingURL=plans.d.ts.map