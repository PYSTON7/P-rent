console.log("app.js loaded");
console.log(document.getElementById("apartment-list"));
console.log(document.getElementById("search-input"));

11// APARTMENT DATA
const defaultApartments = [
    {
        name: "Hillton Valley Apartments",
        location: "Imara Daima",
        rooms: 3,
        landlord: "0712345678"
    },
    {
        name: "Tower One Residency",
        location: "Ruahi",
        rooms: 2,
        landlord: "0723456789"
    },
    {
        name: "Blue Kings Heights",
        location: "Naivasha",
        rooms: 5,
        landlord: "0734567890"
    }
];

// STORE DEFAULT DATA
if (!localStorage.getItem("apartments")) {
    localStorage.setItem("apartments", JSON.stringify(defaultApartments));
}

// RETRIEVE DATA
const apartments = JSON.parse(localStorage.getItem("apartments")) || [];

// TARGET ELEMENTS
const apartmentList = document.getElementById("apartment-list");
const searchInput = document.getElementById("search-input");

// DISPLAY APARTMENTS FUNCTION
function displayApartments(apartmentArray) {
    apartmentList.innerHTML = "";

    if (apartmentArray.length === 0) {
        apartmentList.innerHTML = `<p>No apartments found.</p>`;
        return;
    }

    apartmentArray.forEach((apartment) => {
        const apartmentCard = document.createElement("article");
        apartmentCard.classList.add("apartment-card");

        apartmentCard.innerHTML = `
            <h3>${apartment.name}</h3>
            <p><strong>Location:</strong> ${apartment.location}</p>
            <p><strong>Available Rooms:</strong> ${apartment.rooms}</p>
            <p><strong>Landlord Contact:</strong> ${apartment.landlord}</p>
            <button class="view-btn">View Details</button>
        `;

        apartmentList.appendChild(apartmentCard);
    });
}

// INITIAL DISPLAY
displayApartments(apartments);

// SEARCH FUNCTIONALITY
searchInput.addEventListener("keyup", function () {
    const searchValue = searchInput.value.toLowerCase();

    const filteredApartments = apartments.filter((apartment) => {
        return (
            apartment.name.toLowerCase().includes(searchValue) ||
            apartment.location.toLowerCase().includes(searchValue)
        );
    });

    displayApartments(filteredApartments);
});