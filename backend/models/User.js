// require mongoose, already connected in connection.js in db folder in
const { mongoose } = require('../db/connection');
// const mongoose = require("mongoose")

let Schema = mongoose.Schema;
let model = mongoose.model;

const userSchema = new Schema({
    username: {type:String, unique: true, required: true},
    password: {type:String, required: true}

}, {timeStamps: true})

const User = model("User", userSchema, "users");

module.exports = User;