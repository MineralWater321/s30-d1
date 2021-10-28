const express = require("express");

//require mongoose package
const mongoose = require("mongoose");

const app = express();
const port = 3001;

//Connection to monoDB Atlas
//Syntax: mongoose.connect("<MongoDB Atlas connection string>", {userNewUrlParser:true});
mongoose.connect("mongodb+srv://dbedwardpaler:A9oJgn0nL4BAbIcf@wdc028-course-booking.tgio6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{
		useNewUrlParser:true,
		useUnifiedTopology:true	
	}
);

let db = mongoose.connection;

//If a connection error occured, output in the console
//console.error.bin(console) allow us to print errors in the browser console and in the terminal
db.on("error", console.error.bind(console, "connection error"));

//If the connection is successful, output in the console
db.once("open", () => console.log("We're connected to the cloud database"));


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.listen(port, () => console.log(`Server is running at port ${port}`));