const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const stripe = new Stripe('sk_test_51JgJ3xGqqFvu0TqeudHBXsa5QoLOdnO2doiAcvHbIS98gupe9CybVyz4uKAq9VtxBY2FCI16IQuIQFfaW0p1BVa0002Ipe3GJ3');

const app = express();

// Middeleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
    console.log(req.body);
    //res.send("recibido");
    const { id, amount } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'mxn',
            description: 'Basket of products',
            payment_method: id,
            confirm: true
        });
        console.log(payment);
        return res.status(200).json({ message: "Successful payment" });
    } catch (error) {
        console.log("###Error###");
        return res.json({message: error.raw.message});
    }
});

app.listen(3001, () => console.log('Server listening port ', 3001));