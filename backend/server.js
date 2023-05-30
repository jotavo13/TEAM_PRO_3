// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
const router = express.Router();
const { PORT, DATABASE_URL } = require('./config');
const cors = require('cors');
const User = require('./models/User');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const Videos = require('./models/videos');


/////////////////////////////////////////////////////
// Middleware  req => middleware => res
/////////////////////////////////////////////////////

app.use(cors());
app.use(express.json())
app.use(morgan("tiny")) //logging// 
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.json()) // parse json data into the req.body
app.use(express.static("public")) // serve files from public statically

//session
app.use(
  session({
      store: MongoStore.create({ 
          mongoUrl: DATABASE_URL
      }),
      secret: "pineapple",
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7 
      }
  }),
)



// Routes



//index route
app.get('/:id', async (req, res) => {
console.log("params id", req.params);
  const videos = await Videos.find({userId: req.params.id});

  //need to output all our videos as json data so we can then fetch and use the data on the frontend
  res.json(videos);
})

//post route
app.post('/:id', async (req, res) => {
  
  //using cors we are throwing our data into our mongoose schema using the req.body middleware with json 
  req.body.userId = req.params.id;
  const video = await Videos.create(req.body);
  //returns the json for testing sake, not necessary
  res.json(req.body);

})

app.delete("/:vidId/delete", async (req, res)=>{
  // const vidId = await Videos.findById(req.params.vidId)
  const video = await Videos.findByIdAndDelete(req.params.vidId);
  res.json(video)
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

 app.get("/auth/login", (req, res)=>{
  res.send("hello login page")
 });

 app.post("/auth/login", async (req, res)=>{
  console.log("req.body.username:", req.body.username)
  const user = await User.findOne({username: req.body.username})
  console.log(user);
  if (user){
    const result = await bcrypt.compare(req.body.password, user.password);
    console.log("result", result);
      if (result){
        req.session.currentUser = {
          username: user.username,
          id: user._id
        }
        console.log("password matched");
        res.json(req.session.currentUser)
      }
      else{
        console.log("invalid")
        // res.json("Invalid credentials")
      }
  }
  else{
    console.log("user does not exist")
    res.json(null)
  }

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