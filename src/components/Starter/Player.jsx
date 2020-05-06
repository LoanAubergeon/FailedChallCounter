import React from "react";
import "semantic-ui-css/components/checkbox.min.css";
import "bulma/css/bulma.css";
import "./starter.css";
import { Checkbox } from "semantic-ui-react";

class Player extends React.Component {
	render() {
		const { nom, isPresent, togglePresent, isReady, toggleReady } = this.props;
		let style = {};

		if (!isPresent) {
			style["opacity"] = "40%";
		}

		if (isPresent && !isReady) {
			style["background"] = "rgb(224, 86, 86)";
		}

		if (isPresent && isReady) {
			style["background"] = "rgb(60, 175, 104)";
		}

		return (
			<li>
				<div class='notification starter player-notification' style={style}>
					<div class='columns'>
						<div class='starter column is-2'>
							<Checkbox
								checked={isPresent}
								onClick={() => {
									togglePresent(nom);
								}}
							/>
						</div>
						<div class='starter column text is-8'>
							<h2 class='starter title'>{nom}</h2>
						</div>
						<div class='starter column text is-2'>
							{isPresent ? (
								<Checkbox
									toggle
									checked={isReady}
									disabled
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
