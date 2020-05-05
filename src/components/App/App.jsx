import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css";
import config from "../Config/config";
import * as firebase from "firebase";

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
					<div label='Home'>
						Kikou
					</div>
					<div label='LeaderBoard'>
						<LeaderBoard />
					</div>
					<div label='Go?'>
						<Starter />
					</div>
				</Tabs>
			</div>
		);
	}
}

export default App;
