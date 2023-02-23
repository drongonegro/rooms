import express from "express"
import Room from "../models/Room.js"
const router = express.Router()

const room = router.get("/room/:id", async (req,res) => {
	const thatRoom = await Room.find({_id:req.params.id})
	res.json(thatRoom[0].title)
})

export default room;