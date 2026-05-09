//  SAVE DATA
function (saveData, key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// REMOVE DATA
function (removeData, key) {
    localStorage.removeItem(key);
}

// DELETE ALL DATA
function (clearData) {
    localStorage.clear();
}
// RETRIEVE DATA
function (getData, key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// DEFAULT APARTMENTS
const defaultApartments = [
    {
        name: "Sunset Villas",
        location: "Nairobi",
        rooms: 3,
        landlord: "0712345678"
    },
    {
        name: "Green Acres",
        location: "Mombasa",
        rooms: 4,
        landlord: "0723456789"
    },
    {
        name: "Blue Lagoon Apartments",
        location: "Kisumu",
        rooms: 2,
        landlord: "0734567890"
    }
];

// STORE DEFAULT DATA   
if (!getData("apartments")) {
    saveData("apartments", defaultApartments);
}   

// STORE DEFAULT TENANTS
const defaultTenants = [
    {
        name: "John Doe",
        apartment: "Sunset Villas",
        contact: "0712345678"
    },
    {
        name: "Jane Smith",
        apartment: "Green Acres",
        contact: "0723456789"
    },
    {
        name: "Alice Johnson",
        apartment: "Blue Lagoon Apartments",
        contact: "0734567890"
    }
];

if (!getData("tenants")) {
    saveData("tenants", defaultTenants);
}

DEFAULT DASHBOARD STATS 
const defaultStats = {
    totalApartments: 3,
    occupiedApartments: 3,
    vacantApartments: 0,
    totalTenants: 3
};

if (!getData("dashboardStats")) {
    saveData("dashboardStats", defaultStats);
}

// GET ALL DATA
function getAllData() {
    return {
        apartments: getData("apartments") || [],
        tenants: getData("tenants") || [],
        maintenanceRequests: getData("maintenanceRequests") || [],
        dashboardStats: getData("dashboardStats") || {}
    };
}

// DEFAULT MAINTENANCE REQUESTS
const defaultMaintenanceRequests = [
    {
        apartment: "Sunset Villas",
        issue: "Leaking faucet",
        status: "Pending"
    },
    {
        apartment: "Green Acres",
        issue: "Broken window",
        status: "In Progress"
    },
    {
        apartment: "Blue Lagoon Apartments",
        issue: "Clogged drain",
        status: "Resolved"
    }
];

if (!getData("maintenanceRequests")) {
    saveData("maintenanceRequests", defaultMaintenanceRequests);
}