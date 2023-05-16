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
app.use(express.json()) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

// Routes

app.get('/', async (req, res) => {



  // const videos = await Videos.find({});
  // res.json(results);
})

app.post('/', async (req, res) => {
  
  console.log(req.body);

  const newVideo = {
    // title: results.title
  }
  const video = await Videos.create(req.body);
  res.json(req.body);
})


// Listener

app.listen(PORT, () => {
  console.log("Express is listening on port : "+PORT)
})