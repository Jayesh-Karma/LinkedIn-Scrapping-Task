const mongoose = require("mongoose");

async function connect(){
    await mongoose.connect("mongodb://localhost:27017/linkedin-extension")
    .then(()=> { console.log("Database connected")})
    .catch((error) => console.log(error))
}

module.exports = connect;