import React, { Component } from "react";
import PropTypes from "prop-types";
import "bulma/css/bulma.css";
import "./tabs.css";

class Tab extends Component {
	static propTypes = {
		activeTab: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	onClick = () => {
		const { label, onClick } = this.props;
		onClick(label);
	};

	render() {
		const {
			onClick,
			props: { activeTab, label },
		} = this;

		let className = "";
		if (activeTab === label) {
			className += "is-active";
		}

		return (
			<li className={className} onClick={onClick}>
				{/* eslint-disable-next-line*/}
				<a>{label}</a>
			</li>
		);
	}
}

export default Tab;
