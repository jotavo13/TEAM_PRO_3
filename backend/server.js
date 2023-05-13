// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');





/////////////////////////////////////////////////////
// Middleware  req => middleware => res
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging// 
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: false})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically



app.get('/', (req, res) => {
    res.send('default route');
})


// Listener

//------------------------------------------
mongoose.connect(DATABASE_URL).then(() => {
    app.listen(PORT, () => {
      console.log(`Your app is listening on port ${PORT}`);
    });
  });
  