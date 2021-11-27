import React, { useCallback } from 'react';
import { Auth } from './pages/Main/Auth';
import { Chat } from './pages/Chats/Chat';
import { BackgroundStars } from './components/BackgroundStars/BackgroundStars';
import { useAppSelector } from './hooks/hooks';


import './App.scss';
const PAGES = {
	auth: <Auth />,
	chat: <Chat />
}

function App() {
	const { page } = useAppSelector(state => state.page);

	return (
		<>
			<BackgroundStars />
			<div className="Container">
				{PAGES[page]}
			</div>
		</>	
	)
}

export default App;
