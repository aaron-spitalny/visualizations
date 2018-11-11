import React, { Component } from "react";
var d3 = require("d3");

export default class D3ParallelCoordinates extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const data = this.props.data;
		var x = d3
				.scalePoint()
				.range([0, width])
				.padding(1),
			y = {};
		var axis = d3.axisLeft();
		var line = d3.line();
		var categoriesArray = null;
		// Extract the list of dimensions and create a scale for each.
		x.domain(
			(categoriesArray = Object.keys(categories).filter(function(d) {
				return (y[d] = d3
					.scaleLinear()
					.domain(
						d3.extent(data, function(p) {
							return +p[d];
						})
					)
					.range([height, 0]));
			}))
		);
		// Add grey background lines for context.
		var background = this.svg
			.append("g")
			.attr("class", "background")
			.selectAll("path")
			.data(data)
			.enter()
			.append("path")
			.attr("d", path);

		// Add blue foreground lines for focus.
		var foreground = this.svg
			.append("g")
			.attr("class", "foreground")
			.selectAll("path")
			.data(data)
			.enter()
			.append("path")
			.attr("d", path);

		// Add a group element for each dimension.
		const g = this.svg
			.selectAll(".dimension")
			.data(categoriesArray)
			.enter()
			.append("g")
			.attr("class", "dimension")
			.attr("transform", function(d) {
				return "translate(" + x(d) + ")";
			});

		// Add an axis and title.
		g
			.append("g")
			.attr("class", "axisp")
			.each(function(d) {
				d3.select(this).call(axis.scale(y[d]));
			})
			.append("text")
			.style("text-anchor", "middle")
			.attr("y", -9)
			.text(function(d) {
				return d;
			});
		function path(d) {
			return line(
				categoriesArray.map(function(p) {
					return [x(p), y[p](d[p])];
				})
			);
		}
	}

	render() {
		return (
			<svg width={width + margins.left +  margins.right} height={height + margins.bottom +  margins.top}>
				<g
					height={height + margins.bottom +  margins.top}
					width={width + 20}
					ref={element => (this.svg = d3.select(element))}
					transform={
						"translate(" +
						(-50) +
						"," +
						margins.top +
						")"
					}
				/>
			</svg>
		);
	}
}

const categories = {
    daysToSell: "Days to Sell",
    returnsAccepted: "Returns Accepted",
    titleLength: "Length of Title",
    positiveFeedbackPercent: "Positive Feedback Percent",
	startDay: "Start Day",
	soldDay: "Sold Day",
	startHour: "Start Hour",
	soldHour: "Sold Hour",
	price: "Sold Price",
	feedbackScore: "Seller Feedback Score",
};

const margins = { top: 20, bottom: 20, right: 20, left: 20 };
const width = 1200;
const height = 500;
