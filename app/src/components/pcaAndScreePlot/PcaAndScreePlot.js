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
import D3PcaPlot from "./D3PcaPlot";
import D3ScreePlot from "./D3ScreePlot";
var d3 = require("d3");

class pcaAndScreePlot extends Component {
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
					<Typography variant="h5">PCA and Scree Plot</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails style={{ padding: 20 }}>
					<Grid container>
						<Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
							<D3PcaPlot />
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
							<D3ScreePlot />
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

pcaAndScreePlot.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(pcaAndScreePlot);
