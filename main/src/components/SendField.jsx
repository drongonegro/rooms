function SendField({sendMessage,textRef,message,setMessage}) {
	return (
		<form className="send-field" onSubmit={sendMessage}>

			<textarea 
			placeholder="message..." 
			maxLength="800"
			ref={textRef} 
			value={message} 

			onChange={(e) => {
				setMessage(e.target.value)
				textRef.current.style.height = "inherit"

				textRef.current.style.height = Math.max(textRef.current.scrollHeight,32) + "px"
			}} 


			name="multiliner" 
			rows="1" 
			columns="1"></textarea>

			<button className="message-send">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
				</svg>
			</button>

		</form>
	)
}

export default SendField;