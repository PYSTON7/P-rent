
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



// ROLE STATE

let role = "tenant";



// DEFAULT DATA (FOR TESTING)


// DEFAULT APARTMENTS
const defaultApartments = [

    {
        name: "Victoria Apartments"
    },

    {
        name: "White House Apartments"
    },

    {
        name: "Blue Kings Heights"
    }
];


// DEFAULT TENANTS
const defaultTenants = [

    {
        name: "John Doe",

        phone: "0712345678",

        password: "1234",

        apartment: "Victoria Apartments",

        room: "A1",

        balance: 5000,

        waterBill: 500,

        payments: []
    }
];


// DEFAULT LANDLORDS
const defaultLandlords = [

    {
        name: "Admin",

        phone: "0700000000",

        password: "admin123"
    }
];


// STORE DEFAULT DATA
if (!localStorage.getItem("apartments")) {

    localStorage.setItem(
        "apartments",
        JSON.stringify(defaultApartments)
    );
}


if (!localStorage.getItem("tenants")) {

    localStorage.setItem(
        "tenants",
        JSON.stringify(defaultTenants)
    );
}


if (!localStorage.getItem("landlords")) {

    localStorage.setItem(
        "landlords",
        JSON.stringify(defaultLandlords)
    );
}



// SWITCH ROLE

window.switchRole = function(selectedRole) {

    role = selectedRole;

    // TENANT LOGIN
    if (role === "tenant") {

        tenantToggle.classList.add("active");

        landlordToggle.classList.remove("active");

        formTitle.textContent =
            "Tenant Login";

        apartmentGroup.style.display =
            "block";
    }

    // LANDLORD LOGIN
    else {

        landlordToggle.classList.add("active");

        tenantToggle.classList.remove("active");

        formTitle.textContent =
            "Landlord Login";

        apartmentGroup.style.display =
            "none";
    }
};



// LOAD APARTMENTS

function loadApartments() {

    const apartments =
        JSON.parse(
            localStorage.getItem("apartments")
        ) || [];

    apartmentSelect.innerHTML =
        `<option value="">
            -- Select Apartment --
        </option>`;


    apartments.forEach((apartment) => {

        const option =
            document.createElement("option");

        option.value =
            apartment.name;

        option.textContent =
            apartment.name;

        apartmentSelect.appendChild(option);
    });
}

loadApartments();



// NORMALIZE PHONE

function normalizePhone(phone) {

    phone = phone.trim();

    // CONVERT 2547 TO 07
    if (phone.startsWith("254")) {

        return "0" + phone.slice(3);
    }

    return phone;
}



// LOGIN SYSTEM

loginForm.addEventListener(
    "submit",
    function(event) {

    event.preventDefault();


    // CLEAR ERRORS
    loginError.textContent = "";

    phoneError.textContent = "";

    passwordError.textContent = "";


    // GET VALUES
    const phone =
        normalizePhone(
            phoneInput.value
        );

    const password =
        passwordInput.value.trim();


    // VALIDATION
    if (!phone) {

        phoneError.textContent =
            "Phone number required";

        return;
    }


    if (!password) {

        passwordError.textContent =
            "Password required";

        return;
    }


    
    // TENANT LOGIN
    
    if (role === "tenant") {

        const apartment =
            apartmentSelect.value;


        // APARTMENT VALIDATION
        if (!apartment) {

            loginError.textContent =
                "Please select apartment";

            return;
        }


        // GET TENANTS
        const tenants =
            JSON.parse(
                localStorage.getItem("tenants")
            ) || [];


        // FIND TENANT
        const tenant =
            tenants.find((t) => {

                return (

                    t.phone.trim() === phone

                    &&

                    t.password.trim() === password

                    &&

                    t.apartment
                        .toLowerCase()
                        .trim()

                    ===

                    apartment
                        .toLowerCase()
                        .trim()
                );
            });


        // LOGIN FAILED
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


        alert(
            "Tenant login successful!"
        );


        // REDIRECT
        window.location.href =
            "dashboard.html";
    }


   
    // LANDLORD LOGIN
 
    else {

        // GET LANDLORDS
        const landlords =
            JSON.parse(
                localStorage.getItem("landlords")
            ) || [];


        // FIND LANDLORD
        const landlord =
            landlords.find((l) => {

                return (

                    l.phone.trim() === phone

                    &&

                    l.password.trim() === password
                );
            });


        // LOGIN FAILED
        if (!landlord) {

            loginError.textContent =
                "Invalid landlord credentials";

            return;
        }


        // SAVE SESSION
        localStorage.setItem(
            "loggedInLandlord",
            JSON.stringify(landlord)
        );


        alert(
            "Landlord login successful!"
        );


        // REDIRECT
        window.location.href =
            "admin.html";
    }
});
