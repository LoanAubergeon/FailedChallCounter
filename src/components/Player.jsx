import React from 'react';
import 'bulma/css/bulma.css'
import '../App.css';

class Player extends React.Component {
    incrementValue() {
        
    }

    decrementValue() {
        console.log('Cliqué -')
    }

    render() {
    const {
        nom,
        logo,
        value,
        updateCount
    } = this.props;

    return (
        <li>
            <div class="notification player">
            <div class="columns">
            <div class="column is-2">
                <img src={logo} alt="" class="exp-img"/>
            </div>
            <div class="column text is-4">
                <h2 class="title is-5">{nom}</h2>
            </div>
            <div class="column text is-2">
                <h3 class="title is-5">{value}</h3>
            </div>
            <div class="column is-2">
                <button
                    class="button is-primary is-ligh"
                    onClick={ () =>
                {
                    updateCount(value + 1,nom);
                }
                }>+</button>
            </div>
            <div class="column is-2">
                <button
                    class="button is-danger is-light" 
                    onClick={ () =>
                {
                    updateCount(value - 1,nom);
                }
                }>-</button>
            </div>
        </div>
    </div>
        </li>
    )
    }
}

export default Player
