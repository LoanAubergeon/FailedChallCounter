import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import db from './Firebase';

import Player from './components/Player'
class App extends Component {
  constructor(props) {
    super(props);
    const ref = db.database().ref();
    this.database = ref.child("chall-counter");
    this.unsubscribe = null;
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    try {
      this.database.on("value", snapshot => {
        console.log(snapshot.val())
        let data = [];
        snapshot.forEach((snap) => {
          data.push(snap.val());
        });
        console.log("Data", data)
        this.setState({ data });
      });
    } catch (error) {
      console.log('BUG');
    }
  }

  render() {
    console.log(this.database);
    return (
      <div className="App">
        <div class="container is-primary">
          <h1>Failed chall counter</h1>
        </div>
        <div class="container">
          <div class="tile">
            <ul class="tile is-vertical is-8">
              {
                this.state.data.map((player) => {
                  return (
                    <Player 
                      nom={player.name} 
                      value={player.value}
                      />
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
