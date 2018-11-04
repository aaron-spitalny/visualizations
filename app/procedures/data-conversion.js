var flatten = require('flat');
var converter = require('json-2-csv');
var jsonData = require('../data/week_of_bags_sales.json');
var flattenedJsonData = require('../data/flattened_week_of_bags_sales.json');
var fs = require("fs");
var flattenedEbaySoldData = fs.createWriteStream("./app/data/flattened_week_of_bags_sales.json", {
    flags: "a"
});
var csvEbaySoldData = fs.createWriteStream("./app/data/csv_week_of_bags_sales.csv", {
    flags: "a"
});
var newData = fs.createWriteStream("./app/data/newData.json", {
    flags: "a"
});
var jsonData = require('../data/json_week_of_bags_sales.json');

//this function flattens json data and writes the output to a file
function flattenJSON(json) {
    var flattenedArray = []
    jsonData.forEach(item => flattenedArray.push(flatten(item)));
    flattenedEbaySoldData.write(JSON.stringify(flattenedArray));
}


//this function converts json to csv and writes the output to a file
function convertJSONToCSV() {
    converter.json2csv(flattenedJsonData, (err, csv) => csvEbaySoldData.write(csv),{checkSchemaDifferences: false});
}

//this function creates a start day object
function convertSomeData(){
    jsonData.forEach(item => {
        item.startDay = new Date(item["listingInfo.startTime"]).getDay()
        item.soldDay = new Date(item["listingInfo.endTime"]).getDay()
        item.startHour = new Date(item["listingInfo.startTime"]).getHours()
        item.soldHour = new Date(item["listingInfo.endTime"]).getHours()
        item.timeToSell = ((new Date(item["listingInfo.startTime"]) - (new Date(item["listingInfo.endTime"]))))
    });
    newData.write(JSON.stringify(jsonData));
}

//this function creates a sold day object
function getSoldDays(){
    var soldDays = {};
    jsonData.forEach(item => {
        if (startDays[days[new Date(item["listingInfo.endTime"]).getDay()]]) {
            soldDays[
                days[new Date(item["listingInfo.endTime"]).getDay()]
            ] += 1;
        } else {
            soldDays[
                days[new Date(item["listingInfo.endTime"]).getDay()]
            ] = 1;
        }
    });
    return soldDays
}

//this function creates a start hours object
function getSoldHours(){
    var startHours = {};
    jsonData.forEach(item => {
        if (startHours[new Date(item["listingInfo.startTime"]).getHours()]) {
            startHours[new Date(item["listingInfo.startTime"]).getHours()] += 1;
        } else {
            startHours[new Date(item["listingInfo.startTime"]).getHours()]= 1;
        }
    });
    return startHours
}

//this function creates a sold hours object
function getSoldHours(){
    var soldHours = {};
    jsonData.forEach(item => {
        if (soldHours[new Date(item["listingInfo.endTime"]).getHours()]) {
            soldHours[new Date(item["listingInfo.endTime"]).getHours()] += 1;
        } else {
            soldHours[new Date(item["listingInfo.endTime"]).getHours()]= 1;
        }
    });
    return soldHours
}

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

module.exports = {
    flattenJSON,
    convertJSONToCSV,
    convertSomeData
};
