import { RazorAPI } from "../../api";
import { Razorpay } from "../../razorpay";
export declare class RazorResourceInterface {
    private _razor;
    private _resourceUrl;
    constructor(instance: Razorpay, resourceUrl: string);
    protected get resourceUrl(): string;
    protected get api(): RazorAPI;
    protected get TAG(): string;
    protected get MISSING_ID_ERROR(): string;
    protected FIELD_MANDATORY_ERROR(field: string): string;
    get services(): Razorpay;
}
