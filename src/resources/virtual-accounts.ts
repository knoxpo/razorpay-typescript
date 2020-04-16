import { RazorResourceInterface } from "./util/interface";
import { Razorpay, IRazorQuery } from "../razorpay";
import { normalizeNotes, normalizeDate, IMap } from "../helper";

export interface IRazorVirtualAccountPayload {
    receivers: {
        types: ('bank_account' | 'vpa')[];
        vpa?: {
            descriptor?: string;
        };
    };
    description?: string;
    customer_id?: string;
    notes?: IMap<string>;
    close_by?: number;
}

export interface IRazorVirtualAccount {
    name: string;
    description: string;
    amount_expected: number;
    amount_paid: number;
    customer_id: string;
    receivers: IRazorVirtualAccountReceiverId[];
    notes?: { [key: string]: string; };
}

export interface IRazorVirtualAccountId extends IRazorVirtualAccount {
    id: string;
    entity: 'virtual_account';
    status: 'active' | 'closed';
    close_by?: number;
    closed_at?: number;
    created_at?: number;
}

export interface IRazorVirtualAccountReceiverId {
    id?: string;
    entity?: string;
    ifsc?: string;
    bank_name?: string;
    account_number?: string;
    name?: string;
    notes?: { [key: string]: string; };
    username?: string;
    handle?: string;
    address?: string;
}

export interface IRazorBankTransferId {
    id?: string;
    entity?: 'bank_transfer';
    payment_id?: string;
    mode?: 'NEFT' | 'RTGS' | 'IMPS' | 'UPI';
    bank_reference?: string;
    payer_bank_account?: {
        id?: string;
        entity?: string;
        ifsc?: string;
        bank_name?: string;
        notes?: IMap<string>;
        account_number?: string;
    };
    virtual_account_id?: string;
    virtual_account?: IRazorVirtualAccountId;
}

export interface IRazorUpiTransferId {
    id?: string;
    entity?: 'upi_transfer';
    amount?: number;
    payer_vpa?: string;
    payer_bank?: string;
    payer_account?: string;
    payer_ifsc?: string;
    payment_id?: string;
    npci_reference_id?: string;
    virtual_account_id?: string;
    virtual_account?: IRazorVirtualAccountId;
}

export interface CIRazorVirtualAccounts {
    create(params: IRazorVirtualAccountPayload): Promise<IRazorVirtualAccountId>;
    fetchAll(query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorVirtualAccountId[];
    }>;
    fetch(virtualAccountId: string): Promise<IRazorVirtualAccountId>;
    fetchAllPayments(virtualAccountId: string, query?: IRazorQuery): Promise<{
        entity: string;
        count: number;
        items: IRazorVirtualAccountId[];
    }>;
    close(virtualAccountId: string): Promise<IRazorVirtualAccountId>;
}


export class RazorVirtualAccounts extends RazorResourceInterface implements CIRazorVirtualAccounts {

    constructor(razor: Razorpay) {
        super(razor, '/virtual_accounts');
    }

    get instance(): RazorVirtualAccounts {
        return new RazorVirtualAccounts(this.services);
    }

    /**
    * Creates a virtualAccount
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    create(params: IRazorVirtualAccountPayload): Promise<IRazorVirtualAccountId> {
        const { notes, ...rest } = params;
        const data = Object.assign(rest, normalizeNotes(notes));
        if (!data.receivers) {
            return Promise.reject(this.FIELD_MANDATORY_ERROR('receivers'));
        } else {
            if (data.receivers.types.indexOf('vpa') > -1 && !data.receivers.vpa) {
                return Promise.reject(this.FIELD_MANDATORY_ERROR('receivers.vpa'));
            }
        }
        return this.api.post({
            url: this.resourceUrl,
            data
        });
    }

    /**
    * Get all VirtualAccounts
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAll(query: IRazorQuery = {}): Promise<{ entity: string; count: number; items: IRazorVirtualAccountId[]; }> {
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
    * Fetches a virtualAccount given VirtualAccount ID
    *
    * @param {String} virtualAccountId
    *
    * @return {Promise}
    */
    fetch(virtualAccountId: string): Promise<IRazorVirtualAccountId> {
        if (!virtualAccountId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.get({
            url: `${this.resourceUrl}/${virtualAccountId}`
        });
    }

    /**
    * Get all VirtualAccounts
    *
    * @param {Object} params
    *
    * @return {Promise}
    */
    fetchAllPayments(virtualAccountId: string, query: IRazorQuery = {}): Promise<{ entity: string; count: number; items: IRazorVirtualAccountId[]; }> {
        let { from, to, count, skip } = query;

        if (!virtualAccountId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }

        if (from) {
            from = normalizeDate(from)
        }

        if (to) {
            to = normalizeDate(to)
        }

        count = Number(count) || 10
        skip = Number(skip) || 0

        return this.api.get({
            url: `${this.resourceUrl}/${virtualAccountId}/payments`,
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
    * Fetches a virtualAccount given VirtualAccount ID
    *
    * @param {String} virtualAccountId
    *
    * @return {Promise}
    */
    close(virtualAccountId: string): Promise<IRazorVirtualAccountId> {
        if (!virtualAccountId) {
            return Promise.reject(this.MISSING_ID_ERROR);
        }
        return this.api.post({
            url: `${this.resourceUrl}/${virtualAccountId}`,
        });
    }

}

