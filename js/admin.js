// LOCAL STORAGE


let apartments =
    JSON.parse(localStorage.getItem("apartments")) || [];

let tenants =
    JSON.parse(localStorage.getItem("tenants")) || [];



// TARGET ELEMENTS


// APARTMENT FORM
const apartmentForm =
    document.getElementById("apartment-form");

const aptName =
    document.getElementById("apt-name");

const aptLocation =
    document.getElementById("apt-location");

const aptRooms =
    document.getElementById("apt-rooms");

const aptLandlord =
    document.getElementById("apt-landlord");


// TENANT FORM
const tenantForm =
    document.getElementById("add-tenant-form");

const tenantName =
    document.getElementById("tenant-name");

const tenantPhone =
    document.getElementById("tenant-phone");

const tenantApartment =
    document.getElementById("tenant-apartment");

const tenantRoom =
    document.getElementById("tenant-room");

const tenantRent =
    document.getElementById("tenant-rent");

const tenantPassword =
    document.getElementById("tenant-password");


// DISPLAY AREAS
const apartmentList =
    document.getElementById("admin-apartment-list");

const tenantList =
    document.getElementById("admin-tenant-list");


// STATS
const totalTenants =
    document.getElementById("total-tenants");

const totalApartments =
    document.getElementById("total-apartments");

const totalRent =
    document.getElementById("total-rent");



// UPDATE DASHBOARD STATS


function updateStats() {

    totalTenants.textContent =
        tenants.length;

    totalApartments.textContent =
        apartments.length;


    let rentTotal = 0;

    tenants.forEach((tenant) => {

        rentTotal += tenant.rent;
    });

    totalRent.textContent =
        `KES ${rentTotal}`;
}


// SAVE TO LOCAL STORAGE


function saveData() {

    localStorage.setItem(
        "apartments",
        JSON.stringify(apartments)
    );

    localStorage.setItem(
        "tenants",
        JSON.stringify(tenants)
    );
}



// DISPLAY APARTMENTS


function displayApartments() {

    apartmentList.innerHTML = "";

    apartments.forEach((apartment, index) => {

        const card =
            document.createElement("article");

        card.classList.add("apartment-card");


        card.innerHTML = `
            <h3>${apartment.name}</h3>

            <p>
                <strong>Location:</strong>
                ${apartment.location}
            </p>

            <p>
                <strong>Available Rooms:</strong>
                ${apartment.rooms}
            </p>

            <p>
                <strong>Landlord:</strong>
                ${apartment.landlord}
            </p>

            <button
                class="delete-btn"
                onclick="deleteApartment(${index})"
            >
                Delete
            </button>
        `;

        apartmentList.appendChild(card);
    });
}



// DISPLAY TENANTS


function displayTenants() {

    tenantList.innerHTML = "";

    tenants.forEach((tenant, index) => {

        const card =
            document.createElement("article");

        card.classList.add("apartment-card");


        card.innerHTML = `
            <h3>${tenant.name}</h3>

            <p>
                <strong>Apartment:</strong>
                ${tenant.apartment}
            </p>

            <p>
                <strong>Room:</strong>
                ${tenant.room}
            </p>

            <p>
                <strong>Phone:</strong>
                ${tenant.phone}
            </p>

            <p>
                <strong>Balance:</strong>
                KES ${tenant.balance}
            </p>

            <button
                class="delete-btn"
                onclick="deleteTenant(${index})"
            >
                Delete
            </button>
        `;

        tenantList.appendChild(card);
    });
}


// POPULATE APARTMENT DROPDOWN


function populateApartmentDropdown() {

    tenantApartment.innerHTML =
        `<option value="">
            -- Select Apartment --
        </option>`;


    apartments.forEach((apartment) => {

        const option =
            document.createElement("option");

        option.value = apartment.name;

        option.textContent =
            apartment.name;

        tenantApartment.appendChild(option);
    });
}



// ADD APARTMENT


apartmentForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // VALIDATION
    if (
        aptName.value === "" ||
        aptLocation.value === "" ||
        aptRooms.value === "" ||
        aptLandlord.value === ""
    ) {

        alert("Please fill all apartment fields");

        return;
    }


    const newApartment = {

        name: aptName.value,

        location: aptLocation.value,

        rooms: Number(aptRooms.value),

        landlord: aptLandlord.value
    };


    apartments.push(newApartment);

    saveData();

    displayApartments();

    populateApartmentDropdown();

    updateStats();

    apartmentForm.reset();

    alert("Apartment added successfully!");
});



// ADD TENANT


tenantForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // VALIDATION
    if (
        tenantName.value === "" ||
        tenantPhone.value === "" ||
        tenantApartment.value === "" ||
        tenantRoom.value === "" ||
        tenantRent.value === "" ||
        tenantPassword.value === ""
    ) {

        alert("Please fill all tenant fields");

        return;
    }


    const newTenant = {

        name: tenantName.value,

        phone: tenantPhone.value,

        apartment: tenantApartment.value,

        room: tenantRoom.value,

        rent: Number(tenantRent.value),

        balance: Number(tenantRent.value),

        waterBill: 2500,

        password: tenantPassword.value,

        payments: []
    };


    tenants.push(newTenant);

    saveData();

    displayTenants();

    updateStats();

    tenantForm.reset();

    alert("Tenant added successfully!");
});


// DELETE APARTMENT


function deleteApartment(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this apartment?"
        );

    if (!confirmDelete) return;


    apartments.splice(index, 1);

    saveData();

    displayApartments();

    populateApartmentDropdown();

    updateStats();
}



// DELETE TENANT


function deleteTenant(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this tenant?"
        );

    if (!confirmDelete) return;


    tenants.splice(index, 1);

    saveData();

    displayTenants();

    updateStats();
}



// INITIAL LOAD


displayApartments();

displayTenants();

populateApartmentDropdown();

updateStats();