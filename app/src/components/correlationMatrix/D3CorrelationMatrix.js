import React, { Component } from "react";
var d3 = require("d3");

export default class D3CorrelationMatrix extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.drawGrid = this.drawGrid.bind(this);
		this.drawLabels = this.drawLabels.bind(this);
		this.drawLegend = this.drawLegend.bind(this);
	}
	componentDidMount() {
		const x = d3
			.scaleBand()
			.domain(d3.range(this.props.numRowsAndCols))
			.range([0, 400]);

		const y = d3
			.scaleBand()
			.domain(d3.range(this.props.numRowsAndCols))
			.range([0, 400]);

		this.drawGrid(x, y);
		this.drawLabels(x, y);
		this.drawLegend();
	}

	drawGrid(x, y) {
		var data = this.props.data;
		var row = this.svg
			.selectAll(".row")
			.data(data)
			.enter()
			.append("g")
			.attr("class", "row")
			.attr("transform", function(d, i) {
				return "translate(0," + y(i) + ")";
			});

		var cell = row
			.selectAll(".cell")
			.data(function(d) {
				return d;
			})
			.enter()
			.append("g")
			.attr("class", "cell")
			.attr("transform", function(d, i) {
				return "translate(" + x(i) + ", 0)";
			});
		cell
			.append("rect")
			.attr("width", x.bandwidth())
			.attr("height", y.bandwidth())
			.style("stroke-width", 0);
		var maxValue = d3.max(data, function(layer) {
			return d3.max(layer, function(d) {
				return d;
			});
		});
		var minValue = d3.min(data, function(layer) {
			return d3.min(layer, function(d) {
				return d;
			});
		});
		var colorMap = d3
			.scaleLinear()
			.domain([minValue, maxValue])
			.range(["#fff", "#6200EA"]);

		row
			.selectAll(".cell")
			.data(function(d, i) {
				return data[i];
			})
			.style("fill", colorMap);
	}

	drawLabels(x, y) {
		var labels = this.svg.append("g").attr("class", "labels");
		var columnLabels = labels
			.selectAll(".column-label")
			.data(this.props.labels)
			.enter()
			.append("g")
			.attr("class", "column-label")
			.attr("transform", function(d, i) {
				return "translate(" + x(i) + ",-100)";
			});

		columnLabels
			.append("line")
			.style("stroke", "black")
			.style("stroke-width", "1px")
			.attr("x1", x.bandwidth() / 2)
			.attr("x2", x.bandwidth() / 2)
			.attr("y1", 95)
			.attr("y2", 100);

		columnLabels
			.append("text")
			.attr("x", -66)
			.attr("y", 47)
			.attr("dy", "1.3em")
			.attr("text-anchor", "beggining")
			.attr("transform", "rotate(-60)")
			.text(function(d, i) {
				return d;
			});

		var rowLabels = labels
			.selectAll(".row-label")
			.data(this.props.labels)
			.enter()
			.append("g")
			.attr("class", "row-label")
			.attr("transform", function(d, i) {
				return "translate(" + 0 + "," + y(i) + ")";
			});

		rowLabels
			.append("line")
			.style("stroke", "black")
			.style("stroke-width", "1px")
			.attr("x1", 0)
			.attr("x2", -5)
			.attr("y1", y.bandwidth() / 2)
			.attr("y2", y.bandwidth() / 2);

		rowLabels
			.append("text")
			.attr("x", -8)
			.attr("y", y.bandwidth() / 2)
			.attr("dy", ".32em")
			.attr("text-anchor", "end")
			.text(function(d, i) {
				return d;
			});
	}

	drawLegend() {
		var key = d3
			.select("#legend")
			.append("svg")
			.attr("width", 50)
			.attr("height", height + margins.top + margins.bottom);

		var legend = key
			.append("defs")
			.append("svg:linearGradient")
			.attr("id", "gradient")
			.attr("x1", "100%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");

		legend
			.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", "#1B5E20")
			.attr("stop-opacity", 1);

		legend
			.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", "#fff")
			.attr("stop-opacity", 1);

		key
			.append("rect")
			.attr("width", 50 / 2 - 10)
			.attr("height", height)
			.style("fill", "url(#gradient)")
			.attr("transform", "translate(0," + margins.top + ")");

		var y = d3
			.scaleLinear()
			.range([height, 0])
			.domain([-1, 1]);

		var yAxis = d3.axisRight(y);

		key
			.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(41," + margins.top + ")")
			.call(yAxis);
	}

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

const margins = { top: 180, bottom: 20, right: 20, left: 400 };
const width = 1000;
const height = 700;
