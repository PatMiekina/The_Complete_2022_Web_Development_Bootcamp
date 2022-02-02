//jshint eversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  // res.send("Hello, world!");
  // console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var n1 = Number(req.body.n1);
  var n2 = Number(req.body.n2);

  var result = n1 + n2;

  res.send("The result of the calculation is " + result);

});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
