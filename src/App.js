import React, { useEffect, useRef } from 'react'
import initListen from './utils/WebIMListen'
import { loginByToken } from './api/login'
import './i18n'

import {
	Routes,
	Route,
	Navigate,
	BrowserRouter
} from "react-router-dom";
import Main from './pages/main'
import Login from './pages/login';

import './App.css'
const App = () => {
	useEffect(() => {
		initListen()
		let authData = JSON.parse(sessionStorage.getItem('webim_auth')) || {}
		if (authData.user && authData.accessToken) {
			loginByToken(authData.user, authData.accessToken)
		}
	}, [])
	const AuthorizedComponent = (props) => {
		const Component = props.component;
		const webimAuth = sessionStorage.getItem('webim_auth')

		return webimAuth ? (
			<Navigate to="/main" render={props => <Component {...props} />} />
		) : <Navigate to="/login" />
	}

	return (
		<div className='container'>
			<BrowserRouter basename='/'>
				<Routes>
					<Route index path="/*" element={<AuthorizedComponent />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="main" element={<Main />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
