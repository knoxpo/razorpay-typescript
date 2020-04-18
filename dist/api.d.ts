import { IMap } from './helper';
export interface IRazorAPIPayload {
    url: string;
    data?: IMap<any>;
}
export declare class RazorAPI {
    private allowedHeaders;
    private rq;
    private _options;
    constructor(options: IMap<any>);
    get TAG(): string;
    get options(): IMap<any>;
    get(params: IRazorAPIPayload): Promise<any>;
    post(params: IRazorAPIPayload): Promise<any>;
    put(params: IRazorAPIPayload): Promise<any>;
    patch(params: IRazorAPIPayload): Promise<any>;
    delete(params: IRazorAPIPayload): Promise<any>;
    private getValidHeaders;
    private normalizeError;
}
