import express from "express"
import Message from "../models/Message.js"
const router = express.Router()

const messages = router.get("/messages/:id", async (req,res) => {
	const chatMessages = await Message.find({chatId:req.params.id})
	res.json(chatMessages)
})

export default messages;