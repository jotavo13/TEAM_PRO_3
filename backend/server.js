// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
const { PORT } = require('./config');
const router = express.Router();
const Videos = require('./models/videos');
const cors = require("cors");
const User = require('./models/user');


/////////////////////////////////////////////////////
// Middleware  req => middleware => res
/////////////////////////////////////////////////////

app.use(cors());
app.use(express.json())
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


//------------Auth Routes
 app.get("/auth/signup", (req, res)=>{
  res.send("hello signup page")
 });

 app.post("/auth/signup", async (req, res)=>{
  console.log(req.body)
  // create and send to mongo
  res.json(await User.create(req.body))
 })

// Listener

app.listen(PORT, () => {
  console.log("Express is listening on port : "+PORT)
})