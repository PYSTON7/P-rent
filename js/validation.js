  // SELECT FORM
        const tenantForm =
            document.getElementById("tenant-form");


        // SELECT INPUTS
        const tenantName =
            document.getElementById("tenant-name");

        const apartmentName =
            document.getElementById("apartment-name");

        const roomNumber =
            document.getElementById("room-number");

        const rentAmount =
            document.getElementById("rent-amount");


        // ERROR ELEMENTS
        const nameError =
            document.getElementById("name-error");

        const apartmentError =
            document.getElementById("apartment-error");

        const roomError =
            document.getElementById("room-error");

        const rentError =
            document.getElementById("rent-error");


        // TENANT LIST CONTAINER
        const tenantList =
            document.getElementById("tenant-list");


        // RETRIEVE EXISTING TENANTS
        let tenants =
            JSON.parse(localStorage.getItem("tenants")) || [];


        // DISPLAY TENANTS
        function displayTenants() {

            tenantList.innerHTML = "";

            tenants.forEach((tenant, index) => {

                const tenantCard =
                    document.createElement("article");

                tenantCard.classList.add("tenant-card");

                tenantCard.innerHTML = `
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
                        <strong>Rent:</strong>
                        KES ${tenant.rent}
                    </p>

                    <button class="delete-btn"
                        onclick="deleteTenant(${index})">
                        Delete
                    </button>
                `;

                tenantList.appendChild(tenantCard);
            });
        }


        // DISPLAY SAVED TENANTS ON PAGE LOAD
        displayTenants();


        // FORM SUBMISSION
        tenantForm.addEventListener("submit", function(event) {

            event.preventDefault();


            // CLEAR ERRORS
            nameError.textContent = "";
            apartmentError.textContent = "";
            roomError.textContent = "";
            rentError.textContent = "";


            let isValid = true;


            // VALIDATION
            if (tenantName.value.trim() === "") {

                nameError.textContent =
                    "Tenant name is required";

                isValid = false;
            }


            if (apartmentName.value.trim() === "") {

                apartmentError.textContent =
                    "Apartment name is required";

                isValid = false;
            }


            if (roomNumber.value.trim() === "") {

                roomError.textContent =
                    "Room number is required";

                isValid = false;
            }


            if (rentAmount.value.trim() === "") {

                rentError.textContent =
                    "Rent amount is required";

                isValid = false;
            }


            // STOP IF INVALID
            if (!isValid) return;


            // CREATE TENANT OBJECT
            const newTenant = {

                name: tenantName.value,
                apartment: apartmentName.value,
                room: roomNumber.value,
                rent: rentAmount.value
            };


            // SAVE TO ARRAY
            tenants.push(newTenant);


            // SAVE TO LOCAL STORAGE
            localStorage.setItem(
                "tenants",
                JSON.stringify(tenants)
            );


            // REFRESH DISPLAY
            displayTenants();


            // RESET FORM
            tenantForm.reset();


            // SUCCESS MESSAGE
            alert("Tenant added successfully!");

        });


     // DELETE TENANT WITH CONFIRMATION
function deleteTenant(index) {

    // SHOW CONFIRMATION MESSAGE
    const confirmDelete = confirm(
        "Are you sure you want to delete this tenant?"
    );

    // STOP IF USER CLICKS CANCEL
    if (!confirmDelete) {
        return;
    }

    // REMOVE TENANT
    tenants.splice(index, 1);

    // UPDATE LOCAL STORAGE
    localStorage.setItem(
        "tenants",
        JSON.stringify(tenants)
    );

    // REFRESH TENANT DISPLAY
    displayTenants();

    // SUCCESS MESSAGE
    alert("Tenant deleted successfully!");
}