var express = require('express');
var dataConversionProcedures = require('./procedures/data-conversion')

//server stuff
var app = express();
app.use(express.static('app/public'));
app.use(require('./routes/index-route'));
app.set('view engine', 'ejs');
app.set('views', 'app/views');

var server = app.listen(3020, function(){
    console.log("listening on port " + "3020");
});

//get data from ebay
//ebayService.searchSold()

//flatten data
//dataConversionProcedures.flattenJSON()

//covert json to csv
//dataConversionProcedures.convertJSONToCSV()

//covert json to csv
//dataConversionProcedures.convertSomeData()
