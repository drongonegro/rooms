import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import Room from "../components/Room.jsx"

function Home(){

	const [rooms,setRooms] = useState([])

	useEffect(() => {
		axios.get("/rooms").then(res => setRooms(res.data))
	},[])

	return (
		<div className="rooms-container" >
			{rooms.map((room,id) => 
				<div key={id}>
					<Room room={room} id={id}/>
				</div>
			)}
		</div>
	)
}

export default Home;