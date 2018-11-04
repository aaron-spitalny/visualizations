import C from "../constants";
import { initialState } from "../initialState";

//This reducer changes the barchart object
export const barchart = (state = initialState.barchart, action) => {
	switch (action.type) {
		case C.CHANGE_CATEGORY:
			return {
				...state,
				category: action.payload
			};
		default:
			return state;
	}
};
