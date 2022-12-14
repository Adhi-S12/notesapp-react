import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/Home/Home';
import AuthContext from './context/AuthContext';

function App() {
	const [ token, setToken ] = useState('');

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</div>
		</AuthContext.Provider>
	);
}

export default App;

// https://notesappapi-production.up.railway.app/
// ${process.env.REACT_APP_API_DOMAIN}
