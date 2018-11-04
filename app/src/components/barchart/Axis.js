import React, { Component } from "react";
var d3 = require("d3");

export default class Axis extends Component {
	componentDidMount() {
		this.renderAxis();
	}

	componentDidUpdate() {
		this.renderAxis();
	}

	renderAxis() {
		const axisType = `axis${this.props.orient}`;
		const axis = d3[axisType]()
			.scale(this.props.scale)
			.tickSize(-this.props.tickSize)
			.tickPadding([12])
			.ticks(this.props.bins ? [this.props.bins] : [4]);
		d3.select(this.axisElement).call(axis);
	}

	render() {
		return (
			<g
				className={`Axis Axis-${this.props.orient}`}
				ref={el => {
					this.axisElement = el;
				}}
				transform={this.props.translate}
			/>
		);
	}
}
