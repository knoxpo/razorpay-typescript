import { Razorpay } from "../razorpay";
import { RazorResourceInterface } from "./util/interface";
export interface IRazorCustomer {
    name: string;
    email?: string;
    contact?: string;
    fail_existing?: "0" | "1";
    notes?: {
        [key: string]: string;
    };
}
export interface IRazorCustomerId extends IRazorCustomer {
    id: string;
    created_at: number;
    gstin: string;
}
export interface CIRazorCustomers {
    create(params: IRazorCustomer): Promise<IRazorCustomerId>;
    edit(customerId: string, params: IRazorCustomer): Promise<any>;
    fetchAll(): Promise<{
        entity: string;
        count: number;
        items: IRazorCustomerId[];
    }>;
    fetch(customerId: string): Promise<IRazorCustomerId>;
    fetchTokens(customerId: string): Promise<any>;
    fetchToken(customerId: string, tokenId: string): Promise<any>;
    deleteToken(customerId: string, tokenId: string): Promise<any>;
}
export declare class RazorCustomers extends RazorResourceInterface implements CIRazorCustomers {
    constructor(razor: Razorpay);
    get instance(): RazorCustomers;
    create(params: IRazorCustomer): Promise<IRazorCustomerId>;
    fetchAll(): Promise<{
        entity: string;
        count: number;
        items: IRazorCustomerId[];
    }>;
    fetch(customerId: string): Promise<IRazorCustomerId>;
    edit(customerId: string, params: IRazorCustomer): Promise<any>;
    fetchTokens(customerId: string): Promise<any>;
    fetchToken(customerId: string, tokenId: string): Promise<any>;
    deleteToken(customerId: string, tokenId: string): Promise<any>;
}
//# sourceMappingURL=customers.d.ts.map