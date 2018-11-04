import {combineReducers} from 'redux';
import {barchart} from './barchartReducer';
import {scatterplot} from './scatterplotReducer';

export default combineReducers({
    barchart,
    scatterplot
});
