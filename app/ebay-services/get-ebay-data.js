var ebay = require("ebay-api");
var config = require("../../config_vars.json");
var fs = require("fs");
var ebaySoldData = fs.createWriteStream("./app/data/week_of_bags_sales.json", {
    flags: "a"
});

async function searchSold() {
    var page = 1;
    var hasMore = "true";
    var itemId = null;
    var weekOfSoldItemsArray = []
    try {
        while (hasMore === "true") {
            let itemFilter = [];
            itemFilter.push({
                name: "SoldItemsOnly",
                value: true
            }, {
                name: "Condition",
                value: "1000"
            }, {
                name: "EndTimeFrom",
                value: new Date(Date.now() - 691200000).toISOString()
            }, {
                name: "EndTimeTo",
                value: new Date(Date.now() - 86400000).toISOString()
            },
			{
				name: "ListedIn",
				value: "EBAY-US"
			},
            {
                name: "ListingType",
                value: "FixedPrice"
            });
            var body = {
                serviceName: "Finding",
                opType: "findCompletedItems",
                appId: config.ebay_appId,
                authToken: config.ebay_key,
                params: {
                    itemFilter: itemFilter,
                    categoryId: "52357",
                    outputSelector: ["SellerInfo"],
                    sortOrder: "EndTimeSoonest",
                    paginationInput: {
                        entriesPerPage: 100,
                        pageNumber: page
                    }
                }
            };
            //call ebay
            var results = await ebayPromise(body, ebay);
            //check if ebay returned a failure
            if (results.Ack === "Failure") {
                throw Array.isArray(results.Errors) ?
                    results.Errors.map(x => x.LongMessage).join(" + ") :
                    results.Errors.LongMessage;
            }
            //return pages
            page = page + 1;
            if (page > results.paginationOutput.totalPages) {
                hasMore = false;
            }
            //process results
            if (Array.isArray(results.searchResult.item)) {
                await asyncForEach(
                    results.searchResult.item,
                    async ebayItem => {
                        weekOfSoldItemsArray.push(ebayItem)
                    }
                );
            } else if (parseInt(results.paginationOutput.totalEntries) > 0) {
                weekOfSoldItemsArray.push(results.searchResult.item)
            }
        }
		console.log(weekOfSoldItemsArray.length)
        ebaySoldData.write(JSON.stringify(weekOfSoldItemsArray));
    } catch (err) {
        console.log(err)
        return null;
    }
}

async function recommendedPrice(item, flag) {
    var prices = [];
    try {
        let itemFilter = [];
        itemFilter.push({
            name: "SoldItemsOnly",
            value: true
        }, {
            name: "Condition",
            value: item.conditionId
        });
        if (flag) {
            itemFilter.push({
                name: "Seller",
                value: "truehabit"
            });
        }
        var body = {
            serviceName: "Finding",
            opType: "findCompletedItems",
            appId: config.ebay_appId,
            authToken: config.ebay_key,
            params: {
                keywords: item.brand,
                itemFilter: itemFilter,
                categoryId: item.categoryId,
                paginationInput: {
                    entriesPerPage: 100,
                    pageNumber: 1
                }
            }
        };
        //call ebay
        var results = await ebayPromise(body, ebay);
        //check if ebay returned a failure
        if (results.Ack === "Failure") {
            throw Array.isArray(results.Errors) ?
                results.Errors.map(x => x.LongMessage).join(" + ") :
                results.Errors.LongMessage;
        }
        //process results
        if (Array.isArray(results.searchResult.item)) {
            await asyncForEach(results.searchResult.item, async ebayItem => {
                prices.push(
                    parseInt(ebayItem.sellingStatus.currentPrice.amount)
                );
            });
        } else if (parseInt(results.paginationOutput.totalEntries) > 0) {
            prices.push(
                parseInt(
                    results.searchResult.item.sellingStatus.currentPrice.amount
                )
            );
        }
        //sort results
        prices.sort((a, b) => a - b);
        //get middle quartile
        let start = Math.floor(prices.length / 4);
        let end = Math.floor(prices.length * 3 / 4);
        //get median
        let median;
        if (prices.length % 2 === 0) {
            median =
                (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2;
        } else {
            median = prices[(prices.length - 1) / 2];
        }
        //get average
        const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
        //retrun median, min, max and average
        return {
            min: Math.min(
                ...prices.slice(Math.floor(prices.length / 2), prices.length)
            ),
            max: Math.max(...prices),
            median: median,
            average: average(
                prices.slice(Math.floor(prices.length / 2), prices.length)
            )
        };
    } catch (err) {
        console.log(err)
        return null;
    }
}

async function searchKeywords() {
    var page = 1;
    var hasMore = "true";
    var itemId = null;
    var itemTitles = {};
    try {
        while (hasMore === "true") {
            let itemFilter = [];
            var body = {
                serviceName: "Finding",
                opType: "findItemsByKeywords",
                appId: config.ebay_appId,
                authToken: config.ebay_key,
                params: {
                    keywords: "calvin klein boxer",
                    categoryId: "11507",
                    paginationInput: {
                        entriesPerPage: 100,
                        pageNumber: page
                    }
                }
            };
            //call ebay
            var results = await ebayPromise(body, ebay);
            //check if ebay returned a failure
            if (results.Ack === "Failure") {
                throw Array.isArray(results.Errors) ?
                    results.Errors.map(x => x.LongMessage).join(" + ") :
                    results.Errors.LongMessage;
            }
            //return pages
            page = page + 1;
            if (page > 1) {
                hasMore = false;
            }
            //process results
            if (Array.isArray(results.searchResult.item)) {
                await asyncForEach(
                    results.searchResult.item,
                    async ebayItem => {
                        processTitle(ebayItem.title, itemTitles);
                    }
                );
            } else if (parseInt(results.paginationOutput.totalEntries) > 0) {
                processTitle(results.searchResult.item.title, itemTitles);
            }
        }
        var keysSorted = Object.keys(itemTitles).sort(function(a, b) {
            return itemTitles[b] - itemTitles[a];
        });
        keysSorted.forEach(function(key) {
            if (itemTitles[key] > 1) {
                console.log(key, itemTitles[key]);
            }
        });
    } catch (err) {
        console.log(err)
        return null;
    }
}

function processTitle(title, itemTitles) {
    try {
        if (title) {
            let titleArray = title.split(" ");
            titleArray.forEach(function(word) {
                let trimmedWord = word.trim();
                if (trimmedWord && trimmedWord.length > 1) {
                    var uppercased = trimmedWord.toUpperCase();
                    if (itemTitles[uppercased]) {
                        itemTitles[uppercased] = itemTitles[uppercased] + 1;
                    } else {
                        itemTitles[uppercased] = 1;
                    }
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
}

function ebayPromise(body, ebay) {
    return new Promise(function(resolve, reject) {
        ebay.xmlRequest(body, function(err, data) {
            resolve(data);
        });
    });
}

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

module.exports = {
    searchSold,
    searchKeywords,
    recommendedPrice
};
