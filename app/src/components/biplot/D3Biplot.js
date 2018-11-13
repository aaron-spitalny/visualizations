import React, { Component } from "react";
var d3 = require("d3");
import { pca1, pca2, lines } from "./pcaData";

export default class D3Biplot extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.drawPoints = this.drawPoints.bind(this);
		this.drawXAxis = this.drawXAxis.bind(this);
		this.drawYAxis = this.drawYAxis.bind(this);
		this.drawLines = this.drawLines.bind(this);
	}
	componentDidMount() {
		const x = this.createXAxis();
		const y = this.createYAxis();
		this.drawPoints(x, y);
		this.drawXAxis(x);
		this.drawYAxis(y);
		this.drawLines(x, y);
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
		//label for the x axis
		this.svg
			.append("text")
			.attr("class", "label")
			.attr("x", (width - 200) / 2)
			.attr("y", height + (margins.bottom - 140) - 5)
			.attr("text-anchor", "middle")
			.style("font-size", "14px")
			.text("PCA 1");
	}

	drawYAxis(y) {
		this.svg
			.append("g")
			.attr("class", "axis")
			.call(d3.axisLeft(y));
		//label fo the y axis
		this.svg
			.append("text")
			.attr("class", "label")
			.attr("x", 0 - 100)
			.attr("y", 400)
			.attr("text-anchor", "left")
			.style("font-size", "14px")
			.text("PCA 2");
	}

	drawPoints(x, y) {
		//draw points
		let data = [];
		for (let i = 0; i < pca1Array.length; i++) {
			data.push({
				pca1: pca1Array[i],
				pca2: pca2Array[i]
			});
		}
		var node = this.svg
			.selectAll("g")
			.data(data)
			.enter()
			.append("circle")
			.attr("fill", "#6200EA")
			.attr("class", "point")
			.attr("cx", value => x(value["pca1"]))
			.attr("cy", value => y(value["pca2"]))
			.attr("r", 2);
	}

	drawLines(x, y) {
		let data = lines();
		var node = this.svg
			.append("g")
			.selectAll("g")
			.data(data)
			.enter();
		node
			.append("line")
			.style("stroke", "black")
			.attr("x1", x(0))
			.attr("y1", y(0))
			.attr("x2", p => x(p[0]))
			.attr("y2", p => y(p[1]));

		node
			.append("text")
			.attr("class", "labels")
			.attr("dx", p => x(p[0]))
			.attr("dy", p => y(p[1]))
			.text( (p, index)  => categories[index]);
	}

	createXAxis() {
		const x = d3
			.scaleLinear()
			.range([0, width - 200])
			.domain([0, Math.max.apply(Math, pca1Array) + .5]);
		return x;
	}

	createYAxis() {
		var y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, Math.max.apply(Math, pca2Array) + .5]);
		return y;
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

function normalize(data) {
	let minMaxOfDomains = d3.extent(data, d => d);
	let scale = 1.0 / (minMaxOfDomains[1] - minMaxOfDomains[0]);
	data.forEach((value, index) => (data[index] = value * scale));
	return data;
}

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

const margins = { top: -100, right: 400, bottom: 200, left: 300 };
const height = 500;
const width = 700;
const pca1Array = normalize(pca1());
const pca2Array = normalize(pca2());
