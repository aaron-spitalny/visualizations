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
import D3MDSValues from "./D3MDSValues";
import D3MDSAttributes from "./D3MDSAttributes";
var d3 = require("d3");

class MDS extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}
	render() {
		return (
			<ExpansionPanel defaultExpanded expanded={true}>
				<ExpansionPanelSummary style={{ cursor: "default" }}>
					<Typography variant="h5">MDS</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails style={{ padding: 20 }}>
					<Grid container>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<D3MDSValues />
						</Grid>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<D3MDSAttributes />
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
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
	feedbackScore: "Seller Feedback Score"
};

MDS.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(MDS);
