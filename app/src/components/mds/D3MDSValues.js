import React, { Component } from "react";
var d3 = require("d3");
import { pca1, pca2 } from "./pcaData";
import mds from "./mds.json"
export default class D3MDSValues extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.drawPoints = this.drawPoints.bind(this);
		this.drawXAxis = this.drawXAxis.bind(this);
		this.drawYAxis = this.drawYAxis.bind(this);
		this.chartTitle = this.chartTitle.bind(this);
	}
	componentDidMount() {
		var data = []
		for(let i = 0; i < mds.mds.length; i+=2){

			data.push({
				x: mds.mds[i],
				y: mds.mds[i+1],

			})
		}
		const x = this.createXAxis(data);
		const y = this.createYAxis(data);
		this.drawPoints(x, y,data);
		this.drawXAxis(x);
		this.drawYAxis(y);
		this.chartTitle()

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
		this.svg
			.selectAll(".point")
			.data(data)
			.enter()
			.append("circle")
			.attr("fill", "#6200EA")
			.attr("class", "point")
			.attr("cx", value => x(value["x"]))
			.attr("cy", value => y(value["y"]))
			.attr("r", 2);
	}

	createXAxis(data) {
		const x = d3
			.scaleLinear()
			.range([0, width-200])
			.domain([Math.min.apply(Math, data.map(p=>p["x"])), Math.max.apply(Math, data.map(p=>p["x"])) ]);
		return x;
	}

	createYAxis(data) {
		var y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([Math.min.apply(Math, data.map(p=>p["y"])) , Math.max.apply(Math, data.map(p=>p["y"])) ]);
		return y;
	}

	chartTitle(){
		this.svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 60)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("MDS Values");
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

function normalize(data) {
	let minMaxOfDomains = d3.extent(data, d => d);
	let scale = 1.0 / (minMaxOfDomains[1] - minMaxOfDomains[0]);
	data.forEach((value, index) => (data[index] = value * scale));
	return data;
}

const margins = { top: 50, right: 200, bottom: 70, left: 100 };
const height = 500;
const width = 1000;
