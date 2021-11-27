import React from 'react';
import { Auth } from './pages/Main/Auth';
import { Chat } from './pages/Chats/Chat';
import { BackgroundStars } from './components/BackgroundStars/BackgroundStars';
import { useAppSelector } from './hooks/hooks';
import Alert from '@mui/material/Alert';


import './App.scss';
const PAGES = {
	auth: <Auth />,
	chat: <Chat />
}

function App() {
	const { page } = useAppSelector(state => state.page);
	const { showAlert, alertText } = useAppSelector(state => state.page);

	const renderAlert = () => {
		return (
			<div className="MainAlert">
				<Alert severity="warning">{alertText}</Alert>
			</div>
		)
	}

	return (
		<>
			{showAlert && renderAlert()}
			<BackgroundStars />
			<div className="Container">
				{PAGES[page]}
			</div>
		</>	
	)
}

export default App;
