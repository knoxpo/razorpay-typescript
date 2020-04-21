import { Razorpay } from '../dist/razorpay';

const razorConfig = {
    authKey: {
        key_id: process.env.KEY_ID, // your `KEY_ID`
        key_secret: process.env.KEY_SECRET // your `KEY_SECRET`
    },
    headers: {}
};
const rzp = new Razorpay(razorConfig);

// --------------------
// Payments
// --------------------

// Fetches all payments
rzp.payments.fetchAll({
    from: (new Date('Aug 25, 2016')).getTime(),
    to: (new Date('Aug 30, 2016')).getTime()
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})

// Fetch a particular payment
rzp.payments.fetch('pay_6CnVGA5eq4D7Ce').then((data) => {
    // success
    console.log(data)
}).catch((error) => {
    // failure
    console.log(error)
})

// Capture a particular payment
rzp.payments.capture('pay_6CnVGA5eq4D7Ce', 1000, 'INR').then((data) => {
    // success
    console.log(data)
}).catch((error) => {
    console.log(error)
    // error
})

rzp.payments.orderPayments('order_6kWIxkrdH3hJWM').then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
    // error
})


// -------------------------
// Customers
// -------------------------
rzp.customers.create({
    name: 'selvagsz',
    email: 'test@razorpay.com',
    contact: '123456789'
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
    // error
})

rzp.customers.customer('cust_6fpspJYDovP0Tg').edit({
    name: 'selvagsz',
    email: 'test@razorpay.com',
    contact: '987654321'
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
    // error
})

rzp.customers.fetch('cust_6fpspJYDovP0Tg').then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
    // error
})

rzp.customers.customer('cust_6fpspJYDovP0Tg').fetchAllTokens().then((data) => {
    console.log(data)
}).catch((error) => {
    // error
    console.log(error)
})

rzp.customers.customer('cust_6fpspJYDovP0Tg').fetchToken('tkn_YDovP0Tg6fpsp').then((data) => {
    console.log(data)
}).catch((error) => {
    // error
    console.log(error)
})

rzp.customers.customer('cust_6fpspJYDovP0Tg').deleteToken('tkn_YDovP0Tg6fpsp').then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
    // error
})


// -------------------------
// Orders
// -------------------------

rzp.orders.fetchAll({
    from: (new Date('Aug 25, 2016')).getTime(),
    to: (new Date('Aug 30, 2016')).getTime(),
    count: 25
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})


// -------------------------
// Transfers
// -------------------------

// Fetch all transfers
rzp.routes.fetchAll({
    from: (new Date('Aug 25, 2016')).getTime(),
    to: (new Date('Dec 30, 2016')).getTime(),
    count: 25
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})

// Fetch all transfers made on a specific payment
rzp.routes.fetchAll({
    from: (new Date('Aug 25, 2016')).getTime(),
    to: (new Date('Dec 30, 2016')).getTime(),
    count: 25,
    payment_id: 'pay_6CnVGA5eq4D7Ce'
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})

// Fetch a particular transfer by ID
rzp.routes.fetch('trf_714iNLGsd7k36a').then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})

// Edit transfer
rzp.routes.edit('trf_714iNLGsd7k36a', {
    note1: 'This is a test note',
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})

// Create a transfer reversal
rzp.routes.reversal('trf_714iNLGsd7k36a', {
    amount: 200,
    currency: 'INR',
    notes: {
        note1: 'This is a test note'
    }
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})

// Create direct transfers
rzp.routes.transfer({
    account: 'acc_7HGyrafdeQDGfX',
    amount: 100,
    currency: 'INR'
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})

// Create transfers on a payment
rzp.payments.payment('pay_6CnVGA5eq4D7Ce').transfer([
    {
        account: 'acc_7HGyrafdeQDGfX',
        amount: 100,
        currency: 'INR'
    }
]).then((data) => {
    console.log(data)
}).catch((error) => {
    console.error(error)
})