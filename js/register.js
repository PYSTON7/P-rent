// CURRENT ROLE
let currentRole = "tenant";

// SWITCH ROLE
function switchRole(role) {
    currentRole = role;

    // UPDATE TITLE
    document.getElementById("form-title").textContent =
        role === "tenant" ? "Tenant Registration" : "Landlord Registration";

    // UPDATE ACTIVE BUTTON
    document.getElementById("tenant-toggle")
        .classList.toggle("active", role === "tenant");
    document.getElementById("landlord-toggle")
        .classList.toggle("active", role === "landlord");

    // SHOW/HIDE TENANT ONLY FIELDS
    const apartmentGroup = document.getElementById("apartment-group");
    const roomGroup = document.getElementById("room-group");

    if (role === "tenant") {
        apartmentGroup.style.display = "block";
        roomGroup.style.display = "block";
    } else {
        apartmentGroup.style.display = "none";
        roomGroup.style.display = "none";
    }

    // CLEAR ALL ERRORS
    clearErrors();
}


// CLEAR ERRORS
function clearErrors() {
    const errors = document.querySelectorAll(".error");
    errors.forEach(error => error.textContent = "");
}


// SELECT FORM
const registerForm = document.getElementById("register-form");

// PREVENT ENTER FROM SUBMITTING EARLY
registerForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") event.preventDefault();
});


// HANDLE REGISTRATION
registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // CLEAR ERRORS
    clearErrors();

    // GET VALUES
    const fullName = document.getElementById("full-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const apartment = document.getElementById("apartment").value.trim();
    const room = document.getElementById("room").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    let isValid = true;

    // VALIDATE NAME
    if (fullName === "") {
        document.getElementById("name-error").textContent =
            "Full name is required";
        isValid = false;
    }

    // VALIDATE PHONE
    if (phone === "") {
        document.getElementById("phone-error").textContent =
            "Phone number is required";
        isValid = false;
    } else if (!/^0\d{9}$/.test(phone)) {
        document.getElementById("phone-error").textContent =
            "Enter a valid phone number e.g 0712345678";
        isValid = false;
    }

    // VALIDATE TENANT ONLY FIELDS
    if (currentRole === "tenant") {
        if (apartment === "") {
            document.getElementById("apartment-error").textContent =
                "Apartment name is required";
            isValid = false;
        }

        if (room === "") {
            document.getElementById("room-error").textContent =
                "Room number is required";
            isValid = false;
        }
    }

    // VALIDATE PASSWORD
    if (password === "") {
        document.getElementById("password-error").textContent =
            "Password is required";
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById("password-error").textContent =
            "Password must be at least 6 characters";
        isValid = false;
    }

    // VALIDATE CONFIRM PASSWORD
    if (confirmPassword === "") {
        document.getElementById("confirm-error").textContent =
            "Please confirm your password";
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById("confirm-error").textContent =
            "Passwords do not match";
        isValid = false;
    }

    if (!isValid) return;

    // GET EXISTING USERS
    const users = JSON.parse(localStorage.getItem("users")) || {
        tenants: [],
        landlords: []
    };

    // CHECK IF PHONE ALREADY REGISTERED
    const userList = currentRole === "tenant"
        ? users.tenants
        : users.landlords;

    const alreadyExists = userList.find(user => user.phone === phone);

    if (alreadyExists) {
        document.getElementById("phone-error").textContent =
            "This phone number is already registered";
        return;
    }

    // CREATE NEW USER
    const newUser = {
        name: fullName,
        phone: phone,
        password: password,
        ...(currentRole === "tenant" && {
            apartment: apartment,
            room: room
        })
    };

    // SAVE USER
    userList.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // SUCCESS
    alert(`Account created successfully! Welcome, ${fullName}. Please login.`);

    // REDIRECT TO LOGIN
    window.location.href = "login.html";
});