import React, { Component } from "react";
var d3 = require("d3");

export default class D3MDSAttributes extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}

	render() {
		return (
			<svg width={width} height={height}>
				<g
					ref={element => (this.svg = d3.select(element))}
					transform={
						"translate(" +
						(margins.left - 20) +
						"," +
						margins.top +
						")"
					}
				/>
			</svg>
		);
	}
}

const margins = { top: 20, bottom: 20, right: 20, left: 20 };
const width = 500;
const height = 500;
