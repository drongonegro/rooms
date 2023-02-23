import express from "express"
import Room from "../models/Room.js"
const router = express.Router()

const rooms = router.get("/rooms", async (req,res) => {
	const rooms = await Room.find()
	res.json(rooms)
})

export default rooms;