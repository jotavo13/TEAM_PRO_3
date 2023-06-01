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
const Category = require('./models/category');


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

  const videos = await Videos.find({userId: req.params.id});

  //need to output all our videos as json data so we can then fetch and use the data on the frontend
  res.json(videos);
})

app.get('/:id/videos/:search', async (req, res) => {

  let searchedVideos;

  const videos = await Videos.find({userId: req.params.id});

  searchedVideos = videos.filter((video) => {
    return video.title.toLowerCase().includes(req.params.search.toLowerCase())
  })

  //need to output all our videos as json data so we can then fetch and use the data on the frontend
  res.json(searchedVideos);
})

app.get('/:id/sortvideos/:sort', async (req, res) => {

  let sortedVideos;
  let placeholder;
  let swapCheck = true;

  const videos = await Videos.find({userId: req.params.id});

  console.log(videos[0].publishTime)
  if(req.params.sort == '0'){
    while(swapCheck == true){
      swapCheck = false;
      for(let i=0; i<videos.length-1; i++){
        if(videos[i].views > videos[i+1].views){
            swapCheck = true;
            placeholder = videos[i];
            videos[i] = videos[i+1];
            videos[i+1] = placeholder;
        }
      }
    }
  }
  else if(req.params.sort == '1'){
    while(swapCheck == true){
      swapCheck = false;
      for(let i=0; i<videos.length-1; i++){
        if(videos[i].views < videos[i+1].views){
            swapCheck = true;
            placeholder = videos[i];
            videos[i] = videos[i+1];
            videos[i+1] = placeholder;
        }
      }
    }
  }
  else if(req.params.sort == '2'){
    let year1;
    let year2;
    let month1;
    let month2;
    let day1;
    let day2;
    while(swapCheck == true){
      swapCheck = false;
      for(let i=0; i<videos.length-1; i++){

        year1 = videos[i].publishTime.slice(0,4);
        year2 = videos[i + 1].publishTime.slice(0,4);
        month1 = videos[i].publishTime.slice(5,7);
        month2 = videos[i + 1].publishTime.slice(5,7);
        day1 = videos[i].publishTime.slice(8,10);
        day2 = videos[i + 1].publishTime.slice(8,10);

        if(year1 > year2){
            swapCheck = true;
            placeholder = videos[i];
            videos[i] = videos[i+1];
            videos[i+1] = placeholder;
        }
        else if(year2 >= year1 && month1 > month2){
          swapCheck = true;
          placeholder = videos[i];
          videos[i] = videos[i+1];
          videos[i+1] = placeholder;
        }
        else if(year2 >= year1 && month2 >= month1 && day1 > day2){
          swapCheck = true;
          placeholder = videos[i];
          videos[i] = videos[i+1];
          videos[i+1] = placeholder;
        }
      }
    }
  }
  else if(req.params.sort == '3'){
    let year1;
    let year2;
    let month1;
    let month2;
    let day1;
    let day2;
    while(swapCheck == true){
      swapCheck = false;
      for(let i=0; i<videos.length-1; i++){

        year1 = videos[i].publishTime.slice(0,4);
        year2 = videos[i + 1].publishTime.slice(0,4);
        month1 = videos[i].publishTime.slice(5,7);
        month2 = videos[i + 1].publishTime.slice(5,7);
        day1 = videos[i].publishTime.slice(8,10);
        day2 = videos[i + 1].publishTime.slice(8,10);

        if(year1 < year2){
            swapCheck = true;
            placeholder = videos[i];
            videos[i] = videos[i+1];
            videos[i+1] = placeholder;
        }
        else if(year2 <= year1 && month1 < month2){
          swapCheck = true;
          placeholder = videos[i];
          videos[i] = videos[i+1];
          videos[i+1] = placeholder;
        }
        else if(year2 <= year1 && month2 <= month1 && day1 < day2){
          swapCheck = true;
          placeholder = videos[i];
          videos[i] = videos[i+1];
          videos[i+1] = placeholder;
        }
      }
    }
  }




  //need to output all our videos as json data so we can then fetch and use the data on the frontend
  res.json(videos);
})


//index route
app.get('/:id/categories', async (req, res) => {
  console.log("params id", req.params);
    const categories = await Category.find({userId: req.params.id});
  
    //need to output all our videos as json data so we can then fetch and use the data on the frontend
    res.json(categories);
})  

app.get('/:id/categories/:click', async (req, res) => {
  console.log("params id", req.params.click);
    const videos = await Videos.find({userId: req.params.id, category: req.params.click});
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

//post route
app.post('/:id/categories', async (req, res) => {
  
  //using cors we are throwing our data into our mongoose schema using the req.body middleware with json 
  req.body.userId = req.params.id;
  const category = await Category.create(req.body);
  //returns the json for testing sake, not necessary
  res.json(req.body);

})

app.put('/:id/categories/:videoname', async (req, res) => {
  
  const videos = await Videos.findOne({title: req.params.videoname, userId: req.params.id});

  let newVideo = videos;
  
  newVideo.category = req.body.name;
  
  const updatedVideo = await Videos.findOneAndUpdate({title: req.params.videoname, userId: req.params.id}, newVideo)
  
  console.log(req.body);

  res.json(req.body);

})

app.put('/:id/categories/:categoryname/edit', async (req, res) => {
  
  const category = await Category.findOneAndUpdate({name: req.params.categoryname, userId: req.params.id}, req.body);  
    
  console.log(req.body);

  res.json(req.body);

})

app.delete('/:id/categories/:categoryname', async (req, res) => {
  const deletedCategory = await Category.findOneAndDelete({name: req.params.categoryname, userId: req.params.id});
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
 });



// Listener

app.listen(PORT, () => {
  console.log("Express is listening on port : "+PORT)
})