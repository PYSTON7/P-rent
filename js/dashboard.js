// =============================
// LOGIN CHECK
// =============================
const currentTenant =
    JSON.parse(localStorage.getItem("loggedInTenant"));

if (!currentTenant) {
    alert("Please login first");
    window.location.href = "login.html";
}


// =============================
// ELEMENTS
// =============================
const nameDisplay =
    document.getElementById("tenant-name-display");

const aptDisplay =
    document.getElementById("tenant-apartment-display");

const rentBalance =
    document.getElementById("rent-balance");

const waterBill =
    document.getElementById("water-bill");

const paymentForm =
    document.getElementById("payment-form");

const paymentAmount =
    document.getElementById("payment-amount");

const paymentError =
    document.getElementById("payment-error");

const tableBody =
    document.getElementById("payment-table-body");

const logoutBtn =
    document.getElementById("logout-btn");

const mpesaBtn =
    document.getElementById("mpesa-pay-btn");

const mpesaPhone =
    document.getElementById("mpesa-phone");

const mpesaError =
    document.getElementById("mpesa-error");


// =============================
// DISPLAY USER INFO
// =============================
nameDisplay.textContent =
    currentTenant.name;

aptDisplay.textContent =
    `${currentTenant.apartment} - Room ${currentTenant.room}`;


// =============================
// BALANCE DISPLAY
// =============================
function displayBalances() {

    rentBalance.textContent =
        `KES ${currentTenant.balance}`;

    waterBill.textContent =
        `KES ${currentTenant.waterBill}`;
}

displayBalances();


// =============================
// PAYMENT HISTORY
// =============================
function displayPayments() {

    tableBody.innerHTML = "";

    if (!currentTenant.payments?.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="4">No payments yet</td>
            </tr>
        `;

        return;
    }

    currentTenant.payments.forEach(p => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${p.date}</td>
            <td>${p.type}</td>
            <td>KES ${p.amount}</td>
            <td>${p.status}</td>
        `;

        tableBody.appendChild(row);
    });
}

displayPayments();


// =============================
// LOCAL PAYMENT (OPTIONAL)
// =============================
paymentForm.addEventListener("submit", (e) => {

    e.preventDefault();

    paymentError.textContent = "";

    const amount = Number(paymentAmount.value);

    if (isNaN(amount) || amount <= 0) {

        paymentError.textContent =
            "Enter valid amount";

        return;
    }

    if (amount > currentTenant.balance) {

        paymentError.textContent =
            "Amount exceeds balance";

        return;
    }

    currentTenant.balance -= amount;

    currentTenant.payments.push({
        date: new Date().toLocaleString(),
        type: "Manual Payment",
        amount,
        status: "Paid"
    });

    saveTenant();

    displayBalances();
    displayPayments();

    paymentForm.reset();

    alert("Payment successful");
});


// =============================
// M-PESA PAYMENT (BACKEND CALL)
// =============================
mpesaBtn.addEventListener("click", async () => {

    mpesaError.textContent = "";

    const phone = mpesaPhone.value;
    const amount = Number(paymentAmount.value);

    if (!phone) {

        mpesaError.textContent =
            "Enter phone number";

        return;
    }

    if (isNaN(amount) || amount <= 0) {

        mpesaError.textContent =
            "Enter amount first";

        return;
    }

    try {

        const res = await fetch("http://localhost:3000/stkpush", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                phone,
                amount,
                tenantId: currentTenant.phone
            })
        });

        const data = await res.json();

        console.log(data);

        alert("STK Push sent. Check phone.");

    } catch (err) {

        mpesaError.textContent =
            "Payment failed";
    }
});


// =============================
// SAVE TO LOCAL STORAGE
// =============================
function saveTenant() {

    let tenants =
        JSON.parse(localStorage.getItem("tenants")) || [];

    tenants = tenants.map(t => {

        if (t.phone === currentTenant.phone) {
            return currentTenant;
        }

        return t;
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


// =============================
// LOGOUT
// =============================
logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("loggedInTenant");

    window.location.href = "login.html";
});

