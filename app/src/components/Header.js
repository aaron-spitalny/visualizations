import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function Header() {
	return (
		<Paper style={{ paddingTop: 20, paddingBottom: 20, marginBottom: 20 }}>
			<span
				style={{
					backgroundColor: "#f2ff4a",
					fontSize: 24,
					margin: 5,
					padding: 5,
					borderRadius: 5
				}}>
				The E-commerce Web
			</span>
		</Paper>
	);
}
