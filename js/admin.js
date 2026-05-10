function requireAdmin() {

    const role = localStorage.getItem("role");

    if (role !== "admin") {
        alert("Admins only!");
        window.location.href = "login.html";
    }

    requireAdmin();
}

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


// UPDATE STATS
function updateStats() {
    apartments = JSON.parse(localStorage.getItem("apartments")) || [];
    tenants = JSON.parse(localStorage.getItem("tenants")) || [];

    document.getElementById("total-tenants").textContent = tenants.length;
    document.getElementById("total-apartments").textContent = apartments.length;

    const totalRent = tenants.reduce((sum, tenant) => {
        return sum + Number(tenant.rent);
    }, 0);

    document.getElementById("total-rent").textContent =
        `KES ${totalRent.toLocaleString()}`;
}


// POPULATE APARTMENT DROPDOWN FOR ADD TENANT FORM
function populateApartmentDropdown() {
    const select = document.getElementById("tenant-apartment");
    select.innerHTML = `<option value="">-- Select Apartment --</option>`;

    apartments.forEach(apartment => {
        const option = document.createElement("option");
        option.value = apartment.name;
        option.textContent = apartment.name;
        select.appendChild(option);
    });
}


// DISPLAY APARTMENTS
function displayApartments() {
    const list = document.getElementById("admin-apartment-list");
    list.innerHTML = "";

    apartments = JSON.parse(localStorage.getItem("apartments")) || [];

    if (apartments.length === 0) {
        list.innerHTML = "<p>No apartments added yet.</p>";
        populateApartmentDropdown();
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

    populateApartmentDropdown();
}


// DISPLAY TENANTS
function displayTenants() {
    const list = document.getElementById("admin-tenant-list");
    list.innerHTML = "";

    tenants = JSON.parse(localStorage.getItem("tenants")) || [];

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
            <p><strong>Phone:</strong> ${tenant.phone}</p>
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

apartmentForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") event.preventDefault();
});

apartmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("apt-name-error").textContent = "";
    document.getElementById("apt-location-error").textContent = "";
    document.getElementById("apt-rooms-error").textContent = "";
    document.getElementById("apt-landlord-error").textContent = "";

    const name = document.getElementById("apt-name").value.trim();
    const location = document.getElementById("apt-location").value.trim();
    const rooms = document.getElementById("apt-rooms").value.trim();
    const landlord = document.getElementById("apt-landlord").value.trim();

    let isValid = true;

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

    const newApartment = { name, location, rooms, landlord };
    apartments.push(newApartment);
    localStorage.setItem("apartments", JSON.stringify(apartments));

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


// ADD TENANT FORM
const tenantForm = document.getElementById("add-tenant-form");

tenantForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") event.preventDefault();
});

tenantForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // CLEAR ERRORS
    document.getElementById("tenant-name-error").textContent = "";
    document.getElementById("tenant-phone-error").textContent = "";
    document.getElementById("tenant-apartment-error").textContent = "";
    document.getElementById("tenant-room-error").textContent = "";
    document.getElementById("tenant-rent-error").textContent = "";
    document.getElementById("tenant-password-error").textContent = "";

    const name = document.getElementById("tenant-name").value.trim();
    const phone = document.getElementById("tenant-phone").value.trim();
    const apartment = document.getElementById("tenant-apartment").value;
    const room = document.getElementById("tenant-room").value.trim();
    const rent = document.getElementById("tenant-rent").value.trim();
    const password = document.getElementById("tenant-password").value.trim();

    let isValid = true;

    if (name === "") {
        document.getElementById("tenant-name-error").textContent =
            "Tenant name is required";
        isValid = false;
    }

    if (phone === "") {
        document.getElementById("tenant-phone-error").textContent =
            "Phone number is required";
        isValid = false;
    } else if (!/^0\d{9}$/.test(phone)) {
        document.getElementById("tenant-phone-error").textContent =
            "Enter a valid phone number e.g 0712345678";
        isValid = false;
    }

    if (apartment === "") {
        document.getElementById("tenant-apartment-error").textContent =
            "Please select an apartment";
        isValid = false;
    }

    if (room === "") {
        document.getElementById("tenant-room-error").textContent =
            "Room number is required";
        isValid = false;
    }

    if (rent === "") {
        document.getElementById("tenant-rent-error").textContent =
            "Rent amount is required";
        isValid = false;
    }

    if (password === "") {
        document.getElementById("tenant-password-error").textContent =
            "Password is required";
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById("tenant-password-error").textContent =
            "Password must be at least 6 characters";
        isValid = false;
    }

    if (!isValid) return;

    // CHECK IF PHONE ALREADY EXISTS
    const existingTenant = tenants.find(t => t.phone === phone);
    if (existingTenant) {
        document.getElementById("tenant-phone-error").textContent =
            "This phone number is already registered";
        return;
    }

    // CREATE TENANT
    const newTenant = { name, phone, apartment, room, rent, password };

    // SAVE TO TENANTS LIST
    tenants.push(newTenant);
    localStorage.setItem("tenants", JSON.stringify(tenants));

    // ALSO SAVE TO USERS FOR LOGIN
    const users = JSON.parse(localStorage.getItem("users")) || {
        tenants: [],
        landlords: []
    };

    users.tenants.push({ name, phone, password, apartment, room });
    localStorage.setItem("users", JSON.stringify(users));

    displayTenants();
    updateStats();
    tenantForm.reset();

    alert(`Tenant ${name} added successfully!`);
});


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


// LOGOUT
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