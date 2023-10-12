const express = require("express");
const shoppingroute = require("./routes/shoppingroute");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const userModel = require("./models/user");

let app = express();

//BODYPARSER JSON

app.use(express.json());

let port = process.env.PORT || 3001;

//MONGOOSE CONNECTION

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

//const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/?retryWrites=true&w=majority"
const url = "mongodb+srv://DAX:TQp5tFoHR7qENVPd@testcluster.ebmengm.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url).then(
() => console.log("Connected to Mongo Atlas"),
(error) => console.log("Failed to connect to Mongo Atlas. Reason",error)
)

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
const time_to_live_diff = 3600000;

//LOGIN MIDDLEWARES

const createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

const isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({"Message":"Forbidden"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(req.headers.token === loggedSessions[i].token) {
			let now = Date.now();
			if(now > loggedSessions[i].ttl) {
				loggedSessions.splice(i,1);
				return res.status(403).json({"Message":"Forbidden"});
			} else {
				loggedSessions[i].ttl = now+time_to_live_diff;
				req.session = {};
				req.session.user = loggedSessions[i].user;
				return next();
			}
		} 
	}
	return res.status(403).json({"Message":"Forbidden"});
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({"Message":"Username already in use"});
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"})
		}
		let user = new userModel ({
			username:req.body.username,
			password:hash
		})
		user.save().then(function(user) {
			return res.status(201).json({"Message":"Register success"})
		}).catch(function(err) {
			if(err.code === 11000) {
				return res.status(409).json({"Message":"Username already in use"})
			}
			return res.status(500).json({"Message":"Internal Server Error"})
		})
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			bcrypt.compare(req.body.password,registeredUsers[i].password,function(err,success) {
				if(err) {
					console.log(err);
					return res.status(500).json({"Message":"Internal server error"});
				}
				if(!success) {
					return res.status(401).json({"Message":"Unauthorized"});
				}
				let token = createToken();
				let now = Date.now();
				let session = {
					"token":token,
					"user":req.body.username,
					"ttl":now+time_to_live_diff
				}
				loggedSessions.push(session);
				return res.status(200).json({"token":token});
			})
			return;
		}
	}
	return res.status(401).json({"Message":"Unauthorized"});
})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({"Message":"Not found"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(req.headers.token === loggedSessions[i].token) {
			loggedSessions.splice(i,1);
			return res.status(200).json({"Message":"Logged out"});
		}
	}
	return res.status(404).json({"Message":"Not found"});
})

app.use("/api",isUserLogged,shoppingroute);

console.log("Running in port",port);

app.listen(port);