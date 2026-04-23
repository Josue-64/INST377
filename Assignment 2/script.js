function quoteOfTheDay() {
    fetch('https://zenquotes.io/api/random')
        .then(result => result.json())
        .then(data => {
           
        });
}


async function getStock() {
    let fetchURL = "";
    let stockPrice = [];
    const stockName = document.getElementById("stockName").value;

    const todayDate = new Date();
    const thirtyDaysAgo = new Date(todayDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    const ninetyDaysAgo = new Date(todayDate.getTime() - (90 * 24 * 60 * 60 * 1000));
    const sixtyDaysAgo = new Date(todayDate.getTime() - (60 * 24 * 60 * 60 * 1000));
    const formattedTodayDate = todayDate.toISOString().split('T')[0];
    const formatted30DaysAgo = thirtyDaysAgo.toISOString().split('T')[0];
    const formatted60DaysAgo = sixtyDaysAgo.toISOString().split('T')[0];
    const formatted90DaysAgo = ninetyDaysAgo.toISOString().split('T')[0];

    const timeRange = document.getElementById("timeRange").value;

    if (timeRange === "30days") {
        fetchURL = `https://api.massive.com/v2/aggs/ticker/${stockName}/range/1/day/${formatted30DaysAgo}/${formattedTodayDate}?adjusted=true&sort=asc&limit=120&apiKey=iQhIzBjtpiC_CsV45ftT70iVllWf1u7b`;
    } else if (timeRange === "60days") {
        fetchURL = `https://api.massive.com/v2/aggs/ticker/${stockName}/range/1/day/${formatted60DaysAgo}/${formattedTodayDate}?adjusted=true&sort=asc&limit=120&apiKey=iQhIzBjtpiC_CsV45ftT70iVllWf1u7b`;
    } else if (timeRange === "90days") {
        fetchURL = `https://api.massive.com/v2/aggs/ticker/${stockName}/range/1/day/${formatted90DaysAgo}/${formattedTodayDate}?adjusted=true&sort=asc&limit=120&apiKey=iQhIzBjtpiC_CsV45ftT70iVllWf1u7b`;
    }

    const resultJson = await fetch(fetchURL)
        .then((result) => result.json()); 

    resultJson.results.forEach((stock) => {
        stockPrice.push(stock.c);
    });

    console.log(stockPrice);
        
}



window.onload = function() {
    quoteOfTheDay();
}