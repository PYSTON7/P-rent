// CHECK LOGIN SESSION


const currentTenant =
    JSON.parse(localStorage.getItem("loggedInTenant"));


// REDIRECT IF NOT LOGGED IN
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


// DISPLAY TENANT DETAILS


tenantNameDisplay.textContent =
    currentTenant.name;


tenantApartmentDisplay.textContent =
    `${currentTenant.apartment} - Room ${currentTenant.room}`;



// DISPLAY BALANCES


function displayBalances() {

    rentBalance.textContent =
        `KES ${currentTenant.balance}`;


    waterBill.textContent =
        `KES ${currentTenant.waterBill}`;
}


// LOAD BALANCES

displayBalances();



// DISPLAY PAYMENT HISTORY


function displayPayments() {

    paymentTable.innerHTML = "";


    // EMPTY STATE
    if (
        !currentTenant.payments ||
        currentTenant.payments.length === 0
    ) {

        paymentTable.innerHTML = `
            <tr>
                <td colspan="4">
                    No payments made yet.
                </td>
            </tr>
        `;

        return;
    }


   // LOOP THROUGH PAYMENTS
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


// LOAD PAYMENT HISTORY

displayPayments();


// PAYMENT SYSTEM


paymentForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // CLEAR ERROR
    paymentError.textContent = "";


    // GET AMOUNT
    const paymentAmount =
        Number(paymentAmountInput.value);


    // VALIDATION
    if (
        isNaN(paymentAmount) ||
        paymentAmount <= 0
    ) {

        paymentError.textContent =
            "Enter a valid payment amount";

        return;
    }


    // PREVENT OVERPAYMENT
    if (paymentAmount > currentTenant.balance) {

        paymentError.textContent =
            "Amount exceeds rent balance";

        return;
    }


    // UPDATE BALANCE
    currentTenant.balance -= paymentAmount;


    // CREATE PAYMENT OBJECT
    const newPayment = {

        date: new Date().toLocaleDateString(),

        type: "Rent Payment",

        amount: paymentAmount,

        status: "Paid"
    };


    // ADD TO HISTORY
    currentTenant.payments.push(newPayment);


    // UPDATE TENANTS ARRAY
  

    let tenants =
        JSON.parse(localStorage.getItem("tenants")) || [];


    tenants = tenants.map((tenant) => {

        if (tenant.phone === currentTenant.phone) {

            return currentTenant;
        }

        return tenant;
    });


    // SAVE UPDATED TENANTS
    localStorage.setItem(
        "tenants",
        JSON.stringify(tenants)
    );


    // UPDATE SESSION
    localStorage.setItem(
        "loggedInTenant",
        JSON.stringify(currentTenant)
    );


    // REFRESH UI
    displayBalances();

    displayPayments();


    // RESET FORM
    paymentForm.reset();


    // SUCCESS MESSAGE
    alert("Payment successful!");
});



// LOGOUT SYSTEM


logoutBtn.addEventListener("click", function() {

    localStorage.removeItem("loggedInTenant");

    alert("Logged out successfully");

    window.location.href = "login.html";
});


