const express = require('express');
const cor = require('cors');
const bodyParser = require('body-parser'); // middleware
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
// this loads 'dotenv' into the process environment, which allow process.env to the secret key.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express(); // instantiate express application. 'express' is jsut a library to build API server easily.
const port = process.env.PORT || 5000; 
// setting up 'port' that we host the app on to either a port in process.env or port:5000
// it is different from the local host port; 3000

app.use(bodyParser.json()); 
// any request coming in, it will process their body tag and convert it to json file for us to use. 
// we do not have to manually convert to json file everytime fetching data 
app.use(bodyParser.urlencoded({ extended: true }));
// when url string comes in and out, it will process it for the proper form without space, symbols etc...

app.use(cor()); //cross origin request, it allows cross origin request

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  // static is express library, it serves certain file we pass in the bracket.

  app.get('*', function(req, res) { // -> any url we pass, call the function.
    // req = request we get, res = response as per the request
    res.sendFile(path.join(__dirname, 'client/build', 'index.html')) // sending all the frontend code to 'build'
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port' + port);
}) 

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount, 
    currency: 'usd'
  };

  stripe.charges.create(body, ( stripeErr, stripeRes )=> {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr }); // 500 is failure status
    } else {
      res.status(200).send({ success: stripeRes });
    }
  })
})