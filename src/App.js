import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import config from './config';
import * as firebase from 'firebase'
import ScaleLoader from "react-spinners/ScaleLoader";

import Player from './components/Player'

import logo from './winner.png'
class App extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
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
    const ref = firebase.database().ref('players')
    try {
      ref.on('value', snapshot => {
        this.setState({
          data: snapshot.val(),
          loading: false
        })
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
  sortData() {
    let sortedData = this.state.data.sort((a, b) => a.value < b.value);
    this.setState({
      data: sortedData
    });
  }

  updateCount(newValue, playerName) {
    this.setState({
      disabled: true,
      });
    setTimeout(() => { 
      this.setState({
        disabled: false,
      }); }, 10000);
    const ref = firebase.database().ref('players')
    let newState = [...this.state.data]
    const index = this.state.data.findIndex(player => (player.nom === playerName));
    newState[index] = {...newState[index], value: newValue}
    this.setState({
      data: newState,
      });
    
    try{
      ref.child(index).update({value: newValue})
      //ref.set(this.state.data.sort((a, b) => a.value < b.value))
    } catch (error) {
      console.log(error);
    }
  }

  selectPlayer(id) {
    this.setState({
      selectedPlayerId: id
    });
  };

  getBottomBar() {
    const id = this.state.selectedPlayerId;
    const player = this.state.data[id];
    return (id !== -1 )
      ? (<div class="notification selector">
          <div class="columns">
            <div class="column is-2">
              <img src={require('./'+ player.nom + '.png')} alt="" class="selector-img"/> 
            </div>
            <div class="column text is-4">
              <h2 class="title">{player.nom}</h2>
            </div>
            <div class="column text is-2">
            </div>
            <div class="column is-1"></div>
            <div class="column is-1">
              <button
                disabled={this.state.disabled}
                class="button is-primary is-inverted"
                onClick={ () =>{ this.updateCount(player.value + 1,player.nom)}}>
                +
              </button>
            </div>
            <div class="column is-1"></div>
            <div class="column is-1">
              <button
                disabled={this.state.disabled}
                class="button is-danger is-inverted" 
                onClick={ () => {
                  this.updateCount(player.value - 1,player.nom)}}
                >
                  -
              </button>
      </div> 
      </div>
      </div> 
        )
      : <div className="notification selector">Click a player to select</div>;
  };

  spinner() {
    return (
      <div className="sweet-loading spinner">
        <ScaleLoader
          size={150}
          color={"white"}
          loading={this.state.loading}
        />
      </div>)
  }

  render() {
    return (
      <div className="App">
        <div class="main container">
        <div class="container mytitle">
          <img src={logo} alt="" className="title-image"/>
          <h1 class="maintitle">Failed challenge</h1>
          <h1 class="mysubtitle">leaderboard</h1>
        </div>
        <div class="container has-text-centered">
          <div class="tile mytile">
            {this.state.loading ? this.spinner() :
            <ul class="tile is-vertical players">
              {
                this.state.data.map( (player, i) => {
                  let style = {};
                  if (this.state.selectedPlayerId === i) {
                    style['background-color'] = 'rgb(210, 210, 210)';
                  }
                  return (
                    <Player 
                      nom={player.nom}
                      id={i} 
                      value={player.value}
                      selectPlayer={this.selectPlayer.bind(this)}
                      key={i}
                      style={style}
                      />
                  )
                })
              }
            </ul>}
          </div>
        </div>
        <div class="container has-text-centered">
          {this.getBottomBar()}
        </div>
        <div class="container bottom" onClick={() => {
                this.selectPlayer(-1);
            }}></div>
        </div>
      </div>
    );
  }
}

export default App;
