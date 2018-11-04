import React, { Component } from "react";
var d3 = require("d3");

export default class D3Scatterplot extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.drawPoints = this.drawPoints.bind(this);
		this.drawXAxis = this.drawXAxis.bind(this);
		this.drawYAxis = this.drawYAxis.bind(this);
	}
	componentDidMount() {
		const x = this.createXAxis();
		const y = this.createYAxis();
		this.drawPoints(x, y);
		this.drawXAxis(x);
		this.drawYAxis(y);
	}

	componentDidUpdate() {
		this.svg.selectAll(".axis").remove();
		this.svg.selectAll(".label").remove();
		this.svg.selectAll(".point").remove();
		const x = this.createXAxis();
		const y = this.createYAxis();
		this.drawPoints(x, y);
		this.drawXAxis(x);
		this.drawYAxis(y);
	}

	drawXAxis(x) {
		const width = this.props.width - margins.left - margins.right;
		const height = this.props.height - margins.top - margins.bottom;
		//creat the x axis
		this.svg
			.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.style("text-anchor", "middle")
			.attr("dx", ".0em")
			.style("font-size", "12px")
			.attr("dy", ".75em");
		//label for the x axis
		this.svg
			.append("text")
			.attr("class", "label")
			.attr("x", width / 2)
			.attr("y", height + margins.bottom)
			.attr("text-anchor", "middle")
			.style("font-size", "14px")
			.text(this.props.xLabel);
	}

	drawYAxis(y) {
		const height = this.props.height - margins.top - margins.bottom;
		this.svg
			.append("g")
			.attr("class", "axis")
			.call(d3.axisLeft(y));
		//label fo the y axis
		this.svg
			.append("text")
			.attr("class", "label")
			.attr("x", 0 - margins.left)
			.attr("y", height / 3)
			.attr("text-anchor", "left")
			.style("font-size", "14px")
			.text(this.props.yLabel);
	}

	drawPoints(x, y) {
		//draw points
		this.svg
			.selectAll(".point")
			.data(this.props.data)
			.enter()
			.append("circle")
			.attr("fill", "#6200EA")
			.attr("class", "point")
			.attr("cx", value => x(value[this.props.x]))
			.attr("cy", value => y(value[this.props.y]))
			.attr("r", 2);
	}

	createXAxis() {
		const width = this.props.width - margins.left - margins.right;
		const x = d3
			.scaleLinear()
			.range([0, width])
			.domain([
				0,
				(Math.max.apply(
					Math,
					this.props.data.map(value => value[this.props.x])
				) + 1)
			]);
		return x;
	}

	createYAxis() {
		const height = this.props.height - margins.top - margins.bottom;
		var y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([
				0,
				(Math.max.apply(
					Math,
					this.props.data.map(value => value[this.props.y])
				) + 1)
			]);
		return y;
	}

	render() {
		return (
			<svg width={this.props.width} height={this.props.height}>
				<g
					ref={element => (this.svg = d3.select(element))}
					transform={"translate(" + margins.left + "," + 20 + ")"}
				/>
			</svg>
		);
	}
}

const margins = { top: 50, right: 20, bottom: 65, left: 100 };
