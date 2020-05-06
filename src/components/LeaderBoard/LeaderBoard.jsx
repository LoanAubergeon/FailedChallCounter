import React, { Component } from "react";
import "./LeaderBoard.css";
import "bulma/css/bulma.css";
import config from "../Config/config";
import * as firebase from "firebase";
import ScaleLoader from "react-spinners/ScaleLoader";

import Player from "./Player/Player";

import logo from "../../images/winner.png";
class LeaderBoard extends Component {
	constructor(props) {
		super(props);
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
			//firebase.analytics();
		}
		this.state = {
			data: [],
			loading: true,
			selectedPlayerId: -1,
			disabled: false,
		};
	}

	async componentDidMount() {
		const ref = firebase.database().ref("players");
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

	updateCount(newValue, id) {
		this.selectPlayer(-1);
		this.setState({
			disabled: true,
		});
		setTimeout(() => {
			this.setState({
				disabled: false,
			});
		}, 10000);
		const ref = firebase.database().ref("players");
		try {
			ref.child(id).update({ value: newValue });
		} catch (error) {
			console.log(error);
		}
	}

	selectPlayer(id) {
		this.setState({
			selectedPlayerId: id,
		});
	}

	getBottomBar() {
		const id = this.state.selectedPlayerId;
		const playerIndex = this.state.data.findIndex((player) => player.id === id);
    const player = this.state.data[playerIndex];
    
		return id !== -1 ? (
			<div class='notification selector'>
				<div class='columns'>
					<div class='column is-2'>
						<img
							src={require("../../images/" + player.nom + ".png")}
							alt=''
							class='selector-img'
						/>
					</div>
					<div class='column text is-8'>
						<h2 class='selector-title'>{player.nom}</h2>
					</div>
					<div class='column is-1'>
						<button
							disabled={this.state.disabled}
							class='button is-success mybutton'
							onClick={() => {
								this.updateCount(player.value + 1, player.id);
							}}>
							+
						</button>
					</div>
					<div class='column is-1'>
						<button
							disabled={this.state.disabled}
							class='button is-danger mybutton'
							onClick={() => {
								this.updateCount(player.value - 1, player.id);
							}}>
							-
						</button>
					</div>
				</div>
			</div>
		) : (
			<div className='notification selector'>Sélectionnez un joueur (Jambe par exemple)</div>
		);
	}

	spinner() {
		return (
			<div className='sweet-loading spinner'>
				<ScaleLoader size={150} color={"white"} loading={this.state.loading} />
			</div>
		);
	}

	render() {
		return (
			<div className='App'>
				<div class='main container'>
					<div class='container mytitle'>
						<img src={logo} alt='' className='title-image' />
						<h1 class='maintitle'>Failed challenge</h1>
						<h1 class='mysubtitle'>leaderboard</h1>
					</div>
					<div class='container has-text-centered'>
						<div class='tile mytile'>
							{this.state.loading ? (
								this.spinner()
							) : (
								<ul class='tile is-vertical players'>
									{this.state.data
										.sort((a, b) => a.value < b.value)
										.map((player, i) => {
											let style = {};
											if (this.state.selectedPlayerId === player.id) {
                        style["box-shadow"] = "0px 0px 5px black";
                        style["transform"] = "scaleX(1.05)";
                      }
                      if (i === 0) {
                        style["background-color"] = "rgb(212,175,55)"
                      }
											return (
												<Player
                          index={i}
													nom={player.nom}
													id={player.id}
													value={player.value}
													selectPlayer={this.selectPlayer.bind(this)}
													key={player.id}
													style={style}
												/>
											);
										})}
								</ul>
							)}
						</div>
					</div>
					<div class='container has-text-centered'>{this.getBottomBar()}</div>
					<div
						class='container bottom'
						onClick={() => {
							this.selectPlayer(-1);
						}}></div>
				</div>
			</div>
		);
	}
}

export default LeaderBoard;
