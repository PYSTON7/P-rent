
// CHECK LOGIN SESSION


const currentTenant =
    JSON.parse(localStorage.getItem("loggedInTenant"));

if (!currentTenant) {

    alert("Please login first");

    window.location.href = "login.html";
}


// TARGET ELEMENTS


const tenantNameDisplay =
    document.getElementById("tenant-name-display");

const tenantApartmentDisplay =
    document.getElementById("tenant-apartment-display");

const rentBalance =
    document.getElementById("rent-balance");

const waterBill =
    document.getElementById("water-bill");

const paymentTable =
    document.getElementById("payment-table-body");

const paymentForm =
    document.getElementById("payment-form");

const paymentAmountInput =
    document.getElementById("payment-amount");

const paymentError =
    document.getElementById("payment-error");

const logoutBtn =
    document.getElementById("logout-btn");

const mpesaPhoneInput =
    document.getElementById("mpesa-phone");

const mpesaBtn =
    document.getElementById("mpesa-pay-btn");

const mpesaError =
    document.getElementById("mpesa-error");



// DISPLAY USER DETAILS


tenantNameDisplay.textContent =
    currentTenant.name;

tenantApartmentDisplay.textContent =
    `${currentTenant.apartment} - Room ${currentTenant.room}`;




// DISPLAY BALANCES


function displayBalances() {

    rentBalance.textContent =
        `KES ${currentTenant.balance || 0}`;

    waterBill.textContent =
        `KES ${currentTenant.waterBill || 0}`;
}

displayBalances();




// DISPLAY PAYMENT HISTORY


function displayPayments() {

    paymentTable.innerHTML = "";

    if (
        !currentTenant.payments ||
        currentTenant.payments.length === 0
    ) {

        paymentTable.innerHTML = `
            <tr>
                <td colspan="4">
                    No payments found
                </td>
            </tr>
        `;

        return;
    }

    currentTenant.payments.forEach((payment) => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${payment.date}</td>
            <td>${payment.type}</td>
            <td>KES ${payment.amount}</td>
            <td>${payment.status}</td>
        `;

        paymentTable.appendChild(row);
    });
}

displayPayments();




// UPDATE STORAGE FUNCTION


function updateTenantStorage() {

    let tenants =
        JSON.parse(localStorage.getItem("tenants")) || [];

    tenants = tenants.map((tenant) => {

        if (tenant.phone === currentTenant.phone) {

            return currentTenant;
        }

        return tenant;
    });

    localStorage.setItem(
        "tenants",
        JSON.stringify(tenants)
    );

    localStorage.setItem(
        "loggedInTenant",
        JSON.stringify(currentTenant)
    );
}




// LOCAL PAYMENT SYSTEM


paymentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    paymentError.textContent = "";

    const amount =
        Number(paymentAmountInput.value);

    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        paymentError.textContent =
            "Enter valid amount";

        return;
    }

    if (amount > currentTenant.balance) {

        paymentError.textContent =
            "Amount exceeds balance";

        return;
    }

    // DEDUCT BALANCE
    currentTenant.balance -= amount;

    // CREATE PAYMENT
    const payment = {

        date: new Date().toLocaleDateString(),

        type: "Rent Payment",

        amount: amount,

        status: "Paid"
    };

    // SAVE PAYMENT
    if (!currentTenant.payments) {

        currentTenant.payments = [];
    }

    currentTenant.payments.push(payment);

    // UPDATE STORAGE
    updateTenantStorage();

    // REFRESH UI
    displayBalances();

    displayPayments();

    // RESET FORM
    paymentForm.reset();

    alert("Payment successful!");
});



// M-PESA FRONTEND


mpesaBtn.addEventListener("click", function() {

    mpesaError.textContent = "";

    const phone =
        mpesaPhoneInput.value.trim();

    if (!/^2547\d{8}$/.test(phone)) {

        mpesaError.textContent =
            "Enter valid Safaricom number";

        return;
    }

    // SIMULATED PAYMENT
    const amount = 1000;

    // PREVENT NEGATIVE BALANCE
    if (currentTenant.balance <= 0) {

        mpesaError.textContent =
            "No rent balance remaining";

        return;
    }

    // DEDUCT RENT
    currentTenant.balance -= amount;

    if (currentTenant.balance < 0) {

        currentTenant.balance = 0;
    }

    // CREATE RECEIPT
    const receiptNumber =
        "PR" + Math.floor(Math.random() * 1000000);

    const payment = {

        date: new Date().toLocaleDateString(),

        type: "M-Pesa Payment",

        amount: amount,

        status: `Confirmed (${receiptNumber})`
    };

    // SAVE PAYMENT
    if (!currentTenant.payments) {

        currentTenant.payments = [];
    }

    currentTenant.payments.push(payment);

    // UPDATE STORAGE
    updateTenantStorage();

    // REFRESH UI
    displayBalances();

    displayPayments();

    alert(`
M-Pesa payment successful!

Receipt:
${receiptNumber}
    `);
});



// LOGOUT


logoutBtn.addEventListener("click", function() {

    localStorage.removeItem("loggedInTenant");

    alert("Logged out");

    window.location.href = "login.html";
});

