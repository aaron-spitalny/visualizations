import React, { Component } from "react";
var d3 = require("d3");
import { pca1, pca2 } from "./pcaData";

export default class D3PcaPLot extends Component {
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
			.attr("x", width / 2)
			.attr("y", height + margins.bottom - 5)
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
		var data = [];
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
			.append("g");
		node
			.append("circle")
			.attr("fill", "#6200EA")
			.attr("class", "point")
			.attr("cx", value => x(value["pca1"]))
			.attr("cy", value => y(value["pca2"]))
			.attr("r", 2);
		//creat the x axis
		node
			.append("text")
			.attr("class", "labels")
			.attr("x", value => x(value["pca1"]))
			.attr("y", value => y(value["pca2"]))
			.text((value, index) => categories[index]);
	}

	createXAxis() {
		const x = d3
			.scaleLinear()
			.range([0, width])
			.domain([0, Math.max.apply(Math, pca1Array) + 2]);
		return x;
	}

	createYAxis() {
		var y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, Math.max.apply(Math, pca2Array) + 2]);
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

const margins = { top: -300, right: 20, bottom: 70, left: 200 };
const height = 500;
const width = 500;
const pca1Array = pca1();
const pca2Array = pca2();
