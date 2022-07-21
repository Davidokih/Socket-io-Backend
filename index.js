// require("./utils/db");
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*", pingTimeout: 5000 } },);
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	res.send("Ths Socket io");
});

app.use("/api", require('./controller/controller'));
const url = "mongodb+srv://Davidokih:dav517id@cluster0.1nweu.mongodb.net/socketIO?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
	console.log("connected to database");
}).catch((err) => {
	console.log(err);
});

const db = mongoose.connection;

db.on("open", () => {
	const observer = db.collection("users").watch();

	observer.on("change", (change) => {
		if (change.operationType === "insert") {
			const newData = {
				name: change.fullDocument.name,
				_id: change.fullDocument._id,
				like: change.fullDocument.like
			};
			io.emit('newEntry', newData);
		}
	});
});
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	socket.on("disconnect", () => {
		console.log("user has been disconnected");
	});
});

server.listen(2000, () => {
	console.log("connected to 2000");
});