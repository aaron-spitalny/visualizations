import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import data from "../../../data/newData.json";
import D3CorrelationMatrix from "./D3CorrelationMatrix";
var jz = require("jeezy");
var d3 = require("d3");

class CorrelationMatrix extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const cols = [];
		const labels = [];
		Object.entries(categories).map(category => {
			cols.push(category[0]);
			labels.push(category[1]);
		});
		var correlationMatrix = [];
		var rowArray = [];
		Object.entries(jz.arr.correlationMatrix(normalize(data), cols)).map(row => {
			if (Number(row[0]) % 10 === 0 && Number(row[0]) != 0) {
				correlationMatrix.push(rowArray);
				rowArray = [];
			}
			rowArray.push(row[1].correlation);
		});
		correlationMatrix.push(rowArray);
		const reducer = (accumulator, currentValue) =>
			accumulator + currentValue;
		correlationMatrix.forEach(array => console.log(array.reduce(reducer)));
		console.log(correlationMatrix)
		return (
			<ExpansionPanel defaultExpanded expanded={true}>
				<ExpansionPanelSummary style={{ cursor: "default" }}>
					<Typography variant="h5">Correlation Matrix</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails style={{ padding: 20 }}>
					<D3CorrelationMatrix
						labels={labels}
						data={correlationMatrix}
						numRowsAndCols={Object.entries(categories).length}
					/>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

function normalize(data) {
	var minMaxOfDomains = {};
	Object.keys(categories).forEach(
		category =>
			(minMaxOfDomains[category] = d3.extent(data, d => d[category]))
	);
	var dataArray = [];
	data.forEach(item => {
		let newItem = {};
		Object.keys(categories).forEach(category =>{
			newItem[category] = normalizePoint(minMaxOfDomains, item[category], category)
		})
		dataArray.push(newItem);
	});
	return dataArray;
}

function normalizePoint(minMaxOfDomains, value, category) {
	return (
		(value - minMaxOfDomains[category][0]) /
		(minMaxOfDomains[category][1] - minMaxOfDomains[category][0])
	);
}


const categories = {
	startDay: "Start Day",
	soldDay: "Sold Day",
	startHour: "Start Hour",
	soldHour: "Sold Hour",
	price: "Sold Price",
	daysToSell: "Days to Sell",
	titleLength: "Length of Title",
	feedbackScore: "Seller Feedback Score",
	positiveFeedbackPercent: "Positive Feedback Percent",
	returnsAccepted: "Returns Accepted"
};

CorrelationMatrix.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CorrelationMatrix);
