import React, { Component } from "react";
var d3 = require("d3");
import { screePlot } from "./pcaData";

export default class D3ScreePlot extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		var x = d3.scaleBand().padding(.1);
		var y = d3.scaleLinear();

		this.svg.append("g").attr("class", "axis--x");
		this.svg.append("g").attr("class", "axis--y");
		//y axis label
		this.svg
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "-3rem")
			.attr("text-anchor", "end")
			.text("PCA");
		//ranges for x and y axis
		x.rangeRound([0, width]);
		y.rangeRound([height, 0]);
		x.domain(screePlotArray.map((value, index) => "pca" + index));
		y.domain([0, Math.max.apply(Math, screePlotArray) + 1]);
		//
		this.svg
			.select(".axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));
		//
		this.svg.select(".axis--y").call(d3.axisLeft(y).ticks(10));
		//
		var bars = this.svg.selectAll(".bar").data(screePlotArray);
		console.log(y(5))
		bars
			.enter()
			.append("rect")
			.attr("class", "barscree")
			.attr("x", (v, index) => x("pca"+index))
			.attr("y", v => y(v))
			.attr("width", x.bandwidth())
			.attr("height", v => height - y(v));
	}

	render() {
		return (
			<svg width={width} height={height + margins.bottom}>
				<g
					height={height + margins.bottom}
					ref={element => (this.svg = d3.select(element))}
					transform={
						"translate(" + margins.left + "," + margins.top + ")"
					}
				/>
			</svg>
		);
	}
}

const margins = { top: 20, right: 20, bottom: 60, left: 60 };
const height = 300;
const width = 500;
const screePlotArray = screePlot();
const screePlotObj = screePlotArray.map((value, index) => {
	return { ["pca" + index]: value };
});
