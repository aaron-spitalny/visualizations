import React, { Component } from "react";
var d3 = require("d3");
import { mdsAttributes } from "./pcaData";

export default class D3MDSAttributes extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.drawPoints = this.drawPoints.bind(this);
		this.drawXAxis = this.drawXAxis.bind(this);
		this.drawYAxis = this.drawYAxis.bind(this);
		this.chartTitle = this.chartTitle.bind(this);
	}
	componentDidMount() {
		const x = this.createXAxis();
		const y = this.createYAxis();
		this.drawPoints(x, y);
		this.drawXAxis(x);
		this.drawYAxis(y);
		this.chartTitle();
	}

	drawXAxis(x) {
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
	}

	drawYAxis(y) {
		this.svg
			.append("g")
			.attr("class", "axis")
			.call(d3.axisLeft(y));
	}

	drawPoints(x, y, data) {
		//draw points
		var node = this.svg
			.selectAll(".point")
			.data(mdsAttr)
			.enter();
		node
			.append("circle")
			.attr("fill", "#6200EA")
			.attr("class", "point")
			.attr("cx", value => x(value[0]))
			.attr("cy", value => y(value[1]))
			.attr("r", 2);
		node
			.append("text")
			.attr("class", "labels")
			.attr("dx", p => x(p[0]))
			.attr("dy", p => y(p[1]))
			.text((p, index) => categories[index]);
	}

	createXAxis(data) {
		const x = d3
			.scaleLinear()
			.range([0, width])
			.domain([
				Math.min.apply(Math, mdsAttr.map(p => p[0])) - 1,
				Math.max.apply(Math, mdsAttr.map(p => p[0])) + 1
			]);
		return x;
	}

	createYAxis(data) {
		var y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([
				Math.min.apply(Math, mdsAttr.map(p => p[1])) - 1,
				Math.max.apply(Math, mdsAttr.map(p => p[1])) + 1
			]);
		return y;
	}
	chartTitle() {
		this.svg
			.append("text")
			.attr("x", width / 2)
			.attr("y", 60)
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.text("MDS Attributes");
	}

	render() {
		return (
			<svg width={width} height={height + margins.bottom}>
				<g
					height={height + margins.bottom}
					ref={element => (this.svg = d3.select(element))}
					transform={"translate(" + margins.left + "," + 0 + ")"}
				/>
			</svg>
		);
	}
}

const margins = { top: 50, right: 20, bottom: 70, left: 100 };
const height = 500;
const width = 500;
const mdsAttr = mdsAttributes();

const categories = [
	"daysToSell",
	"returnsAccepted",
	"titleLength",
	"positiveFeedbackPercent",
	"startDay",
	"soldDay",
	"startHour",
	"soldHour",
	"price",
	"feedbackScore"
];
