// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require('@mailchimp/mailchimp_marketing');
const https = require('https');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

mailchimp.setConfig({
  apiKey: "MY_API KEY",
  server: "us14"
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// For testing purposes
app.get("/success", function(req, res) {
  res.sendFile(__dirname + "/success.html");
});

app.get("/failure", function(req, res) {
  res.sendFile(__dirname + "/failure.html");
});



app.post("/", function(req, res){

  const listId = "da6a2c7a44";
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };

  // Old solution - deprecated
  const data = {
    members: [
      {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.fName,
          LNAME: subscribingUser.lName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/da6a2c7a44/members"
  // const url = "https://us14.api.mailchimp.com/3.0/lists/da6a2c7a44"

  const options = {
    method: "POST",
    auth: "patrycja:743a5d540e61c43f888cec9addba4aef-us14"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode == 200) {
      console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(){
      // console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();


  // End of old solution

  // // New solution
  // async function run() {
  //     try {
  //         const response = await mailchimp.lists.addListMember(listId, {
  //           email_address: subscribingUser.email,
  //           status: "subscribed",
  //           merge_fields: {
  //             FNAME: subscribingUser.fName,
  //             LNAME: subscribingUser.lName
  //           }
  //         });

  //         console.log(
  //           `Successfully added contact as an audience member. The contact's id is ${response.id}.`
  //         );

  //         res.sendFile(__dirname + "/success.html");
  //     } catch (e) {
  //         res.sendFile(__dirname + "/failure.html");
  //     }
  // }

  // run();
  // // End of new solution

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

// app.listen(process.env.PORT, function() { - when deploying to heroku
app.listen(process.env.PORT || 3000, function() {
  console.log("The server is running on port 3000 http://localhost:3000/");
});

// API Key
// 743a5d540e61c43f888cec9addba4aef-us14

// Audience/List id
// da6a2c7a44
