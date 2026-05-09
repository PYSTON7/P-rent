// CURRENT ROLE
let currentRole = "tenant";

// SWITCH BETWEEN TENANT AND LANDLORD
function switchRole(role) {
    currentRole = role;

    // UPDATE FORM TITLE
    document.getElementById("form-title").textContent =
        role === "tenant" ? "Tenant Login" : "Landlord Login";

    // UPDATE ACTIVE BUTTON
    document.getElementById("tenant-toggle")
        .classList.toggle("active", role === "tenant");

    document.getElementById("landlord-toggle")
        .classList.toggle("active", role === "landlord");

    // CLEAR ERRORS
    document.getElementById("phone-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("login-error").textContent = "";
}


// DEFAULT USERS (stored in localStorage on first load)
const defaultUsers = {
    tenants: [
        { phone: "0712345678", password: "tenant123", name: "John Tenant" }
    ],
    landlords: [
        { phone: "0700000000", password: "landlord123", name: "Jane Landlord" }
    ]
};

// STORE DEFAULT USERS IF NOT EXISTS
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}


// LOGIN FORM
const loginForm = document.getElementById("login-form");

// PREVENT ENTER FROM SUBMITTING EARLY
loginForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") event.preventDefault();
});

// HANDLE LOGIN
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // CLEAR ERRORS
    document.getElementById("phone-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("login-error").textContent = "";

    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    let isValid = true;

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

    // VALIDATE PASSWORD
    if (password === "") {
        document.getElementById("password-error").textContent =
            "Password is required";
        isValid = false;
    }

    if (!isValid) return;

    // GET USERS FROM STORAGE
    const users = JSON.parse(localStorage.getItem("users"));

    // CHECK AGAINST CORRECT ROLE
    const userList = currentRole === "tenant"
        ? users.tenants
        : users.landlords;

    const matchedUser = userList.find(
        user => user.phone === phone && user.password === password
    );

    // IF NO MATCH
    if (!matchedUser) {
        document.getElementById("login-error").textContent =
            "Incorrect phone number or password";
        return;
    }

    // SAVE LOGGED IN USER TO SESSION
    localStorage.setItem("loggedInUser", JSON.stringify({
        name: matchedUser.name,
        phone: matchedUser.phone,
        role: currentRole
    }));

    // REDIRECT BASED ON ROLE
    if (currentRole === "tenant") {
        window.location.href = "dashboard.html";
    } else {
        window.location.href = "admin.html";
    }
});