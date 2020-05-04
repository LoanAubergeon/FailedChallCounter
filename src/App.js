import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import config from './config';
import * as firebase from 'firebase'

import Player from './components/Player'
class App extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }
    this.state = {
      data: [],
      loading: true
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

  handleCount(newValue, playerName) {
    const ref = firebase.database().ref('players')
    let newState = [...this.state.data]
    const index = this.state.data.findIndex(player => (player.nom === playerName));
    newState[index] = {...newState[index], value: newValue}
    this.setState({
      data: newState,
      });
    
    try{
      //ref.child(index).update({value: newValue})
      ref.set(this.state.data.sort((a, b) => a.value < b.value))
    } catch (error) {
      console.log(error);
    }
    
  }
  

  render() {
    return (
      <div class="App">
        <div class="main container">
        <div class="container mytitle">
          <h1 class="title is-1">Failed chall counter</h1>
        </div>
        <div class="container has-text-centered">
          <div class="tile mytile">
            <ul class="tile is-vertical players">
              {
                this.state.data.map( (player, i) => {
                  return (
                    <Player 
                      nom={player.nom} 
                      value={player.value}
                      updateCount={this.handleCount.bind(this)}
                      key={i}
                      />
                  )
                })
              }
            </ul>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
