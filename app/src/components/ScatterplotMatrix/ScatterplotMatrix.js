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
import D3ScatterplotMatrix from "./D3ScatterplotMatrix";
var d3 = require("d3");

class ScatterplotMatrix extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const normalizedData = normalize(data);
		return (
			<ExpansionPanel defaultExpanded expanded={true}>
				<ExpansionPanelSummary style={{ cursor: "default" }}>
					<Typography variant="h5">Scatter Plot Matrix</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails style={{ padding: 20 }}>
				<D3ScatterplotMatrix data={normalizedData}/>
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
	daysToSell: "Days to Sell",
	titleLength: "Length of Title",
	feedbackScore: "Seller Feedback Score",
	positiveFeedbackPercent: "Positive Feedback Percent",
	returnsAccepted: "Returns Accepted"
};

ScatterplotMatrix.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ScatterplotMatrix);
