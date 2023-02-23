import { useState, useEffect, useRef, useReducer, createContext, useContext } from "react"
import { useLocation, useParams, BrowserRouter,Routes, Route, Link, useNavigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios"
import "./App.css"	
import Home from "./pages/Home.jsx"
import SingleRoom from "./pages/Singleroom.jsx"

function App() {	
	
	axios.defaults.baseURL = "http://localhost:6969"

	return (
		<div className="App"> 
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/:id" element={<SingleRoom/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;