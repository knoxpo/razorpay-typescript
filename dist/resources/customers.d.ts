import { Razorpay } from "../razorpay";
import { RazorResourceInterface } from "./util/interface";
export interface IRazorCustomer {
    name: string;
    email?: string | null;
    contact?: string | null;
    gstin?: string | null;
    fail_existing?: "0" | "1";
    notes?: {
        [key: string]: string;
    };
}
export interface IRazorCustomerId extends IRazorCustomer {
    id: string;
    created_at: number;
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
export declare class RazorCustomers extends RazorResourceInterface implements CIRazorCustomers {
    constructor(razor: Razorpay);
    get instance(): RazorCustomers;
    customer(customerId: string): RazorCustomer;
    create(params: IRazorCustomer): Promise<IRazorCustomerId>;
    fetchAll(): Promise<{
        entity: string;
        count: number;
        items: IRazorCustomerId[];
    }>;
    fetch(customerId: string): Promise<IRazorCustomerId>;
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
export declare class RazorCustomer extends RazorResourceInterface implements CIRazorCustomer {
    private _customerId;
    constructor(razor: Razorpay, customerId: string);
    /**
    * Creates a Address
    *
    * @param {Object} params
    *
    *
    * @return {Promise}
    */
    createAddress(params: IRazorAddress): Promise<IRazorAddressId>;
    /**
    * Fetch all Addresses
    *
    * @param {Object} params
    *
    *
    * @return {Promise}
    */
    fetchAllAddresses(): Promise<{
        entity: string;
        count: number;
        items: IRazorAddressId[];
    }>;
    /**
    * Get a Address
    *
    * @param {String} addressId
    *
    *
    * @return {Promise}
    */
    fetchAddress(addressId: string): Promise<IRazorAddressId>;
    /**
    * Delete a Address
    *
    * @param {String} addressId
    *
    *
    * @return {Promise}
    */
    deleteAddress(addressId: string): Promise<IRazorAddressId>;
    edit(params: IRazorCustomer): Promise<any>;
    fetchAllTokens(): Promise<any>;
    fetchToken(tokenId: string): Promise<any>;
    deleteToken(tokenId: string): Promise<any>;
}
