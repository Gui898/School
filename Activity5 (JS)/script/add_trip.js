function add_favorite_trip(user, id) {

    let localData = JSON.parse(localStorage.getItem("users_db"));

    if(!localData){
        alert("User not found");
        throw new Error("User not found");
    }

    const username = sessionStorage.getItem("user");

    hasUser = false;
    data.users.forEach(user => {
            
        if(user.username == username){
                
            user.favorite_trip.push(id);

            hasUser = true;
        }
    });

    if (!hasUser) {
        alert("Incorrect username or password");
        throw new Error("Incorrect username or password");
    }
}

function add_purchase_trip(user, id) {

    let localData = JSON.parse(localStorage.getItem("users_db"));

    if(!localData){
        alert("User not found");
        throw new Error("User not found");
    }

    const username = sessionStorage.getItem("user");

    hasUser = false;
    data.users.forEach(user => {
            
        if(user.username == username){
                
            user.purchase_trip.push(id);

            hasUser = true;
            break;
        }
    });

    if (!hasUser) {
        alert("Incorrect username or password");
        throw new Error("Incorrect username or password");
    }
}