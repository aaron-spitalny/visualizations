import C from "../constants";
import { initialState } from "../initialState";

//This reducer changes the scatterplot object
export const scatterplot = (state = initialState.scatterplot, action) => {
	switch (action.type) {
		case C.CHANGE_AXIS_VALUE:
			return {
				...state,
				[action.payload.name]: action.payload.value
			};
		default:
			return state;
	}
};
