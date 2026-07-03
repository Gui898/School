const classTrip = document.getElementById("id_trips");

const nameBar = document.getElementById("search-name");
const priceBar = document.getElementById("search-price");
const dateBar = document.getElementById("search-date");

function filterTrips() {
    const localData = localStorage.getItem("trips_db") || JSON.stringify({trips: []});
    const data = JSON.parse(localData);
    const allTrips = data.trips;

    const nameTerm = nameBar.value.toLowerCase();
    const maxPrice = parseFloat(priceBar.value) || Infinity;
    const dateFilter = dateBar.value;

    const filtered = allTrips.filter(trip => {
        const matchName = trip.name ? trip.name.toLowerCase().includes(nameTerm) : false;

        const matchPrice = trip.price ? parseFloat(trip.price) <= maxPrice : true;

        const matchDate = dateFilter === "" || trip.date === dateFilter;

        return matchName && matchPrice && matchDate;
    });

    display(filtered);
}

nameBar.addEventListener('input', filterTrips);
priceBar.addEventListener('input', filterTrips);
dateBar.addEventListener('change', filterTrips);

function display(listTrips) {
    classTrip.innerHTML = "";

    if (listTrips.length === 0) {
        classTrip.innerHTML = "<p class='no_results'>Trip not found.</p>";
        return;
    }

    listTrips.forEach(trip => {
        const card = document.createElement("a");
        card.href = "trip.html";
        card.className = "card";

        const title = document.createElement("h2");
        title.textContent = trip.name;

        card.appendChild(title);

        classTrip.appendChild(card);
    });
}

filterTrips();