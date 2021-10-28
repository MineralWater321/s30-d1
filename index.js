const express = require("express");

//require mongoose package
const mongoose = require("mongoose");

const app = express();
const port = 3001;

//Connection to monoDB Atlas
//Syntax: mongoose.connect("<MongoDB Atlas connection string>", {userNewUrlParser:true});
mongoose.connect("mongodb+srv://dbedwardpaler:A9oJgn0nL4BAbIcf@wdc028-course-booking.tgio6.mongodb.net/b138_to-do?retryWrites=true&w=majority",
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

//Schema - determines the structure of the documents to be written in the database
const taskSchema = new mongoose.Schema({
	name: String,
	status: {
		type: String,
		default: "pending"
	}
})

//Create the Task model

const Task = mongoose.model("Task", taskSchema);

app.use(express.json());

app.use(express.urlencoded({extended:true}));


//Create a POST route to create a new task
app.post("/tasks", (req, res) => {
	Task.findOne({name: req.body.name}, (err, result) => {
		if(result != null && result.name == req.body.name){
			return res.send("Duplicate task found");
		}
		else{
			let newTask = new Task({
				name: req.body.name
			})

			newTask.save((saveErr, savedTask) => {
				if(saveErr){
					return console.error(saveErr);
				}
				else{
					return res.status(201).send("New task created")
				}
			})
		}
	})
})


//Create a GET request to retrieve all the tasks
app.get("/tasks", (req, res) => {
	Task.find({}, (err, result) => {
		//if an error occured
		if(err){
			return console.log(err);
		}
		//if no errors are found
		else{
			return res.status(200).json({
				data: result
			})
		}
	})
})

app.listen(port, () => console.log(`Server is running at port ${port}`));