import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import Message from "./models/Message.js"
import Room from "./models/Room.js"
import rooms from "./routes/rooms.js"
import room from "./routes/room.js"
import messages from "./routes/messages.js"
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


app.get("/rooms",rooms)
app.get("/room/:id",room)
app.get("/messages/:id",messages)


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