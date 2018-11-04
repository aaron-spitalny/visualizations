import React from "react";
import CategoryList from "./CategoryList";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function Categories(props) {
	return (
		<ExpansionPanel
			defaultExpanded={true}
			style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 20 }}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="h6">The Categories</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<CategoryList />{" "}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}
