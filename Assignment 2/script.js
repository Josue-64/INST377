function quoteOfTheDay() {
    fetch('https://zenquotes.io/api/random')
        .then(result => result.json())
        .then(data => {
            quote = data[0]['q'] + " -" + data[0]['a'];
            document.getElementById("quoteText").innerHTML = quote;
            console.log(quote);
        });
}

window.onload = function() {
    quoteOfTheDay();
}