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

export interface IRazorAddress {
    type: "billing_address" | "shipping_address";
    line1: string;
    line2?: string;
    zipcode: string;
    city: string;
    state?: string;
    country: string;
    primary?: 0 | 1;
}

export interface IRazorAddressId extends IRazorAddress {
    id: string;
}

export interface CIRazorCustomers {
    customer(customerId: string): RazorCustomer;
    create(params: IRazorCustomer): Promise<IRazorCustomerId>;
    fetchAll(): Promise<{
        entity: string;
        count: number;
        items: IRazorCustomerId[];
    }>;
    fetch(customerId: string): Promise<IRazorCustomerId>;
}

export class RazorCustomers extends RazorResourceInterface implements CIRazorCustomers {

    constructor(razor: Razorpay) {
        super(razor, '/customers');
    }

    get instance(): RazorCustomers {
        return new RazorCustomers(this.services);
    }

    customer(customerId: string): RazorCustomer {
        return new RazorCustomer(this.services, customerId);
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
}

export interface CIRazorCustomer {
    createAddress(params: IRazorAddress): Promise<IRazorAddressId>;
    fetchAddress(addressId: string): Promise<IRazorAddressId>;
    fetchAllAddresses(): Promise<{
        entity: string;
        count: number;
        items: IRazorAddressId[];
    }>;
    deleteAddress(addressId: string): Promise<any>;
    edit(params: IRazorCustomer): Promise<IRazorAddressId>;
    fetchAllTokens(): Promise<any>;
    fetchToken(tokenId: string): Promise<any>;
    deleteToken(tokenId: string): Promise<any>;
}

export class RazorCustomer extends RazorResourceInterface implements CIRazorCustomer {

    private _customerId: string;

    constructor(razor: Razorpay, customerId: string) {
        super(razor, '/customers');
        if (!customerId) {
            throw this.FIELD_MANDATORY_ERROR('Customer ID');
        }
        this._customerId = customerId;
    }

    /**
    * Creates a Address
    *
    * @param {Object} params
    * 
    *
    * @return {Promise}
    */
    createAddress(params: IRazorAddress): Promise<IRazorAddressId> {
        const data = params;
        if(data.primary !== undefined && data.primary !== null) {
            data.primary = data.primary ? 1 : 0;
        } 
        return this.api.post({
            url: `${this.resourceUrl}/${this._customerId}/addresses`,
            data
        });
    }

    /**
    * Fetch all Addresses
    *
    * @param {Object} params
    * 
    *
    * @return {Promise}
    */
    fetchAllAddresses(): Promise<{ entity: string; count: number; items: IRazorAddressId[]; }> {
        return this.api.get({
            url: `${this.resourceUrl}/${this._customerId}/addresses`
        });
    }

    /**
    * Get a Address
    *
    * @param {String} addressId
    * 
    *
    * @return {Promise}
    */
    fetchAddress(addressId: string): Promise<IRazorAddressId> {
        return this.api.get({
            url: `${this.resourceUrl}/${this._customerId}/addresses/${addressId}`
        });
    }

    /**
    * Delete a Address
    *
    * @param {String} addressId
    * 
    *
    * @return {Promise}
    */
    deleteAddress(addressId: string): Promise<IRazorAddressId> {
        return this.api.delete({
            url: `${this.resourceUrl}/${this._customerId}/addresses/${addressId}`
        });
    }

    edit(params: IRazorCustomer): Promise<any> {
        const { notes, ...rest } = params;
        const data = Object.assign(rest, normalizeNotes(notes));
        return this.api.put({
            url: `${this.resourceUrl}/${this._customerId}`,
            data
        });
    }

    fetchAllTokens(): Promise<any> {
        return this.api.get({
            url: `${this.resourceUrl}/${this._customerId}/tokens`,
        });
    }

    fetchToken(tokenId: string): Promise<any> {
        if (!tokenId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Token ID'));
        }
        return this.api.get({
            url: `${this.resourceUrl}/${this._customerId}/tokens/${tokenId}`,
        });
    }

    deleteToken(tokenId: string): Promise<any> {
        if (!tokenId) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('Token ID'));
        }
        return this.api.delete({
            url: `${this.resourceUrl}/${this._customerId}/tokens/${tokenId}`,
        });
    }
}