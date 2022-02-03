const express = require("express");

// Forming get requests to API through native node
const https = require("https");

const app = express();


app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=152a29170995d42763b446749e9fbfed&units=metric";

  https.get(url, function(response){
    console.log(response);
  })

  res.send("Server is up and running");

});

app.listen(3000, function(){

  console.log("The server is running on port 3000");

});
