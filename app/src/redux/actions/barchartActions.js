import C from "../constants";

//This action barchart category
export const changeBarChart = event => dispatch => {
	dispatch({
		type: C.CHANGE_CATEGORY,
		payload: event.target.value
	});
};

//This action barchart category from about
export const changeBarChartFromAbout = value => dispatch => {
	dispatch({
		type: C.CHANGE_CATEGORY,
		payload: value
	});
};
