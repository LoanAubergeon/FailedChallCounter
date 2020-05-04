import React from 'react';
import 'bulma/css/bulma.css'
import '../App.css';

class Player extends React.Component {
    render() {
    const {
        id,
        nom,
        value,
        selectPlayer,
        style
    } = this.props;

    return (
        <li>
            <div class="notification player" style={style} onClick={() => {
                selectPlayer(id);
            }}>
            <div class="columns">
            <div class="column is-2">
                <img src={require('../' + nom + '.png')} alt="" class="player-img"/> 
            </div>
            <div class="column is-2"></div>
            <div class="column text is-4">
                <h2 class="title">{nom}</h2>
            </div>
            <div class="column text is-3"></div>
            <div class="column text is-1">
                <h3 class="title">{value}</h3>
            </div>
        </div>
    </div>
        </li>
    )
    }
}

export default Player
