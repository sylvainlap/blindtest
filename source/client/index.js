import React from 'react';
import ReactDOM from 'react-dom';
import YTPlayer from './components/YTPlayer';

ReactDOM.render(
	<YTPlayer videoId="y6Sxv-sUYtM" duration={20} seekTo={60} />,
	document.getElementById('root')
);
