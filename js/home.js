
// home.js
// HOME PAGE APARTMENTS



// GET APARTMENTS FROM LOCAL STORAGE
const apartments =
    JSON.parse(localStorage.getItem("apartments")) || [];


// TARGET CONTAINER
const apartmentContainer =
    document.getElementById("home-apartment-list");


// DISPLAY APARTMENTS
function displayHomeApartments() {

    // CHECK IF CONTAINER EXISTS
    if (!apartmentContainer) return;

    apartmentContainer.innerHTML = "";


    // SHOW ONLY FIRST 3 APARTMENTS
    const featuredApartments =
        apartments.slice(0, 3);


    // LOOP THROUGH DATA
    featuredApartments.forEach((apartment) => {

        const apartmentCard =
            document.createElement("article");

        apartmentCard.classList.add("apartment-card");


        apartmentCard.innerHTML = `

            <h3>${apartment.name}</h3>

            <p>
                <strong>Location:</strong>
                ${apartment.location}
            </p>

            <p>
                <strong>Available Rooms:</strong>
                ${apartment.rooms}
            </p>

            <button class="view-btn">
                View Details
            </button>
        `;


        // BUTTON EVENT
        apartmentCard
            .querySelector(".view-btn")
            .addEventListener("click", function() {

                alert(
                    `${apartment.name}\n` +
                    `Location: ${apartment.location}\n` +
                    `Rooms: ${apartment.rooms}`
                );
            });


        apartmentContainer.appendChild(apartmentCard);
    });
}


// LOAD APARTMENTS
displayHomeApartments();