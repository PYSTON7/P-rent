const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

// GET ACCESS TOKEN
async function getAccessToken() {

    const url =
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const auth =
        Buffer.from(
            `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
        ).toString("base64");

    const response =
        await axios.get(url, {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });

    return response.data.access_token;
}


// STK PUSH ROUTE
app.post("/stkpush", async (req, res) => {

    const { phone, amount } = req.body;

    const token = await getAccessToken();

    const timestamp = new Date()
        .toISOString()
        .replace(/[-T:\.Z]/g, "")
        .slice(0, 14);

    const password = Buffer.from(
        process.env.SHORTCODE + process.env.PASSKEY + timestamp
    ).toString("base64");


    const data = {
        BusinessShortCode: process.env.SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "P-rent",
        TransactionDesc: "Rent Payment"
    };


    try {
        const response =
            await axios.post(
                "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        res.json(response.data);

    } catch (error) {

        res.status(500).json(error.response.data);
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});