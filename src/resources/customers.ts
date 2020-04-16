import { Razorpay } from "../razorpay";
import { RazorResourceInterface } from "./util/interface";
import { normalizeNotes } from "../helper";

export interface IRazorCustomer {
    name: string;
    email?: string;
    contact?: string;
    fail_existing?: "0" | "1";
    notes?: { [key: string]: string; };
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

export class RazorCustomers extends RazorResourceInterface implements CIRazorCustomers {

    constructor(razor: Razorpay) {
        super(razor, '/customers');
    }

    get instance(): RazorCustomers {
        return new RazorCustomers(this.services);
    }

    create(params: IRazorCustomer): Promise<IRazorCustomerId> {
        const { notes, ...rest } = params;
        const data = Object.assign(rest, normalizeNotes(notes));
        return this.api.post({
            url: `${this.resourceUrl}`,
            data
        });
    }

    fetchAll(): Promise<{ entity: string; count: number; items: IRazorCustomerId[]; }> {
        return this.api.get({
            url: `${this.resourceUrl}`,
        });
    }

    fetch(customerId: string): Promise<IRazorCustomerId> {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${customerId}`,
        });
    }

    edit(customerId: string, params: IRazorCustomer): Promise<any> {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        const { notes, ...rest } = params;
        const data = Object.assign(rest, normalizeNotes(notes));
        return this.api.put({
            url: `${this.resourceUrl}/${customerId}`,
            data
        });
    }

    fetchTokens(customerId: string): Promise<any> {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${customerId}/tokens`,
        });
    }
    
    fetchToken(customerId: string, tokenId: string): Promise<any> {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!tokenId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Token ID'));
        }
        return this.api.get({
            url: `${this.resourceUrl}/${customerId}/tokens/${tokenId}`,
        });
    }
    
    deleteToken(customerId: string, tokenId: string): Promise<any> {
        if (!customerId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        if (!tokenId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Token ID'));
        }
        return this.api.delete({
            url: `${this.resourceUrl}/${customerId}/tokens/${tokenId}`,
        });
    }

}