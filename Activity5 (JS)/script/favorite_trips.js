let localData = JSON.parse(localStorage.getItem("users_db"));

if(!localData){
    alert("User not found");
    throw new Error("User not found");
}

const username = sessionStorage.getItem("user");

hasUser = false;
data.users.forEach(user => {
            
    if(user.username == username){
                
        console.log(user.favorite_trip)

        hasUser = true;
    }
});

if (!hasUser) {
    alert("Incorrect username or password");
    throw new Error("Incorrect username or password");
}