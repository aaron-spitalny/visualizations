import React, { Component } from "react";
var d3 = require("d3");
import Tooltip from "@material-ui/core/Tooltip";

export default class Bars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mouseOver: null
		};
		this.colorScale = d3
			.scaleLinear()
			.domain([0, this.props.maxRange])
			.range(["#f2fde4", "#008b00"])
			.interpolate(d3.interpolateLab);
		this.handleOver = this.handleOver.bind(this);
		this.handleExit = this.handleExit.bind(this);
	}
	handleOver(event) {
		this.setState({ mouseOver: event.target.id });
	}
	handleExit(event) {
		this.setState({ mouseOver: null });
	}
	render() {
		const { scales, margins, data, svgDimensions } = this.props;
		const { xScale, yScale } = scales;
		const { height } = svgDimensions;
		const bars =
			this.props.binnable === true
				? data.map((bin, index) => (
						<Tooltip key={index} title={bin.length} placement="top">
							<rect
								onMouseOver={e => this.handleOver(e)}
								onMouseLeave={e => this.handleExit(e)}
								onExit={() => console.log("hello")}
								id={index}
								key={index}
								x={xScale(bin.x0) + 1}
								y={yScale(bin.length)}
								height={
									this.state.mouseOver == index
										? yScale(0) -
												yScale(bin.length) +
												8
										:yScale(0) - yScale(bin.length)
								}
								width={
									this.state.mouseOver == index
										? Math.max(
													0,
													xScale(bin.x1) -
														xScale(bin.x0) -
														1
												) + 5
										: Math.max(
													0,
													xScale(bin.x1) -
														xScale(bin.x0) -
														1
												)
								}
								fill={this.colorScale(bin.length)}
							/>
						</Tooltip>
				  ))
				: Object.keys(data).map((key, index) => (
						<Tooltip key={key} title={data[key]} placement="top">
							<rect
								onMouseOver={e => this.handleOver(e)}
								onMouseLeave={e => this.handleExit(e)}
								id={key}
								key={key}
								x={xScale(key)}
								y={yScale(data[key])}
								height={
									this.state.mouseOver === key
										? height -
										  margins.bottom -
										  scales.yScale(data[key]) +
										  8
										: height -
										  margins.bottom -
										  scales.yScale(data[key])
								}
								width={
									this.state.mouseOver === key
										? xScale.bandwidth() + 5
										: xScale.bandwidth()
								}
								fill={this.colorScale(data[key])}
							/>
						</Tooltip>
				  ));

		return <g>{bars}</g>;
	}
}
