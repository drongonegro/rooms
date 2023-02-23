import {Link} from "react-router-dom"

function Room({room,id}){
	return (
		<div className="room-container">
			<h2 className="roomName"><Link className="roomlink" to={`/${room._id}`}>{room.title}</Link></h2>
		</div>
	)
}

export default Room;