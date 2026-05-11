
// CURRENT ROLE

let currentRole = "tenant";



// SWITCH ROLE

function switchRole(role) {

    currentRole = role;

    // UPDATE TITLE
    document.getElementById("form-title")
        .textContent =

        role === "tenant"

        ? "Tenant Registration"

        : "Landlord Registration";


    // ACTIVE BUTTONS
    document.getElementById("tenant-toggle")
        .classList.toggle(
            "active",
            role === "tenant"
        );

    document.getElementById("landlord-toggle")
        .classList.toggle(
            "active",
            role === "landlord"
        );


    // SHOW/HIDE FIELDS
    const apartmentGroup =
        document.getElementById("apartment-group");

    const roomGroup =
        document.getElementById("room-group");


    if (role === "tenant") {

        apartmentGroup.style.display =
            "block";

        roomGroup.style.display =
            "block";
    }

    else {

        apartmentGroup.style.display =
            "none";

        roomGroup.style.display =
            "none";
    }


    // CLEAR ERRORS
    clearErrors();
}



// CLEAR ERRORS

function clearErrors() {

    const errors =
        document.querySelectorAll(".error");

    errors.forEach((error) => {

        error.textContent = "";
    });
}


// FORM

const registerForm =
    document.getElementById("register-form");



// PREVENT ENTER SUBMIT

registerForm.addEventListener(
    "keydown",
    function(event) {

    if (event.key === "Enter") {

        event.preventDefault();
    }
});



// REGISTER SUBMIT

registerForm.addEventListener(
    "submit",
    function(event) {

    event.preventDefault();

    clearErrors();


   
    // GET VALUES
  
    const fullName =
        document.getElementById("full-name")
        .value.trim();

    const phone =
        document.getElementById("phone")
        .value.trim();

    const apartment =
        document.getElementById("apartment")
        .value.trim();

    const room =
        document.getElementById("room")
        .value.trim();

    const password =
        document.getElementById("password")
        .value.trim();

    const confirmPassword =
        document.getElementById("confirm-password")
        .value.trim();


    let isValid = true;


    
    // VALIDATE NAME
  
    if (fullName === "") {

        document.getElementById("name-error")
            .textContent =
            "Full name required";

        isValid = false;
    }


  
    // VALIDATE PHONE
  
    if (phone === "") {

        document.getElementById("phone-error")
            .textContent =
            "Phone number required";

        isValid = false;
    }

    else if (!/^0\d{9}$/.test(phone)) {

        document.getElementById("phone-error")
            .textContent =
            "Use format 0712345678";

        isValid = false;
    }


    
    // TENANT VALIDATION
  
    if (currentRole === "tenant") {

        if (apartment === "") {

            document.getElementById("apartment-error")
                .textContent =
                "Apartment required";

            isValid = false;
        }


        if (room === "") {

            document.getElementById("room-error")
                .textContent =
                "Room number required";

            isValid = false;
        }
    }


   
    // PASSWORD VALIDATION
   
    if (password === "") {

        document.getElementById("password-error")
            .textContent =
            "Password required";

        isValid = false;
    }

    else if (password.length < 6) {

        document.getElementById("password-error")
            .textContent =
            "Minimum 6 characters";

        isValid = false;
    }



    // CONFIRM PASSWORD
  
    if (confirmPassword === "") {

        document.getElementById("confirm-error")
            .textContent =
            "Confirm password";

        isValid = false;
    }

    else if (password !== confirmPassword) {

        document.getElementById("confirm-error")
            .textContent =
            "Passwords do not match";

        isValid = false;
    }


    // STOP IF INVALID
    if (!isValid) return;


    // GET STORAGE
    let tenants =
        JSON.parse(
            localStorage.getItem("tenants")
        ) || [];

    let landlords =
        JSON.parse(
            localStorage.getItem("landlords")
        ) || [];


    // CHECK DUPLICATE PHONE
  
    const existingTenant =
        tenants.find(
            (tenant) =>
            tenant.phone === phone
        );

    const existingLandlord =
        landlords.find(
            (landlord) =>
            landlord.phone === phone
        );


    if (existingTenant || existingLandlord) {

        document.getElementById("phone-error")
            .textContent =
            "Phone already registered";

        return;
    }


    // CREATE USER
   
    if (currentRole === "tenant") {

        const newTenant = {

            name: fullName,

            phone: phone,

            apartment: apartment,

            room: room,

            password: password,

            balance: 0,

            waterBill: 0,

            payments: []
        };


        tenants.push(newTenant);


        localStorage.setItem(
            "tenants",
            JSON.stringify(tenants)
        );
    }


  
    // CREATE LANDLORD
    
    else {

        const newLandlord = {

            name: fullName,

            phone: phone,

            password: password
        };


        landlords.push(newLandlord);


        localStorage.setItem(
            "landlords",
            JSON.stringify(landlords)
        );
    }


    
    // SUCCESS
  
    alert(
        "Account created successfully!"
    );


    // REDIRECT
    window.location.href =
        "login.html";
});