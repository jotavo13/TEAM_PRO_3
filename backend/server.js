// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
const { PORT } = require('./config');
const cors = require('cors');

const Videos = require('./models/videos');


/////////////////////////////////////////////////////
// Middleware  req => middleware => res
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging// 
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.json()) // parse json data into the req.body
app.use(express.static("public")) // serve files from public statically
app.use(cors()); // allows the frontend to post data to the backend and vice versa (probably)

// Routes

//index route
app.get('/', async (req, res) => {

  const videos = await Videos.find({});

  //need to output all our videos as json data so we can then fetch and use the data on the frontend
  res.json(videos);
})

//post route
app.post('/', async (req, res) => {
  
  //using cors we are throwing our data into our mongoose schema using the req.body middleware with json 
  const video = await Videos.create(req.body);

  //returns the json for testing sake, not necessary
  res.json(req.body);

})


// Listener

app.listen(PORT, () => {
  console.log("Express is listening on port : "+PORT)
})