import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import BarChartIcon from "@material-ui/icons/BarChart";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import { Icon } from 'evergreen-ui'
import BarChart from "../barchart/BarChart";
import Scatterplot from "../scatterplot/Scatterplot";
import CorrelationMatrix from "../correlationMatrix/CorrelationMatrix";
const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: "flex",
		height: "100%",
		overflow: "auto"
	},
	appBar: {
		backgroundColor: "#2196f3",
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	hide: {
		display: "none"
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing.unit * 9
		}
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		overflow: "auto"
	},
	docked: {
		minHeight: "100vh !important"
	}
});

class MenuDrawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			pageID: "scatterplot"
		};
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handlePageChange(value) {
		console.log(value)
		this.setState({ pageID: value });
	}

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, theme } = this.props;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: this.state.open
					})}>
					<Toolbar disableGutters={!this.state.open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, {
								[classes.hide]: this.state.open
							})}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							The E-commerce Web
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: classNames(
							classes.docked,
							classes.drawerPaper,
							!this.state.open && classes.drawerPaperClose
						)
					}}
					open={this.state.open}>
					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<List style={{paddingTop: 20}}>
						<ListItem
							style={{backgroundColor: this.state.pageID === "barchart" ? "#2196f3" : "white"}}
							onClick={() => this.handlePageChange("barchart")}
							button>
							<ListItemIcon>
							<Icon icon="grouped-bar-chart" color={this.state.pageID === "barchart" ? "white" : "rgba(0, 0, 0, 0.54)"} size={20} />
							</ListItemIcon>
							<ListItemText primaryTypographyProps={{style: {color:this.state.pageID === "barchart" ? "white" : "#000"}}} primary={"Bar Chart"} />
						</ListItem>
					</List>
					<List>
						<ListItem
							style={{backgroundColor: this.state.pageID === "scatterplot" ? "#2196f3" : "white"}}
							onClick={() =>
								this.handlePageChange("scatterplot")
							}
							button>
							<ListItemIcon>
								<Icon icon="scatter-plot" color={this.state.pageID === "scatterplot" ? "white" : "rgba(0, 0, 0, 0.54)"} size={20} />
							</ListItemIcon>
							<ListItemText primaryTypographyProps={{style: {color:this.state.pageID === "scatterplot" ? "white" : "#000"}}} primary={"Scatter Plot"} />
						</ListItem>
					</List>
					<List>
						<ListItem
							style={{backgroundColor: this.state.pageID === "correlationmatrix" ? "#2196f3" : "white"}}
							onClick={() =>
								this.handlePageChange("correlationmatrix")
							}
							button>
							<ListItemIcon>
								<Icon icon="heat-grid" color={this.state.pageID === "correlationmatrix" ? "white" : "rgba(0, 0, 0, 0.54)"} size={20} />
							</ListItemIcon>
							<ListItemText primaryTypographyProps={{style: {color:this.state.pageID === "correlationmatrix" ? "white" : "#000"}}} primary={"Correlation Matrix"} />
						</ListItem>
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<div>
						{this.state.pageID === "barchart" && <BarChart />}
						{this.state.pageID === "scatterplot" && <Scatterplot />}
						{this.state.pageID === "correlationmatrix" && <CorrelationMatrix />}
					</div>
				</main>
			</div>
		);
	}
}

MenuDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MenuDrawer);
