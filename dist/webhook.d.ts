export declare type WebHookFunction = (payload: IRazorWebHookPayload) => Promise<any>;
export declare type EntityContain = "payment" | "order" | "refund" | "dispute" | "invoice" | "subscription" | "settlement" | "virtual_account";
export declare type WebHookEvent = "order.paid" | "payment.authorized" | "payment.captured" | "payment.failed" | "refund.created" | "payment.dispute.created" | "payment.dispute.won" | "payment.dispute.lost" | "payment.dispute.closed" | "invoice.partially_paid" | "invoice.paid" | "invoice.expired" | "subscription.activated" | "subscription.charged" | "subscription.completed" | "subscription.updated" | "subscription.pending" | "subscription.halted" | "subscription.cancelled" | "settlement.processed" | "virtual_account.created" | "virtual_account.credited" | "virtual_account.closed";
export interface IActionHandler {
    order: {
        paid: WebHookFunction;
    };
    payment: {
        authorized: WebHookFunction;
        captured: WebHookFunction;
        failed: WebHookFunction;
    };
    refund: {
        created: WebHookFunction;
    };
    dispute: {
        created: WebHookFunction;
        won: WebHookFunction;
        lost: WebHookFunction;
        closed: WebHookFunction;
    };
    invoice: {
        partially_paid: WebHookFunction;
        paid: WebHookFunction;
        expired: WebHookFunction;
    };
    subscription: {
        activated: WebHookFunction;
        charged: WebHookFunction;
        completed: WebHookFunction;
        updated: WebHookFunction;
        pending: WebHookFunction;
        halted: WebHookFunction;
        cancelled: WebHookFunction;
    };
    settlement: {
        processed: WebHookFunction;
    };
    virtual_account: {
        created: WebHookFunction;
        credited: WebHookFunction;
        closed: WebHookFunction;
    };
}
export interface IRazorWebHookPayload {
    entity: "event";
    account_id: string;
    event: WebHookEvent;
    contains: EntityContain[];
    payload: {
        [key: string]: {
            entity: any;
        };
    };
    created_at: number;
}
/**
 * ## Razorpay Webhooks
 * Webhooks allow you to build or set up integrations that subscribe to certain
 * events on Razorpay APIs. When one of those events is triggered, we send an
 * HTTP POST payload in JSON to the webhook's configured URL.
 *
 * @class RazorWebhook
 * @constructor IRazorWebHookPayload payload
 */
export declare class RazorWebhook {
    private _payload;
    private _handler;
    constructor(payload: IRazorWebHookPayload);
    protected get TAG(): string;
    protected get payload(): IRazorWebHookPayload;
    get handler(): RazorWebhookHandler;
    /**
     * ### Execute Webhook Computation
     * @return Promise<any>
     */
    execute(): Promise<any>;
}
export declare class RazorWebhookHandler {
    private _handler;
    /**
     * #### ``GET`` Event Handlers
     * @return IActionHandler
     */
    get handler(): IActionHandler;
    /**
     * #### ``SET`` Event Handle For: `order.paid`
     * Triggered when an order is successfully paid.
     * @param WebHookFunction fn
     */
    set orderPaid(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `refund.created`
     * Triggered when you create a refund.
     * @param WebHookFunction fn
     */
    set refundCreated(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `payment.authorized`
     * Triggered when a payment is authorized.
     * @param WebHookFunction fn
     */
    set paymentAuthorized(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `payment.captured`
     * Triggered when a payment is successfully captured.
     * @param WebHookFunction fn
     */
    set paymentCaptured(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `payment.failed`
     * Triggered when a payment fails.
     * @param WebHookFunction fn
     */
    set paymentFailed(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `payment.dispute.created`
     * Triggered when a dispute is raised by the customer's issuing bank against a payment.
     * @param WebHookFunction fn
     */
    set disputeCreated(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `payment.dispute.won`
     * Triggered when a merchant has won a dispute against a payment.
     * @param WebHookFunction fn
     */
    set disputeWon(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `payment.dispute.lost`
     * Triggered when a merchant has lost a dispute against a payment.
     * @param WebHookFunction fn
     */
    set disputeLost(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `payment.dispute.closed`
     * Triggered when a dispute is closed.
     * @param WebHookFunction fn
     */
    set disputeClosed(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `invoice.partially_paid`
     * Triggered when a partial payment is made against an invoice.
     * @param WebHookFunction fn
     */
    set invoicePartiallyPaid(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `invoice.paid`
     * Triggered when an invoice is successfully paid.
     * @param WebHookFunction fn
     */
    set invoicePaid(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `invoice.expired`
     * Triggered when an invoice expires.
     * @param WebHookFunction fn
     */
    set invoiceExpired(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `subscription.activated`
     * Sent when the subscription moves to the `active` state either from the
     * `authenticated`, `pending` or `halted` state. If a subscription moves to
     * the `active` state from the `pending` or `halted` state, only the subsequent
     * invoices that are generated are charged. Existing invoices that were
     * already generated are not charged.
     * @param WebHookFunction fn
     */
    set subscriptionActivated(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `subscription.charged`
     * Sent every time a successful charge is made on the subscription.
     * @param WebHookFunction fn
     */
    set subscriptionCharged(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `subscription.completed`
     * Sent when all the invoices are generated for a subscription and the
     * subscription moves to the `completed` state.
     * @param WebHookFunction fn
     */
    set subscriptionCompleted(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `subscription.updated`
     * Sent when a subscription is successfully updated. There is no state
     * change when a subscription is updated.
     * @param WebHookFunction fn
     */
    set subscriptionUpdated(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `subscription.pending`
     * Sent when the subscription moves to the `pending` state. This happens
     * when a charge on the card fails. We try to charge the card on a
     * periodic basis while it is in the `pending` state. If the payment fails
     * again, the webhook is triggered again.
     * @param WebHookFunction fn
     */
    set subscriptionPending(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `subscription.halted`
     * Sent when all retries have been exhausted and the subscription moves
     * from the `pending` state to the `halted` state. The customer has to
     * manually retry the charge or change the card linked to the subscription,
     * for the subscription to move back to the `active` state.
     * @param WebHookFunction fn
     */
    set subscriptionHalted(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `subscription.cancelled`
     * Sent when a subscription is `cancelled` and the subscription moves to the
     * `cancelled` state.
     * @param WebHookFunction fn
     */
    set subscriptionCancelled(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `settlement.processed`
     * Triggered when a transfer made to a linked account is settled with the
     * parent merchant. (Available only for [Razorpay Route](https://razorpay.com/docs/webhooks/route/)).
     * @param WebHookFunction fn
     */
    set settlementProcessed(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `virtual_account.created`
     * Triggered when a virtual account is created.
     * @param WebHookFunction fn
     */
    set virtualAccountCreated(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `virtual_account.credited`
     * Triggered when a payment is made to a virtual account.
     * @param WebHookFunction fn
     */
    set virtualAccountCredited(fn: WebHookFunction);
    /**
     * #### ``SET`` Event Handle For: `virtual_account.closed`
     * Triggered when a virtual account expires on a date set by you or is
     * manually closed by you.
     * @param WebHookFunction fn
     */
    set virtualAccountClosed(fn: WebHookFunction);
}
