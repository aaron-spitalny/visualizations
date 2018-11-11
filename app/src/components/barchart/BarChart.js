import React, { Component } from "react";
var d3 = require("d3");
import ebayData from "../../../data/json_week_of_bags_sales.json";
import data from "../../../data/data.json";
import Axis from "./Axis";
import Bars from "./Bars";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { changeBarChart } from "../../redux/actions/barchartActions";
import { connect } from "react-redux";
import CategoryList from "./CategoryList";
import propTypes from "prop-types";
import Categories from "./Categories";
import Info from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			barChartTypeValue: "start_day",
			barChartTypeName: chartOptions["start_day"][0],
			data: data["start_day"],
			binnable: false,
			startDomain: 0,
			endDomain: 0,
			bins: null,
			expanded: true,
			maxRange: Math.max.apply(
				Math,
				Object.keys(data["start_day"]).map(
					key => data["start_day"][key]
				)
			)
		};
		this.changeValue = this.changeValue.bind(this);
	}

	handleTooltipClose = () => {
		this.setState({ open: false });
	};

	handleTooltipOpen = () => {
		this.setState({ open: true });
	};
	componentWillReceiveProps(nextProps) {
		if (chartOptions[nextProps.categoryValue][1]) {
			var x = d3
				.scaleLinear()
				.domain(d3.extent(data[nextProps.categoryValue]))
				.nice(19);
			var histogram = d3
				.histogram()
				.domain(x.domain())
				.thresholds(x.ticks(19));
			var bins = histogram(data[nextProps.categoryValue]);
			var dataObject = {};
			bins.forEach(bin => (dataObject[bin.x1] = bin.length));
			this.setState({
				barChartTypeValue: nextProps.categoryValue,
				barChartTypeName: chartOptions[nextProps.categoryValue][0],
				startDomain: bins[0].x0,
				endDomain: bins[bins.length - 1].x1,
				bins: 19,
				data: bins,
				binnable: chartOptions[nextProps.categoryValue][1],
				maxRange: Math.max.apply(
					Math,
					Object.keys(dataObject).map(key => dataObject[key])
				)
			});
		} else {
			this.setState({
				barChartTypeValue: nextProps.categoryValue,
				barChartTypeName: chartOptions[nextProps.categoryValue][0],
				data: data[nextProps.categoryValue],
				binnable: chartOptions[nextProps.categoryValue][1],
				bins: null,
				maxRange: Math.max.apply(
					Math,
					Object.keys(data[nextProps.categoryValue]).map(
						key => data[nextProps.categoryValue][key]
					)
				)
			});
		}
	}

	changeValue(event) {
		if (event.target.id === "bins") {
			var numberOfBins = parseInt(event.target.value);
			if (
				numberOfBins >= 1 &&
				this.state.endDomain > this.state.startDomain
			) {
				var x = d3
					.scaleLinear()
					.domain([this.state.startDomain, this.state.endDomain])
					.nice(numberOfBins);
				var histogram = d3
					.histogram()
					.domain(x.domain())
					.thresholds(x.ticks(numberOfBins));
				var bins = histogram(data[this.state.barChartTypeValue]);
				var dataObject = {};
				bins.forEach(bin => (dataObject[bin.x1] = bin.length));
				this.setState({
					bins: numberOfBins,
					data: bins,
					maxRange: Math.max.apply(
						Math,
						Object.keys(dataObject).map(key => dataObject[key])
					)
				});
			} else {
				this.setState({ bins: numberOfBins });
			}
		} else if (event.target.id === "startDomain") {
			var startDomain = parseInt(event.target.value);
			if (startDomain < this.state.endDomain && this.state.bins > 0) {
				var x = d3
					.scaleLinear()
					.domain([startDomain, this.state.endDomain])
					.nice(this.state.bins);
				var histogram = d3
					.histogram()
					.domain(x.domain())
					.thresholds(x.ticks(this.state.bins));
				var bins = histogram(data[this.state.barChartTypeValue]);
				var dataObject = {};
				bins.forEach(bin => (dataObject[bin.x1] = bin.length));
				this.setState({
					startDomain: startDomain,
					data: bins,
					maxRange: Math.max.apply(
						Math,
						Object.keys(dataObject).map(key => dataObject[key])
					)
				});
			} else {
				this.setState({ startDomain: startDomain });
			}
		} else if (event.target.id === "endDomain") {
			var endDomain = parseInt(event.target.value);
			if (endDomain > 0 && endDomain > this.state.startDomain) {
				var x = d3
					.scaleLinear()
					.domain([this.state.startDomain, endDomain])
					.nice(this.state.bins);
				var histogram = d3
					.histogram()
					.domain(x.domain())
					.thresholds(x.ticks(this.state.bins));
				var bins = histogram(data[this.state.barChartTypeValue]);
				var dataObject = {};
				bins.forEach(bin => (dataObject[bin.x1] = bin.length));
				this.setState({
					endDomain: endDomain,
					data: bins,
					maxRange: Math.max.apply(
						Math,
						Object.keys(dataObject).map(key => dataObject[key])
					)
				});
			} else {
				this.setState({ endDomain: endDomain });
			}
		}
	}

	render() {
		const margins = {
			top: 20,
			right: 20,
			bottom: 100,
			left: 50
		};
		const svgDimensions = {
			width: 600,
			height: 500
		};

		var newData = {};
		// scaleLinear or scaleBand type
		console.log(Object.keys(this.state.data).map(d => d))
		const xScale = this.state.binnable
			? d3
					.scaleLinear()
					.domain([this.state.startDomain, this.state.endDomain])
					.range([margins.left, svgDimensions.width - margins.right])
			: d3
					.scaleBand()
					.padding(0.5)
					.domain(Object.keys(this.state.data).map(d => d))
					.range([margins.left, svgDimensions.width - margins.right]);
		// scaleLinear type
		const yScale = d3
			.scaleLinear()
			.domain([0, this.state.maxRange + 10])
			.range([svgDimensions.height - margins.bottom, margins.top]);

		return (
			<ExpansionPanel defaultExpanded expanded={true}>
				<ExpansionPanelSummary style={{cursor: "default"}}>
					<Typography variant="h5">Bar Chart</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails
					style={{
						padding: 20
					}}>
					<Grid container spacing={40}>
						<Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
							<Grid container spacing={40}>
								<Grid
									item
									xl={12}
									lg={12}
									md={12}
									sm={12}
									xs={12}>
									<ExpansionPanel
										style={{ height: "100%" }}
										expanded={this.state.expanded}>
										<ExpansionPanelSummary
										style={{cursor: "default"}}
											expandIcon={
												<ExpandMoreIcon
													onClick={() => {
														this.setState({
															expanded: !this
																.state.expanded
														});
													}}
												/>
											}>
											<Typography variant="h6">
												Category
											</Typography>
											<ClickAwayListener
												onClickAway={
													this.handleTooltipClose
												}>
												<div>
													<Tooltip
													classes={{ tooltip: "tooltip-top" }}
														PopperProps={{
															disablePortal: true
														}}
														onClose={
															this
																.handleTooltipClose
														}
														placement="right"
														open={this.state.open}
														disableFocusListener
														disableHoverListener
														disableTouchListener
														title=" I visualized 13 of the attributes with d3 barcharts, there are two main categories of data, one has customisable bins and ranges, the others do not. This is because some attributes are binary or have a string domain, so binning can’t be done. For attributes that have a numeric domain the bins and ranges could be customized.">
														<IconButton
															style={{
																padding: 0,
																marginRight: 10
															}}
															onClick={this.handleTooltipOpen}
															variant="fab">
															<Info
																style={{
																	fontSize: 16
																}}
															/>
														</IconButton>
													</Tooltip>
												</div>
											</ClickAwayListener>
											<div>
												<Select
													value={
														this.props.categoryValue
													}
													onChange={e =>
														this.props.changeBarChart(
															e
														)
													}>
													{Object.keys(
														chartOptions
													).map((key, index) => (
														<MenuItem
															key={key}
															value={key}>
															{
																chartOptions[
																	key
																][0]
															}
														</MenuItem>
													))}
												</Select>
											</div>
										</ExpansionPanelSummary>
										<ExpansionPanelDetails>
											<Grid
												style={{
													paddingTop: 7
												}}
												container>
												<Grid
													item
													xl={12}
													lg={12}
													md={12}
													sm={12}
													xs={12}>
													{this.state.binnable && (
														<Grid
															style={{
																paddingTop: 20
															}}
															container>
															<Grid
																item
																xl={8}
																lg={8}
																md={8}
																sm={8}
																xs={8}>
																<InputLabel
																	htmlFor="startDomain"
																	style={{
																		paddingRight: 10
																	}}>
																	Range
																</InputLabel>
																<span>[</span>
																<TextField
																	id="startDomain"
																	value={
																		this
																			.state
																			.startDomain
																	}
																	onChange={e =>
																		this.changeValue(
																			e
																		)
																	}
																	type="number"
																	style={{
																		maxWidth: 60
																	}}
																	inputProps={{
																		style: {
																			paddingTop: 0,
																			paddingBottom: 0,
																			paddingLeft: 4
																		}
																	}}
																/>
																{", "}
																<TextField
																	id="endDomain"
																	value={
																		this
																			.state
																			.endDomain
																	}
																	onChange={e =>
																		this.changeValue(
																			e
																		)
																	}
																	type="number"
																	style={{
																		maxWidth: 60
																	}}
																	inputProps={{
																		style: {
																			paddingTop: 0,
																			paddingBottom: 0,
																			paddingLeft: 4
																		}
																	}}
																/>
																{"]"}
															</Grid>
															<Grid
																item
																xl={4}
																lg={4}
																md={4}
																sm={4}
																xs={4}>
																<InputLabel
																	htmlFor="bins"
																	style={{
																		paddingRight: 10
																	}}>
																	Bins
																</InputLabel>
																<TextField
																	id="bins"
																	value={
																		this
																			.state
																			.bins
																	}
																	onChange={e =>
																		this.changeValue(
																			e
																		)
																	}
																	type="number"
																	style={{
																		maxWidth: 60
																	}}
																	inputProps={{
																		style: {
																			paddingTop: 0,
																			paddingBottom: 0,
																			paddingLeft: 4
																		}
																	}}
																/>
															</Grid>
														</Grid>
													)}
												</Grid>
												<Grid
													style={{ paddingTop: 10 }}
													item
													xl={12}
													lg={12}
													md={12}
													sm={12}
													xs={12}>
													<CategoryList />
												</Grid>
											</Grid>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xl={7} lg={7} md={7} sm={7} xs={7}>
							<div
								style={{
									paddingBottom: 20,
									paddingTop: 20,
									display: "flex",
									justifyContent: "center",
									width: "100%"
								}}>
								<Typography variant="h6">
									{this.state.barChartTypeName}
								</Typography>
							</div>
							<div
								style={{
									paddingBottom: 20,
									paddingTop: 20,
									display: "flex",
									justifyContent: "center",
									width: "100%"
								}}>
								<svg
									width={svgDimensions.width}
									height={svgDimensions.height}
									style={{ paddingLeft: 25 }}>
									<g>
										<Axis
											orient="Bottom"
											scale={xScale}
											translate={`translate(0, ${svgDimensions.height -
												margins.bottom})`}
											tickSize={
												svgDimensions.height -
												margins.top -
												margins.bottom
											}
											bins={this.state.bins}
										/>
										<Axis
											orient="Left"
											scale={yScale}
											translate={`translate(${
												margins.left
											}, 0)`}
											tickSize={
												svgDimensions.width -
												margins.left -
												margins.right
											}
											bins={this.state.bins}
										/>
									</g>
									<Bars
										scales={{
											xScale,
											yScale
										}}
										margins={margins}
										data={this.state.data}
										maxRange={this.state.maxRange}
										svgDimensions={svgDimensions}
										binnable={this.state.binnable}
									/>
									<text
										transform={"rotate(-90)"}
										y={0 - margins.left}
										x={0 - svgDimensions.height / 2}
										dy={"1em"}
										style={{ textAnchor: "middle" }}
										text={"items"}
									/>
									<text
										textAnchor="middle"
										transform={"rotate(-90)"}
										dy="1em"
										x={0 - svgDimensions.height / 2}
										y={-25}>
										Items
									</text>
									<text
										textAnchor="middle"
										transform={
											"translate(" +
											svgDimensions.width / 2 +
											" ,490)"
										}>
										{
											chartOptions[
												this.state.barChartTypeValue
											][2]
										}
									</text>
								</svg>
							</div>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

const chartOptions = {
	start_day: ["Start Day", false, "Days"],
	sold_day: ["Sold Day", false, "Days"],
	start_hour: ["Start Hour", false, "Hours"],
	sold_hour: ["Sold Hour", false, "Hours"],
	time_to_sell: ["Time to Sell", true, "Days"],
	seller_country: ["Seller Country", false, "Countries"],
	feedback_score: ["Feedback Score", true, "Score"],
	feedback_positive_percent: ["Feedback Positive Percent", true, "Percent"],
	top_rated: ["Top Rated", false, "Binary"],
	shipping_handling_time: ["Shipping Handeling Time", true, "Days"],
	shipping_charge: ["Shipping Charge", true, "USD"],
	returns_accepted: ["Retruns Accepted", false, "Binary"],
	is_mulit_variation_listing: ["Is Mulit-variation Listing", false, "Binary"],
	item_price: ["Item price", true, "USD"]
};

BarChart.propTypes = {
	changeBarChart: propTypes.func.isRequired
};

const mapStateToProps = state => ({
	categoryValue: state.barchart.category
});

export default connect(mapStateToProps, {
	changeBarChart
})(BarChart);
