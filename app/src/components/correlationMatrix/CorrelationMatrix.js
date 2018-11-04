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

class CorrelationMatrix extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<ExpansionPanel defaultExpanded expanded={true}>
				<ExpansionPanelSummary style={{ cursor: "default" }}>
					<Typography variant="h5">Correlation Matrix</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails style={{ padding: 20 }} />
			</ExpansionPanel>
		);
	}
}

const chartOptions = {
	startDay: ["Start Day", "Days"],
	soldDay: ["Sold Day", "Days"],
	startHour: ["Start Hour", "Hours"],
	soldHour: ["Sold Hour", "Hours"]
};

CorrelationMatrix.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CorrelationMatrix);
