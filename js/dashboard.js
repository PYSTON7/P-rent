// EXAMPLE DASHBOARD DATA
const dashboardData = {
    rentBalance: 12000,
    waterBill: 2500,
    payments: [
        {
            date: "2026-05-01",
            type: "Rent",
            amount: 12000,
            status: "Paid"
        },
        {
            date: "2026-05-03",
            type: "Water Bill",
            amount: 2500,
            status: "Pending"
        }
    ]
};

// DATA STORAGE
if (!localStorage.getItem("dashboardData")) {
    localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
}

// RETRIEVE DATA
const data = JSON.parse(localStorage.getItem("dashboardData"));

// DISPLAY RENT BALANCE
document.getElementById("rent-balance").textContent = `KES ${data.rentBalance}`;

// DISPLAY WATER BILL
document.getElementById("water-bill").textContent = `KES ${data.waterBill}`;

// TARGET PAYMENT TABLE
const paymentTable = document.getElementById("payment-table-body");

// DISPLAY PAYMENT HISTORY
data.payments.forEach(payment => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${payment.date}</td>
        <td>${payment.type}</td>
        <td>KES ${payment.amount}</td>
        <td>${payment.status}</td>
    `;

    paymentTable.appendChild(row);
});

// PAY RENT BUTTON
document.getElementById("pay-rent-btn").addEventListener("click", () => {
    alert("Redirecting to Rent Payment...");
});

// PAY WATER BUTTON
document.getElementById("pay-water-btn").addEventListener("click", () => {
    alert("Redirecting to Water Bill Payment...");
});