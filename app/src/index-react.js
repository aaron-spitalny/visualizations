import React from "react";
var ReactDOM = require("react-dom");
import BarChart from "./components/barchart/BarChart";
import Scatterplot from "./components/scatterplot/Scatterplot";
import Header from "./components/Header";
import About from "./components/About";
import MenuDrawer from "./components/global/MenuDrawer";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
	<Provider store={store}>
		<MenuDrawer />
	</Provider>,
	document.getElementById("react")
);
