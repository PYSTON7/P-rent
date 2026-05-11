// =============================
// M-PESA PAYMENT (FIXED VERSION)
// =============================
mpesaBtn.addEventListener("click", async () => {

    mpesaError.textContent = "";

    const phone = mpesaPhone.value.trim();
    const amount = Number(paymentAmount.value);

    // VALIDATION
    if (!phone) {
        mpesaError.textContent = "Enter M-Pesa phone number";
        return;
    }

    if (!/^2547\d{8}$/.test(phone)) {
        mpesaError.textContent = "Use format 2547XXXXXXXX";
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        mpesaError.textContent = "Enter valid rent amount first";
        return;
    }

    // LOADING STATE
    mpesaBtn.disabled = true;
    mpesaBtn.textContent = "Processing...";

    try {

        const response = await fetch("http://localhost:3000/stkpush", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                phone: phone,
                amount: amount,
                tenantId: currentTenant.phone
            })
        });

        const data = await response.json();

        console.log("M-Pesa Response:", data);

        // SUCCESS MESSAGE
        alert("STK Push sent! Check your phone and enter PIN.");

        // OPTIONAL: Save pending transaction locally
        currentTenant.payments.push({
            date: new Date().toLocaleString(),
            type: "M-Pesa STK Push",
            amount: amount,
            status: "Pending"
        });

        saveTenant();
        displayPayments();

    } catch (error) {

        console.error(error);

        mpesaError.textContent =
            "Payment request failed. Try again.";

    } finally {

        mpesaBtn.disabled = false;
        mpesaBtn.textContent = "Pay via M-Pesa";
    }
});