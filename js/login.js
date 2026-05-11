
// =============================
// ELEMENTS
// =============================
const loginForm =
    document.getElementById("login-form");

const phoneInput =
    document.getElementById("phone");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("login-error");

const phoneError =
    document.getElementById("phone-error");

const passwordError =
    document.getElementById("password-error");

const apartmentGroup =
    document.getElementById("apartment-group");

const apartmentSelect =
    document.getElementById("login-apartment");

const tenantToggle =
    document.getElementById("tenant-toggle");

const landlordToggle =
    document.getElementById("landlord-toggle");

const formTitle =
    document.getElementById("form-title");


// =============================
// ROLE STATE
// =============================
let role = "tenant";


// =============================
// SWITCH ROLE FUNCTION
// =============================
window.switchRole = function (selectedRole) {

    role = selectedRole;

    if (role === "tenant") {

        tenantToggle.classList.add("active");
        landlordToggle.classList.remove("active");

        formTitle.textContent = "Tenant Login";

        apartmentGroup.style.display = "block";

    } else {

        landlordToggle.classList.add("active");
        tenantToggle.classList.remove("active");

        formTitle.textContent = "Landlord Login";

        apartmentGroup.style.display = "none";
    }
};


// =============================
// LOAD APARTMENTS (FOR TENANTS)
// =============================
function loadApartments() {

    const apartments =
        JSON.parse(localStorage.getItem("apartments")) || [];

    apartmentSelect.innerHTML =
        `<option value="">-- Select Apartment --</option>`;

    apartments.forEach((apt) => {

        const option =
            document.createElement("option");

        option.value = apt.name;

        option.textContent = apt.name;

        apartmentSelect.appendChild(option);
    });
}

loadApartments();


// =============================
// LOGIN SUBMIT
// =============================
loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // RESET ERRORS
    loginError.textContent = "";
    phoneError.textContent = "";
    passwordError.textContent = "";


    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();


    // VALIDATION
    if (!phone) {
        phoneError.textContent = "Phone required";
        return;
    }

    if (!password) {
        passwordError.textContent = "Password required";
        return;
    }


    // =============================
    // TENANT LOGIN
    // =============================
    if (role === "tenant") {

        const apartment =
            apartmentSelect.value;


        if (!apartment) {

            loginError.textContent =
                "Select apartment";

            return;
        }


        const tenants =
            JSON.parse(localStorage.getItem("tenants")) || [];


        const tenant =
            tenants.find(t =>
                t.phone === phone &&
                t.password === password &&
                t.apartment === apartment
            );


        if (!tenant) {

            loginError.textContent =
                "Invalid tenant credentials";

            return;
        }


        // SAVE SESSION
        localStorage.setItem(
            "loggedInTenant",
            JSON.stringify(tenant)
        );


        alert("Login successful");

        window.location.href = "dashboard.html";

    }


    // =============================
    // LANDLORD LOGIN
    // =============================
    else {

        const landlords =
            JSON.parse(localStorage.getItem("landlords")) || [];


        const landlord =
            landlords.find(l =>
                l.phone === phone &&
                l.password === password
            );


        if (!landlord) {

            loginError.textContent =
                "Invalid landlord credentials";

            return;
        }


        localStorage.setItem(
            "loggedInLandlord",
            JSON.stringify(landlord)
        );


        alert("Landlord login successful");

        window.location.href = "admin.html";
    }
});
