import {useState,useEffect,useRef} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import io from "socket.io-client"
import Message from "../components/Message.jsx"
import SendField from "../components/SendField.jsx"

let socket

function SingleRoom(){

	const [message,setMessage] = useState("")
	const [messages,setMessages] = useState([])
	const [currentRoom,setCurrentRoom] = useState("")

	useEffect(() => {
		socket = io("http://localhost:6969")
	},[])
	
	const {id} = useParams()

	useEffect(() => {
		socket.emit("join-room", id)
	},[])

	useEffect(() => {
		axios.get(`/messages/${id}`).then(res => {
			setMessages(res.data)
		})
	},[])

	useEffect(() => {
		axios.get(`/room/${id}`).then(({data}) => setCurrentRoom(data))
	},[])

	const textRef = useRef(null)
	const scrollTo = useRef()

	const sendMessage = (e) => {
		e.preventDefault()
		if(message.length > 0) {
			socket.emit("send-message", {message,id})
		}
		setMessage("")

	}

	useEffect(() => {
		const div = scrollTo.current
		if(div){
			div.scrollIntoView({behavior:"smooth"})
		}
	},[messages])

	useEffect(() => {
		socket.on("recieve-message", data => {
			setMessages([...messages,data])
		})
	})


	return (
		<div className="chat-container">
		
			<div className="chat">
				<h1 className="current-room">{currentRoom}</h1>
				<div className="messages">
					{messages.map((message,id) => {
					return (
						<Message message={message} key={id} />
					)}
				)}
					<div ref={scrollTo}></div>
				</div>
			</div>

			<SendField sendMessage={sendMessage} textRef={textRef} message={message} setMessage={setMessage}/>
				
		</div>
	)
}

export default SingleRoom;