const express = require("express");

// Forming get requests to API through native node
const https = require("https");

const app = express();


app.get("/", function(req, res){

  // Danger!
  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=152a29170995d42763b446749e9fbfed&units=metric";

  https.get(url, function(response){

    // console.log(response.statusCode);

    response.on("data", function(data){

      // Use JSON to parse the data
      const weatherData = JSON.parse(data);

      const temperature = weatherData.main.temp;

      const weatherDesctiption = weatherData.weather[0].description;

      // console.log(weatherData);

      // console.log(temperature);

      res.send("The temperature in London is" + temp + "degrees Celsius.");

      // Use JSON to turn object into string with no spaces etc
      // const object = {
      //   name: "Angela",
      //   favouriteFood: "Ramen"
      // }

      // console.log(JSON.stringify(object));

    });
  })

  // only one res.send !
  // res.send("Server is up and running");

});

app.listen(3000, function(){

  console.log("The server is running on port 3000");

});
