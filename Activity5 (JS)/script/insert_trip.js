function insertTrip(){

    const name_ = document.getElementById("name");
    const price_ = document.getElementById("price");
    const date_ = document.getElementById("date");
    const duration_ = document.getElementById("duration");
    const iconImage_ = document.getElementById("image_icon");
    const backImage_ = document.getElementById("image_background");
    const description_ = document.getElementById("description");

    let localData = localStorage.getItem("trips_db");
    if(!localData){
        localData = JSON.stringify({trips: []});
    }

    const data = JSON.parse(localData);

    const obj = {
        id_trip: (data.trips).length +1,
        name: name_.value,
        price: price_.value,
        date: date_.value,
        duration: duration_.value,
        iconImage: iconImage_.value,
        backImage: backImage_.value,
        description: description_.value
    }

    data.trips.push(obj);

    localStorage.setItem("trips_db", JSON.stringify(data, null, 2));

    alert("Trip added!");

    name_.value = ""
    price_.value = ""
    date_.value = ""
    duration_.value = ""
    iconImage_.value = ""
    backImage_.value = ""
    description_.value = ""
}