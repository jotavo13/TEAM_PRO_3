// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
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
app.use(morgan("tiny")) //logging// 
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.json()) // parse json data into the req.body
app.use(express.static("public")) // serve files from public statically
app.use(cors()); // allows the frontend to post data to the backend and vice versa (probably)

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
        res.json("Invalid credentials")
      }
  }
  else{
    console.log("user does not exist")
    res.json("user not found")
  }

 })


// Listener

app.listen(PORT, () => {
  console.log("Express is listening on port : "+PORT)
})