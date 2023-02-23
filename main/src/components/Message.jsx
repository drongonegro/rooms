function Message({message}){
	return (
		<div className="message">
			<h2>{message.body || message}</h2>
		</div>
	)
}

export default Message;