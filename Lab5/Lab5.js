function convertCurrency() {
    console.log("Attempting to convert currency...");
    
    const fromCurrencySelect = document.getElementById("from_currency");
    const toCurrencySelect = document.getElementById("to_currency");
    fetch("https://api.frankfurter.app/currencies")
        .then((result) => result.json())
        .then((resultJson) => {
            console.log(resultJson)

            Object.entries(resultJson).forEach(([code, name]) => {
                console.log(`Object: ${JSON.stringify(resultJson)}`);

                const option1 = document.createElement("option");
                const option2 = document.createElement("option");
                option1.innerHTML = name;
                option2.innerHTML = name;
                option1.value = code;
                option2.value = code;
                fromCurrencySelect.appendChild(option1);
                toCurrencySelect.appendChild(option2);

            })
        })
}

function submitForm() {
    const fromCurrency = document.getElementById("from_currency").value;
    const toCurrency = document.getElementById("to_currency").value;
    const amount = document.getElementById("amount").value;
    if (fromCurrency === toCurrency) {
    alert("Cannot convert the same currency!");
    return;
}

    const url = `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const rate = data.rates[toCurrency];
        console.log(rate);
        
        converted_result = ""
        document.getElementById("converted_amount").innerHTML = converted_result
        document.getElementById("converted_amount").innerHTML = `${amount} ${fromCurrency} is equal to ${amount*rate} ${toCurrency}`;
    });
    }

window.onload = convertCurrency;