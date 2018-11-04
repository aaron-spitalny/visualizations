import C from "../constants";

//This action changes the scatterplot axis valeus
export const changeScatterPlot = (name, value) => dispatch => {
	dispatch({
		type: C.CHANGE_AXIS_VALUE,
		payload: {
            name: name,
            value:  value
        }
	});
};
