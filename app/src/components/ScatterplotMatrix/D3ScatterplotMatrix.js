import React, { Component } from "react";
var d3 = require("d3");

export default class D3CorrelationMatrix extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.drawXAxis = this.drawXAxis.bind(this);
		this.drawYAxis = this.drawYAxis.bind(this);
		this.drawCells = this.drawCells.bind(this);
	}
	componentDidMount() {
		const data = this.props.data;
		var color = d3.scaleOrdinal(d3.schemeCategory10);
		var categoryKeys = Object.keys(categories);
		var numOfCat = categoryKeys.length;
		var minMaxOfDomains = {};
		categoryKeys.forEach(function(categoryKey) {
			minMaxOfDomains[categoryKey] = d3.extent(data, d => d[categoryKey]);
		});
		var svg = this.svg
			.append("g")
			.attr(
				"transform",
				"translate(" + padding + "," + padding / 2 + ")"
			);
		var x = d3.scaleLinear().range([padding / 2, size - padding / 2]);
		var y = d3.scaleLinear().range([size - padding / 2, padding / 2]);
		this.drawYAxis(x, categoryKeys, numOfCat, minMaxOfDomains);
		this.drawXAxis(x, categoryKeys, numOfCat, minMaxOfDomains);
		//draw points
		var point = this.svg
			.selectAll(".cell")
			.data(cross(categoryKeys, categoryKeys))
			.enter()
			.append("g")
			.attr("class", "cell")
			.attr("transform", function(d) {
				return (
					"translate(" +
					(numOfCat - d.i - 1) * size +
					"," +
					d.j * size +
					")"
				);
			})
			.each(drawPoints);
		// Titles for the diagonal.
		point
			.filter(function(d) {
				return d.i === d.j;
			})
			.append("text")
			.attr("x", padding)
			.attr("y", padding)
			.attr("dy", ".71em")
			.text(function(d) {
				return d.x;
			});
		function drawPoints(p) {
			var cell = d3.select(this);
			x.domain(minMaxOfDomains[p.x]);
			y.domain(minMaxOfDomains[p.y]);
			cell
				.append("rect")
				.attr("class", "frame")
				.attr("x", padding / 2)
				.attr("y", padding / 2)
				.attr("width", size - padding)
				.attr("height", size - padding)
				.style("fill", function(d) {
					return "transparent";
				});

			cell
				.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) {
					return x(d[p.x]);
				})
				.attr("cy", function(d) {
					return y(d[p.y]);
				})
				.attr("r", 4)
				.style("fill", function(d) {
					return color(p.x + p.y);
				});
		}
	}

	drawXAxis(x, categoryKeys, numOfCat, minMaxOfDomains) {
		var xAxis = d3
			.axisBottom()
			.scale(x)
			.ticks(6)
			.tickSize(size * numOfCat);
		this.svg
			.selectAll(".x.axis")
			.data(categoryKeys)
			.enter()
			.append("g")
			.attr("class", "x axis")
			.attr("transform", function(d, i) {
				return "translate(" + (numOfCat - i - 1) * size + ",0)";
			})
			.each(function(d) {
				x.domain(minMaxOfDomains[d]);
				d3.select(this).call(xAxis);
			});
	}

	drawYAxis(y, categoryKeys, numOfCat, minMaxOfDomains) {
		var yAxis = d3
			.axisLeft()
			.scale(y)
			.ticks(6)
			.tickSize(-size * numOfCat);
		this.svg
			.selectAll(".y.axis")
			.data(categoryKeys)
			.enter()
			.append("g")
			.attr("class", "y axis")
			.attr("transform", function(d, i) {
				return "translate(0," + i * size + ")";
			})
			.each(function(d) {
				y.domain(minMaxOfDomains[d]);
				d3.select(this).call(yAxis);
			});
	}

	drawCells(x, y, categoryKeys, numOfCat, minMaxOfDomains) {
		var point = this.svg
			.selectAll(".cell")
			.data(cross(categoryKeys, categoryKeys))
			.enter()
			.append("g")
			.attr("class", "cell")
			.attr("transform", function(d) {
				return (
					"translate(" +
					(numOfCat - d.i - 1) * size +
					"," +
					d.j * size +
					")"
				);
			})
			.each(this.drawPoints(x, y, minMaxOfDomains));
		// Titles for the diagonal.
		point
			.filter(function(d) {
				return d.i === d.j;
			})
			.append("text")
			.attr("x", padding)
			.attr("y", padding)
			.attr("dy", ".71em")
			.text(function(d) {
				return d.x;
			});
	}

	render() {
		return (
			<svg width={width} height={height}>
				<g
					height={size * 5 + 20}
					width={size * 5 + 20}
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

function cross(a, b) {
	var c = [],
		n = a.length,
		m = b.length,
		i,
		j;
	for (i = -1; ++i < n; )
		for (j = -1; ++j < m; ) c.push({ x: a[i], i: i, y: b[j], j: j });
	return c;
}

const categories = {
	daysToSell: "Days to Sell",
	titleLength: "Length of Title",
	feedbackScore: "Seller Feedback Score",
	positiveFeedbackPercent: "Positive Feedback Percent",
	returnsAccepted: "Returns Accepted"
};

const margins = { top: 20, bottom: 20, right: 20, left: 60 };
const width = 1500;
const height = 1100;
const size = 200;
const padding = 20;
