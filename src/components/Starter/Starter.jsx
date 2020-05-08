import React, { Component } from "react";
import "./starter.css";
import "bulma/css/bulma.css";
import config from "../Config/config";
import * as firebase from "firebase";
import ScaleLoader from "react-spinners/ScaleLoader";

import Player from "./Player";

import go from "../../sounds/go.wav";
import ready from '../../sounds/ready.wav'

class LeaderBoard extends Component {
	constructor(props) {
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
			//firebase.analytics();
		}
		super(props);
		this.state = {
			data: [],
			readyPlayers: [],
			presentPlayers: [],
			go: false,
			loading: true,
		};
    }
    

	async componentDidMount() {
		const ref = firebase.database().ref("isReady");
		try {
			ref.on("value", (snapshot) => {
				this.setState({
					data: snapshot.val(),
					loading: false,
				});
				let data = [];
				snapshot.forEach((snap) => {
					data.push(snap.val());
                });
				this.setState({ data });
			});
		} catch (error) {
			console.log(error);
		}
	}

	setIsReady(id) {
		const ref = firebase.database().ref("isReady");
		const index = this.state.data.findIndex((player) => player.id === id);
		const currentIsReady = this.state.data[index].isReady;
		try {
			ref.child(id).update({ isReady: !currentIsReady });
		} catch (error) {
			console.log(error);
		}
	}

	setIsPresent(id) {
		const ref = firebase.database().ref("isReady");
		const index = this.state.data.findIndex((player) => player.id === id);
		const currentIsPrensent = this.state.data[index].isPresent;
		try {
			// if isReady and set isPresent to false, set isReady to false !
			if (currentIsPrensent) {
				ref.child(id).update({ isPresent: !currentIsPrensent, isReady: false });
			}
			ref.child(id).update({ isPresent: !currentIsPrensent });
		} catch (error) {
			console.log(error);
		}
	}

	checkReady() {
		let currentState = this.state.readyPlayers;
		const readyPlayers = this.state.data.filter((player) => player.isReady === true);
		if (currentState.length !== readyPlayers.length) {
			this.setState({
				readyPlayers: readyPlayers,
			});
		}
	}

	checkPresent() {
		let currentState = this.state.presentPlayers;
		const presentPlayers = this.state.data.filter((player) => player.isPresent === true);
		if (currentState.length !== presentPlayers.length) {
			this.setState({
				presentPlayers: presentPlayers,
			});
		}
	}

	checkGo() {
		const go = this.state.go;
		const presentPlayers = this.state.presentPlayers;
		const readyPlayers = this.state.readyPlayers;
		let currentGo = false;
		if ((presentPlayers.length === readyPlayers.length) & (readyPlayers.length > 0)) {
            currentGo = true;
		}
		if (currentGo !== go) {
            if (currentGo) {
                this.playSoundGo();
            }
			this.setState({
				go: currentGo,
            });
        }
	}

	componentDidUpdate() {
		this.checkPresent();
		this.checkReady();
		this.checkGo();
	}

	spinner() {
		return (
			<div className='sweet-loading spinner'>
				<ScaleLoader size={150} color={"white"} loading={this.state.loading} />
			</div>
		);
	}

	resetReadyPlayers() {
		this.state.data.forEach((player) => {
			if (player.isReady) {
				this.setIsReady(player.id)
			}
		});
    }
    
    playSoundGo() {
        const likeAudio = new Audio(go);
        likeAudio.play();
	}
	playSoundReady() {
        const likeAudio = new Audio(ready);
        likeAudio.play();
    }

	render() {
        
		let style = {};
		if (this.state.go) {
			style["backgroundColor"] = "rgb(138, 249, 178)";
		}
		return (
			<div class='starter main container' style={style}>
				{this.state.go ? (
					<div class='starter container mytitle'>
						<h1 class='starter maintitle'>GO !!!</h1>
						<button class='starter resetbutton button is-light' onClick={this.resetReadyPlayers.bind(this)}>
							Reset
						</button>
					</div>
				) : (
					<div class='starter container mytitle' onClick={this.playSoundReady}>
						<h1 class='starter maintitle'>tout le monde</h1>
						<h1 class='starter mysubtitle'>il est pret ?</h1>
					</div>
				)}
				<div class='starter container has-text-centered'>
					<div class='starter tile mytile'>
						{this.state.loading ? (
							this.spinner()
						) : (
							<ul class='starter tile is-vertical players'>
								{this.state.data.sort((x, y) =>  (x.isPresent === y.isPresent)? 0 : x.isPresent? -1 : 1).map((player, i) => {
									return (
										<Player
											nom={player.nom}
											key={i}
											id={player.id}
											isReady={player.isReady}
											isPresent={player.isPresent}
											togglePresent={this.setIsPresent.bind(this)}
											toggleReady={this.setIsReady.bind(this)}
										/>
									);
								})}
							</ul>
						)}
					</div>
				</div>
				<div class='starter bottom'></div>
			</div>
		);
	}
}

export default LeaderBoard;
