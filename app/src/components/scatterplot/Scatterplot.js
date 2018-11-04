import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { changeScatterPlot } from "../../redux/actions/scatterplotActions";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import D3Scatterplot from "./D3Scatterplot";
import data from "../../../data/newData.json";

class ScatterPlot extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<ExpansionPanel defaultExpanded expanded={true}>
				<ExpansionPanelSummary style={{ cursor: "default" }}>
					<Typography variant="h5">Scatter Plot</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails style={{ padding: 20 }}>
					<Grid container spacing={40}>
						<Grid item xl={3} lg={3} md={3} sm={4} xs={4}>
							<ExpansionPanel defaultExpanded>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									style={{ cursor: "default" }}>
									<Typography variant="h6">
										Categories
									</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Grid container spacing={40}>
										<Grid
											item
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={12}>
											<InputLabel
												htmlFor="xAxis"
												style={{
													paddingRight: 10
												}}>
												X-Axis
											</InputLabel>
											<Select
												id="xAxis"
												value={this.props.xAxis}
												onChange={e =>
													this.props.changeScatterPlot(
														"xAxis",
														e.target.value
													)
												}>
												{Object.keys(chartOptions).map(
													(key, index) => (
														<MenuItem
															key={key}
															value={key}>
															{
																chartOptions[
																	key
																][0]
															}
														</MenuItem>
													)
												)}
											</Select>
										</Grid>
										<Grid
											item
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={12}>
											<InputLabel
												htmlFor="yAxis"
												style={{
													paddingRight: 10
												}}>
												Y-Axis
											</InputLabel>
											<Select
												id="yAxis"
												value={this.props.yAxis}
												onChange={e =>
													this.props.changeScatterPlot(
														"yAxis",
														e.target.value
													)
												}>
												{Object.keys(chartOptions).map(
													(key, index) => (
														<MenuItem
															key={key}
															value={key}>
															{
																chartOptions[
																	key
																][0]
															}
														</MenuItem>
													)
												)}
											</Select>
										</Grid>
									</Grid>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</Grid>
						<Grid
							item
							style={{
								display: "flex",
								justifyContent: "center"
							}}
							xl={9}
							lg={9}
							md={9}
							sm={8}
							xs={8}>
							<D3Scatterplot
								height={500}
								width={800}
								x={this.props.xAxis}
								y={this.props.yAxis}
								yLabel={chartOptions[this.props.yAxis][1]}
								xLabel={chartOptions[this.props.xAxis][1]}
								data={data}
							/>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

const chartOptions = {
	startDay: ["Start Day", "Days"],
	soldDay: ["Sold Day", "Days"],
	startHour: ["Start Hour", "Hours"],
	soldHour: ["Sold Hour", "Hours"],
	price: ["Price", "USD"],
	time_to_sell: ["Time to Sell", true, "Days"]
};

ScatterPlot.propTypes = {};

const mapStateToProps = state => ({
	xAxis: state.scatterplot.xAxis,
	yAxis: state.scatterplot.yAxis
});

export default connect(mapStateToProps, { changeScatterPlot })(ScatterPlot);
