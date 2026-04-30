const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());


/* MongoDB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/travelDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


/* ---------------- BOOKING SCHEMA ---------------- */

const BookingSchema = new mongoose.Schema({
name:String,
email:String,
phone:String,
destination:String,
date:{
type:Date,
default:Date.now
}
});

const Booking = mongoose.model("Booking",BookingSchema);


/* ---------------- LOGIN SCHEMA ---------------- */

const LoginSchema = new mongoose.Schema({
username:String,
status:String,
time:{
type:Date,
default:Date.now
}
});

const Login = mongoose.model("Login",LoginSchema);


/* ---------------- SAVE BOOKING ---------------- */

app.post("/book", async(req,res)=>{

try{

const newBooking = new Booking({
name:req.body.name,
email:req.body.email,
phone:req.body.phone,
destination:req.body.destination
});

await newBooking.save();

res.json({
message:"Booking saved successfully"
});

}
catch(error){

res.status(500).json({
message:"Error saving booking"
});

}

});


/* ---------------- BOOKING HISTORY ---------------- */

app.get("/history", async(req,res)=>{

try{

const data = await Booking.find();

res.json(data);

}
catch(error){

res.status(500).json({
message:"Error getting booking history"
});

}

});


/* ---------------- SAVE LOGIN HISTORY ---------------- */

app.post("/login-history", async(req,res)=>{

try{

const newLogin = new Login({
username:req.body.username,
status:req.body.status
});

await newLogin.save();

res.json({
message:"Login history saved"
});

}
catch(error){

res.status(500).json({
message:"Error saving login history"
});

}

});


/* ---------------- VIEW LOGIN HISTORY ---------------- */

app.get("/login-history", async(req,res)=>{

try{

const data = await Login.find();

res.json(data);

}
catch(error){

res.status(500).json({
message:"Error getting login history"
});

}

});


/* Server */
app.listen(3000,()=>{
console.log("Server running on port 3000");
});