import { RazorAPI } from "../../api";
import { Razorpay } from "../../razorpay";

export class RazorResourceInterface {

    private _razor: Razorpay;
    private _resourceUrl: string;

    constructor(instance: Razorpay, resourceUrl: string) {
        if (!instance) {
            throw new Error('`api` is mandatory')
        }
        this._razor = instance;
        this._resourceUrl = resourceUrl;
    }

    protected get resourceUrl(): string {
        return this._resourceUrl;
    }

    protected get api(): RazorAPI {
        return this._razor.razorAPI;
    }

    protected get TAG(): string {
        return `[${new Date().toUTCString()} | ${this.constructor.name}]`;
    }
    
    protected get MISSING_ID_ERROR(): string {
        return `${this.resourceUrl.split('/')[0]} ID is mandatory`;
    }

    protected FIELD_MANDATORY_ERROR(field: string): string {
        return `${field} is mandatory`;
    }

    get services(): Razorpay {
        return new Razorpay(this._razor.config);
    }


}