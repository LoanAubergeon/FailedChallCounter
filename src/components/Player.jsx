import React from 'react';
import 'bulma/css/bulma.css'
import '../App.css';

class Player extends React.Component {
  render() {
    const {
        nom,
        logo,
        value,
    } = this.props;
    return (
        <li>
            <div class="notification">
            <div class="columns">
            <div class="column is-2">
                <img src={logo} alt="" class="exp-img"/>
            </div>
            <div class="column is-4">
                {nom}
            </div>
            <div class="column is-2">
                {value}
            </div>
            <div class="column is-2">
                <button>+</button>
            </div>
            <div class="column is-2">
                <button>-</button>
            </div>
        </div>
    </div>
        </li>
    )
    }
}

export default Player
