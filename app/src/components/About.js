import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function About() {
	return (
		<ExpansionPanel
			defaultExpanded={false}
			style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 20 }}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="h6">About</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<div
					style={{
						margin: 5,
						padding: 5
					}}>
					<Typography variant="body1" color="textSecondary">
						The data was collected from eBay using their finding
						api, it comprises of 1,959 items which were all the
						items sold in the United States for one week in the {" "}
						{"men's"} bag category.
						<br />
						<br />
					</Typography>
				</div>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}
