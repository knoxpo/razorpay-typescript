export interface IMap<V> {
    [key: string]: V;
}
export declare const getDateInSecs: (date: number) => number;
export declare const normalizeDate: (date: number) => number;
export declare const isNumber: (num: number) => boolean;
export declare const isNonNullObject: (input: {}) => boolean;
export declare const normalizeBoolean: (bool: boolean) => 1 | 0;
export declare const isDefined: (value: any) => boolean;
export declare const normalizeNotes: (notes?: IMap<any>) => IMap<any>;
export declare const prettify: (val: IMap<any>) => string;
export declare const getTestError: (summary: string, expectedVal: any, gotVal: any) => Error;
export declare const validateWebhookSignature: (body: string, signature: string, secret: string) => boolean;
