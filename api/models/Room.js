import mongoose from "mongoose"

const Room = mongoose.model("room", new mongoose.Schema({
	title: String
}))

export default Room;