# Razorpay Node SDK

[![npm](https://img.shields.io/npm/v/razorpay-typescript.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/razorpay-typescript)
[![Build Status](https://travis-ci.org/knoxpo/razorpay-typescript.svg?branch=master)](https://travis-ci.org/knoxpo/razorpay-typescript)

**[UNOFFICIAL]** TypeScript based Node.js SDK for [Razorpay API](https://docs.razorpay.com/docs/payments).

Read up here for getting started and understanding the payment flow with Razorpay: <https://docs.razorpay.com/docs/getting-started>

## Installation

```bash
npm i razorpay-typescript
```

## Documentation

Documentation of Razorpay's API and their usage is available at <https://docs.razorpay.com>

### Basic Usage

Instantiate the razorpay instance with `key_id` & `key_secret`. You can obtain the keys from the dashboard app ([https://dashboard.razorpay.com/#/app/keys](https://dashboard.razorpay.com/#/app/keys))

```ts
const instance: Razorpay = new Razorpay({
  authKey: {
      key_id: 'YOUR_KEY_ID',
      key_secret: 'YOUR_KEY_SECRET', 
  },
  headers: [... Your Headers ...],
});
```

The resources can be accessed via the instance. All the methods invocations follows the namespaced signature

```ts
// API signature
// {razorpayInstance}.{resourceName}.{methodName}(resourceId [, params])
// Build with neat response interfaces

// example
const paymentDetails: IRazorPaymentId = await instance.payments.fetch(paymentId);

// Additional neat functionality than official nodejs SDK
// now even store instances of all services
// with neat instance classes
const payment: RazorPayment = instance.payments.payment('your_payementId');
payment.transfer([
  {
      account: 'acc_7HGyrafdeQDGfX',
      amount: 100,
      currency: 'INR'
  }
]);
```

Every resource method returns a promise.

```ts
instance.payments
  .all({
    from: '2016-08-01',
    to: '2016-08-20',
  })
  .then(response => {
    // handle success
  })
  .catch(error => {
    // handle error
  });
```

## Supported Resources

- [Payments](https://github.com/razorpay/razorpay-node/wiki#payments)

- [Refunds](https://github.com/razorpay/razorpay-node/wiki#refunds)

- [Orders](https://github.com/razorpay/razorpay-node/wiki#orders)

- [Customers](https://github.com/razorpay/razorpay-node/wiki#customers)

- [Transfers](https://github.com/razorpay/razorpay-node/wiki#transfers)

- [Virtual Accounts](https://github.com/razorpay/razorpay-node/wiki#virtual-accounts)

- [Invoices](https://github.com/razorpay/razorpay-node/wiki#invoices)

- [Plans](https://github.com/razorpay/razorpay-node/wiki#plans)

- [Subscriptions](https://github.com/razorpay/razorpay-node/wiki#subscriptions)

- [Addons](https://github.com/razorpay/razorpay-node/wiki#addons)

- [Webhooks](https://github.com/razorpay/razorpay-node/wiki#webhooks)

- [Partner Auth](https://github.com/razorpay/razorpay-node/wiki#partner-auth)

---

## Development

```bash
npm install
```

## Testing

```bash
npm test
```

## Release

1.  Switch to `master` branch. Make sure you have the latest changes in the local master
2.  Update the `CHANGELOG.md` & bump the version in `package.json`
3.  Commit
4.  Tag the release & push to Github
5.  Create a release on GitHub using the website with more details about the release
6.  Publish to npm with `npm publish` command

## Licence

MIT Licensed. See [LICENSE.txt](LICENSE.txt) for more details

<hr/>
Razorpay [Unofficial SDK for TypeScript] is a Knoxpo original.
<br/>
<a href="https://knoxpo.com" target="_knoxpo"><img src="https://www.knoxpo.com/assets/logo.png" width="80"></a>