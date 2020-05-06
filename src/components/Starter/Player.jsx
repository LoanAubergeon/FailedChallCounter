import React from "react";
import "semantic-ui-css/components/checkbox.min.css";
import "bulma/css/bulma.css";
import "./starter.css";
import { Checkbox } from "semantic-ui-react";

class Player extends React.Component {
	doNothing() {
		let i = 0;
	}
	render() {
		const { nom, isPresent, togglePresent, isReady, toggleReady } = this.props;
		let style = {};

		if (!isPresent) {
			style["opacity"] = "40%";
		}

		if (isPresent && !isReady) {
			style["background"] = "rgb(2384, 77, 77, 0.75)";
		}

		if (isPresent && isReady) {
			style["background"] = "rgb(61, 198, 113, 0.75)";
		}

		return (
			<li>
				<div
					class='notification starter player-notification'
					style={style}
					// onClick={() => {
					// 	isPresent ? toggleReady(nom) : this.doNothing();
					// }}
					>
					<div class='columns is-vcentered is-desktop'>
						<div class='starter column is-1'>
							<Checkbox
								checked={isPresent}
								onClick={() => {
									togglePresent(nom);
								}}
							/>
						</div>
						<div class='starter column is-1'></div>
						<div class='starter column text is-8'>
							<h2 class='starter title'>{nom}</h2>
						</div>
						<div class='starter column text is-2'>
							{isPresent ? (
								<Checkbox
									toggle
									checked={isReady}
									onClick={() => {
										toggleReady(nom);
									}}
								/>
							) : (
								<Checkbox toggle checked={false} disabled />
							)}
						</div>
					</div>
				</div>
			</li>
		);
	}
}

export default Player;
