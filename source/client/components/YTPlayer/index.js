import React, {Component} from 'react';
import load from 'load-script';

class YTPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			remainingTime: props.duration,
			player: {}
		};
	}

	componentDidMount() {
		this.createPlayer();
		load('https://www.youtube.com/iframe_api');
	}

	componontWillUnmount() {
		clearInterval(this.interval);
	}

	createPlayer() {
		window.onYouTubeIframeAPIReady = () => {
			this.state.player = new YT.Player('ytplayer', {
				height: '390',
				width: '640',
				videoId: this.props.videoId,
				playerVars: {
					controls: 0,
					showinfo: 0
				},
				events: {
					onReady: this.onPlayerReady.bind(this),
					onStateChange: this.onPlayerStateChange.bind(this)
				}
			});
		};
	}

	onPlayerReady(event) {
		event.target.setVolume(0);
		event.target.seekTo(this.props.seekTo);
	}

	onPlayerStateChange(event) {
		if (event.data === 1) {
			this.interval = setInterval(this.tick.bind(this), 1 * 1000);
		}
	}

	tick() {
		this.setState({
			remainingTime: this.state.remainingTime - 1
		});
		if (this.state.remainingTime === 10) {
			this.state.player.setVolume(100);
		}
		if (this.state.remainingTime === 0) {
			clearInterval(this.interval);
			this.state.player.stopVideo();
		}
	}

	render() {
		let text = 'secondes';
		if (this.state.remainingTime === 1) {
			text = 'seconde';
		}
		return (
			<div>
				<div id="ytplayer"></div>
				<hr />
				<h3>Plus que {this.state.remainingTime} {text}...</h3>
			</div>
		);
	}
}

YTPlayer.propTypes = {
	videoId: React.PropTypes.string,
	duration: React.PropTypes.number,
	seekTo: React.PropTypes.number
};

YTPlayer.defaultProps = {
	videoId: 'F2AitTPI5U0', // Black or White
	duration: 30,
	seekTo: 30
};

export default YTPlayer;
