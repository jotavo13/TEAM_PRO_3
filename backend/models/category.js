// require mongoose, already connected in connection.js in db folder in
const { mongoose } = require('../db/connection');
// const mongoose = require("mongoose")

let Schema = mongoose.Schema;
let model = mongoose.model;

const categorySchema = new Schema({
    name: {type: String, unique: true},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Category = model("Categories", categorySchema);

module.exports = Category;