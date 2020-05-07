import React, { Component } from "react";
import "bulma/css/bulma.css";
import "./home.css";

class Home extends Component {
	render() {
		return (
			<div class='App'>
				<iframe
					src='https://giphy.com/embed/ZTRQHRdfTdG5W'
					width='480'
					height='480'
					frameBorder='0'
					class='giphy-embed'
					allowFullScreen>	
				</iframe>
			</div>
		);
	}
}

export default Home;
