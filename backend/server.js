// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
const { PORT } = require('./config');

const Videos = require('./models/videos');


/////////////////////////////////////////////////////
// Middleware  req => middleware => res
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging// 
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: false})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

// Routes

app.get('/', async (req, res) => {

  const url = 'https://youtube-v31.p.rapidapi.com/search?q=Hikaru&part=snippet%2Cid&regionCode=US&maxResults=10&order=date';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ed2633ba42mshbfc9218461d8e0bp16bf0ajsn1ca01f4d7312',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  }

  const response = await fetch(url, options);
  const results = await response.json();
  console.log(results);


  const videos = await Videos.find({});
  res.json(results);
})

app.post('/', async (req, res) => {

  // need to replace the search with whatever the user sends us
  // also we need to modify
  const url = 'https://youtube-v31.p.rapidapi.com/search?q=Hikaru&part=snippet%2Cid&regionCode=US&maxResults=10&order=date';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ed2633ba42mshbfc9218461d8e0bp16bf0ajsn1ca01f4d7312',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  }

  const response = await fetch(url, options);
  const results = await response.json();
  console.log(results);
  const video = await Videos.create(req.body);
  res.redirect('/');
})


// Listener

app.listen(PORT, () => {
  console.log("Express is listening on port : "+PORT)
})