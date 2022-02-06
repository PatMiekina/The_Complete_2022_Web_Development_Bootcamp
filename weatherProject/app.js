const express = require("express");
// Forming get requests to API through native node
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Get request for root path
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

// Post request for root path
app.post("/", function(req, res){
  // search parameters
  const query = req.body.cityName;
  const apiKey ="152a29170995d42763b446749e9fbfed";
  const units = "metric";
  // Danger!
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response){

    response.on("data", function(data){

      // Use JSON to parse the data
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDesctiption = weatherData.weather[0].description;
      const iconUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

      res.write("<h1>The temperature in " + query + " is " + temperature + " degrees Celsius.</h1>");
      res.write("<p>The weather is currently " + weatherDesctiption + ".</p>");
      res.write("<img src=" + iconUrl + ">");

      res.send();

    });
  });
});



app.listen(3000, function(){

  console.log("The server is running on port 3000");

});
