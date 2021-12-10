import express from 'express';
import connectToDatabase from './helpers.mjs'

import bodyParser from 'body-parser';
const app = express();

var customMessage = "Docker";

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send(`<html><body><h2>Good to see you ${customMessage}. Welcome to the new world!</h2>
          <form action="/custom-message" method="POST">
            <div class="form-control">
              <label>Name</label>
              <input placeholder="Enter your name" name="name"/>
            </div>
            <button>Submit</button>
          </form> 
          </body></html>
  `);
});

await connectToDatabase();

app.post("/custom-message", (req, res) => {
  let custMsg = req.body.name
  console.log("custMsg: ", custMsg);
  customMessage = custMsg;
  res.redirect("/");
});

app.listen(3000);
