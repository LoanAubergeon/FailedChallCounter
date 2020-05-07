import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css";
import config from "../Config/config";
import * as firebase from "firebase";

import Home from '../Home/Home'
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import Starter from '../Starter/Starter'
import Tabs from "../Tabs/Tabs";

class App extends Component {
	constructor(props) {
		super(props);
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
			//firebase.analytics();
		}
	}

	render() {
		return (
			<div className='App'>
				<Tabs>
					<div class='content' label='Home'>
						<Home />
					</div>
					<div class='content' label='LeaderBoard'>
						<LeaderBoard />
					</div>
					<div class='content' label='Go?'>
						<Starter />
					</div>
				</Tabs>
			</div>
		);
	}
}

export default App;
