import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import Message from "./models/Message.js"
import Room from "./models/Room.js"
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const app = express()
const PORT = process.env.PORT || 6969

app.use(express.json())
app.use(cors({
	 origin: 'http://localhost:5173',
}))

const server = http.createServer(app)

const io = new Server(server, {
	cors : {
		origin: "http://localhost:5173",
		methods: ["GET","POST"],
	},
})


app.get("/rooms", async (req,res) => {
	const rooms = await Room.find()
	res.json(rooms)
})

app.get("/room/:id", async (req,res) => {
	const thatRoom = await Room.find({_id:req.params.id})
	res.json(thatRoom[0].title)
})

app.get("/messages/:id", async (req,res) => {
	const chatMessages = await Message.find({chatId:req.params.id})
	res.json(chatMessages)
})



io.on("connection", socket => {
	socket.on("join-room", id => {
		socket.join(id)
	})

	socket.on("send-message", async (data) => {
		const createdMessage = await Message.create({
			body: data.message,
			chatId: data.id
		})
		io.in(data.id).emit("recieve-message",data.message)
	})

	socket.off("join-room", () => {
		socket.leave(id)
	})
})

server.listen(PORT, () => console.log("running"))
