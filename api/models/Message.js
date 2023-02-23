import mongoose from "mongoose"

const Message = mongoose.model("message", new mongoose.Schema({
	body: String,
	chatId: String
}))

export default Message;