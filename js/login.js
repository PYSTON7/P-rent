// CURRENT ROLE
let currentRole = "tenant";

// SWITCH BETWEEN TENANT AND LANDLORD
function switchRole(role) {
    currentRole = role;

    document.getElementById("form-title").textContent =
        role === "tenant" ? "Tenant Login" : "Landlord Login";

    document.getElementById("tenant-toggle")
        .classList.toggle("active", role === "tenant");
    document.getElementById("landlord-toggle")
        .classList.toggle("active", role === "landlord");

    // SHOW/HIDE APARTMENT DROPDOWN
    const apartmentGroup = document.getElementById("apartment-group");
    apartmentGroup.style.display = role === "tenant" ? "block" : "none";

    // CLEAR ERRORS
    document.getElementById("phone-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("login-error").textContent = "";
}


// POPULATE APARTMENT DROPDOWN
function populateApartments() {
    const apartments = JSON.parse(localStorage.getItem("apartments")) || [];
    const select = document.getElementById("login-apartment");
    select.innerHTML = `<option value="">-- Select Your Apartment --</option>`;

    apartments.forEach(apartment => {
        const option = document.createElement("option");
        option.value = apartment.name;
        option.textContent = apartment.name;
        select.appendChild(option);
    });
}

populateApartments();


// LOGIN FORM
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") event.preventDefault();
});

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // CLEAR ERRORS
    document.getElementById("phone-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("login-error").textContent = "";

    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    let isValid = true;

    if (phone === "") {
        document.getElementById("phone-error").textContent =
            "Phone number is required";
        isValid = false;
    } else if (!/^0\d{9}$/.test(phone)) {
        document.getElementById("phone-error").textContent =
            "Enter a valid phone number e.g 0712345678";
        isValid = false;
    }

    if (password === "") {
        document.getElementById("password-error").textContent =
            "Password is required";
        isValid = false;
    }

    // TENANT MUST SELECT APARTMENT
    let selectedApartment = "";
    if (currentRole === "tenant") {
        selectedApartment = document.getElementById("login-apartment").value;
        if (selectedApartment === "") {
            document.getElementById("login-error").textContent =
                "Please select your apartment";
            isValid = false;
        }
    }

    if (!isValid) return;

    // GET USERS
    const users = JSON.parse(localStorage.getItem("users")) || {
        tenants: [],
        landlords: []
    };

    const userList = currentRole === "tenant"
        ? users.tenants
        : users.landlords;

    let matchedUser;

    if (currentRole === "tenant") {
        // MATCH PHONE + PASSWORD + APARTMENT
        matchedUser = userList.find(user =>
            user.phone === phone &&
            user.password === password &&
            user.apartment === selectedApartment
        );
    } else {
        // LANDLORD - MATCH PHONE + PASSWORD ONLY
        matchedUser = userList.find(user =>
            user.phone === phone &&
            user.password === password
        );
    }

    if (!matchedUser) {
        document.getElementById("login-error").textContent =
            currentRole === "tenant"
                ? "Incorrect phone, password, or apartment"
                : "Incorrect phone number or password";
        return;
    }

    // SAVE SESSION
    localStorage.setItem("loggedInUser", JSON.stringify({
        name: matchedUser.name,
        phone: matchedUser.phone,
        role: currentRole,
        apartment: matchedUser.apartment || null,
        room: matchedUser.room || null
    }));

    // REDIRECT
    if (currentRole === "tenant") {
        window.location.href = "dashboard.html";
    } else {
        window.location.href = "admin.html";
    }
});