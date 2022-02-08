// I guess this video is outdated. Here is a way how you can add a new contact to your existing mailchimp list using the node.js mailchimp package.

// Please find further details in the documentation:

// https://mailchimp.com/developer/guides/marketing-api-quick-start/#make-your-first-api-call

// and

// https://mailchimp.com/developer/guides/create-your-first-audience/#add-a-contact-to-an-audience

// 1) you need to install the mailchimp package:

// npm install @mailchimp/mailchimp_marketing

// 2) Find your API-Key and your unique list-ID like described in the video. Don't let the new mailchimp Website design bother you. The required information is still were it's supposed to be.

// 3) Insert your API-Key, your List-ID and your Server Prefix in the code below

// (I've named the text-input elements in my HTML form firstName, lastName, email)

const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

mailchimp.setConfig({
  apiKey: "YOUR API-KEY",
  server: "YOUR SERVER PREFIX e.g. us7"
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

  const listId = "YOUR LIST-ID";
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };

  async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });

      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
  }

  run();
})

app.listen(3000, function () {
  console.log("Server is running on port 3000")
});
