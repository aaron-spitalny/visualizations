import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { changeBarChartFromAbout } from "../../redux/actions/barchartActions";
import { connect } from "react-redux";
import propTypes from "prop-types";

const styles = theme => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		position: "relative",
		overflow: "auto",
		maxHeight: 400
	},
	listSection: {
		backgroundColor: "inherit"
	},
	ul: {
		backgroundColor: "inherit",
		padding: 0
	}
});

function CategoryList(props) {
	const { classes } = props;

	return (
		<List className={classes.root} subheader={<li />}>
			<li className={classes.listSection}>
				<ul className={classes.ul}>
					<ListSubheader style={{cursor: "pointer"}} onClick={()=> props.changeBarChartFromAbout("start_day")}>Start Day</ListSubheader>
					<ListItem>
						<ListItemText>
							This is the day of the week item was uploaded by the
							seller.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							The most popular day is wednesday, I guess
							productivity peaks on wednesday and then slows down.
						</ListItemText>
					</ListItem>
				</ul>
			</li>
			<li className={classes.listSection}>
				<ul className={classes.ul}>
					<ListSubheader style={{cursor: "pointer"}} onClick={()=> props.changeBarChartFromAbout("sold_day")}>Sold Day</ListSubheader>
					<ListItem>
						<ListItemText>
							This is the day of the week the item was sold.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							Monday and Tuesday are clear winners in this
							category, which is surprising one would think the
							weekend would be more popular for shopping, then
							again this is e-commerce.
						</ListItemText>
					</ListItem>
				</ul>
			</li>
			<li className={classes.listSection}>
				<ul className={classes.ul}>
					<ListSubheader style={{cursor: "pointer"}} onClick={()=> props.changeBarChartFromAbout("start_hour")}>Start Hour</ListSubheader>
					<ListItem>
						<ListItemText>
							This is the hour in the day the item was uploaded by
							the seller.
						</ListItemText>
					</ListItem>

					<ListItem>
						<ListItemText>
							Out of twenty four hours in the day 3pm and 9pm pull
							well ahead of the pack, now 3pm makes sense it is
							towards the end of the workday emplooyes are looking
							to get the their work in but 9pm is not obvious
							(this will become obvious on the next category).
						</ListItemText>
					</ListItem>
				</ul>
			</li>
			<li className={classes.listSection}>
				<ul className={classes.ul}>
					<ListSubheader style={{cursor: "pointer"}} onClick={()=> props.changeBarChartFromAbout("sold_hour")}>Sold Hour</ListSubheader>
					<ListItem>
						<ListItemText>
							This is the hour in the day the item was sold.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							This graph is pretty clear 9pm is by far the most
							popular hour for shopping.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							One will persume sellers believe uploading near this
							time will increase their chances of a sale.
						</ListItemText>
					</ListItem>
				</ul>
			</li>
			<li className={classes.listSection}>
				<ul className={classes.ul}>
					<ListSubheader style={{cursor: "pointer"}} onClick={()=> props.changeBarChartFromAbout("time_to_sell")}>Time to Sell</ListSubheader>
					<ListItem>
						<ListItemText>
							This is the number of days it took for the item to sell.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							Surprisingly almost a quarter of the items sold in the first 10 days of being active.
						</ListItemText>
					</ListItem>
				</ul>
			</li>
			<li className={classes.listSection}>
				<ul className={classes.ul}>
					<ListSubheader style={{cursor: "pointer"}} onClick={()=> props.changeBarChartFromAbout("seller_country")}>Seller Country</ListSubheader>
					<ListItem>
						<ListItemText>
							This is the country the seller is located in.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							I was somewhat surprised to see china so high up due the longer
                            delivery time.
						</ListItemText>
					</ListItem>
				</ul>
			</li>
		</List>
	);
}


CategoryList.propTypes = {
	changeBarChartFromAbout: propTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	categoryValue: state.barchart.category
});

export default connect(mapStateToProps, { changeBarChartFromAbout })(
	withStyles(styles, { withTheme: true })(CategoryList)
);
