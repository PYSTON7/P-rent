// CHECK IF LANDLORD IS LOGGED IN
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "landlord") {
    alert("Access denied. Landlords only.");
    window.location.href = "login.html";
}

// WELCOME MESSAGE
document.getElementById("welcome-message").textContent =
    `Welcome, ${loggedInUser.name}`;


// GET DATA FROM LOCAL STORAGE
let apartments = JSON.parse(localStorage.getItem("apartments")) || [];
let tenants = JSON.parse(localStorage.getItem("tenants")) || [];
const users = JSON.parse(localStorage.getItem("users")) || {
    tenants: [],
    landlords: []
};


// UPDATE STATS
function updateStats() {
    apartments = JSON.parse(localStorage.getItem("apartments")) || [];
    tenants = JSON.parse(localStorage.getItem("tenants")) || [];

    // TOTAL TENANTS
    document.getElementById("total-tenants").textContent =
        tenants.length;

    // TOTAL APARTMENTS
    document.getElementById("total-apartments").textContent =
        apartments.length;

    // TOTAL RENT EXPECTED
    const totalRent = tenants.reduce((sum, tenant) => {
        return sum + Number(tenant.rent);
    }, 0);

    document.getElementById("total-rent").textContent =
        `KES ${totalRent.toLocaleString()}`;
}


// DISPLAY APARTMENTS
function displayApartments() {
    const list = document.getElementById("admin-apartment-list");
    list.innerHTML = "";

    if (apartments.length === 0) {
        list.innerHTML = "<p>No apartments added yet.</p>";
        return;
    }

    apartments.forEach((apartment, index) => {
        const card = document.createElement("article");
        card.classList.add("apartment-card");

        card.innerHTML = `
            <h3>${apartment.name}</h3>
            <p><strong>Location:</strong> ${apartment.location}</p>
            <p><strong>Available Rooms:</strong> ${apartment.rooms}</p>
            <p><strong>Landlord Contact:</strong> ${apartment.landlord}</p>
            <button class="delete-btn" onclick="deleteApartment(${index})">
                Delete
            </button>
        `;

        list.appendChild(card);
    });
}


// DISPLAY TENANTS
function displayTenants() {
    const list = document.getElementById("admin-tenant-list");
    list.innerHTML = "";

    if (tenants.length === 0) {
        list.innerHTML = "<p>No tenants registered yet.</p>";
        return;
    }

    tenants.forEach((tenant, index) => {
        const card = document.createElement("article");
        card.classList.add("tenant-card");

        card.innerHTML = `
            <h3>${tenant.name}</h3>
            <p><strong>Apartment:</strong> ${tenant.apartment}</p>
            <p><strong>Room:</strong> ${tenant.room}</p>
            <p><strong>Rent:</strong> KES ${Number(tenant.rent).toLocaleString()}</p>
            <button class="delete-btn" onclick="deleteTenant(${index})">
                Remove Tenant
            </button>
        `;

        list.appendChild(card);
    });
}


// ADD APARTMENT FORM
const apartmentForm = document.getElementById("apartment-form");

// PREVENT ENTER FROM SUBMITTING EARLY
apartmentForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") event.preventDefault();
});

apartmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // CLEAR ERRORS
    document.getElementById("apt-name-error").textContent = "";
    document.getElementById("apt-location-error").textContent = "";
    document.getElementById("apt-rooms-error").textContent = "";
    document.getElementById("apt-landlord-error").textContent = "";

    const name = document.getElementById("apt-name").value.trim();
    const location = document.getElementById("apt-location").value.trim();
    const rooms = document.getElementById("apt-rooms").value.trim();
    const landlord = document.getElementById("apt-landlord").value.trim();

    let isValid = true;

    // VALIDATION
    if (name === "") {
        document.getElementById("apt-name-error").textContent =
            "Apartment name is required";
        isValid = false;
    }

    if (location === "") {
        document.getElementById("apt-location-error").textContent =
            "Location is required";
        isValid = false;
    }

    if (rooms === "") {
        document.getElementById("apt-rooms-error").textContent =
            "Number of rooms is required";
        isValid = false;
    }

    if (landlord === "") {
        document.getElementById("apt-landlord-error").textContent =
            "Landlord contact is required";
        isValid = false;
    } else if (!/^0\d{9}$/.test(landlord)) {
        document.getElementById("apt-landlord-error").textContent =
            "Enter a valid phone number e.g 0712345678";
        isValid = false;
    }

    if (!isValid) return;

    // CREATE APARTMENT
    const newApartment = { name, location, rooms, landlord };

    // SAVE TO LOCAL STORAGE
    apartments.push(newApartment);
    localStorage.setItem("apartments", JSON.stringify(apartments));

    // REFRESH
    displayApartments();
    updateStats();
    apartmentForm.reset();

    alert("Apartment added successfully!");
});


// DELETE APARTMENT
function deleteApartment(index) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this apartment?"
    );

    if (!confirmDelete) return;

    apartments.splice(index, 1);
    localStorage.setItem("apartments", JSON.stringify(apartments));

    displayApartments();
    updateStats();

    alert("Apartment deleted successfully!");
}


// DELETE TENANT
function deleteTenant(index) {
    const confirmDelete = confirm(
        "Are you sure you want to remove this tenant?"
    );

    if (!confirmDelete) return;

    tenants.splice(index, 1);
    localStorage.setItem("tenants", JSON.stringify(tenants));

    displayTenants();
    updateStats();

    alert("Tenant removed successfully!");
}


// LOGOUT BUTTON - add to nav dynamically
const nav = document.querySelector(".nav-links");
const logoutItem = document.createElement("li");
logoutItem.innerHTML = `<a href="#" id="logout-btn">Logout</a>`;
nav.appendChild(logoutItem);

document.getElementById("logout-btn").addEventListener("click", function() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});


// INITIAL LOAD
updateStats();
displayApartments();
displayTenants();