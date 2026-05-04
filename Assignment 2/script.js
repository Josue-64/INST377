function quoteOfTheDay() {
  fetch("https://zenquotes.io/api/random")
    .then((result) => result.json())
    .then((data) => {
      document.getElementById("quoteText").innerHTML =
        `<p>"${data[0].q}"</p><p>- ${data[0].a}</p>`;
    });
}

let stockChart = null;

async function getStock() {
  let fetchURL = "";
  let stockPrices = [];
  let stockDates = [];
  const stockName = document.getElementById("stockName").value;

  const todayDate = new Date();
  const thirtyDaysAgo = new Date(
    todayDate.getTime() - 30 * 24 * 60 * 60 * 1000,
  );
  const sixtyDaysAgo = new Date(todayDate.getTime() - 60 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(
    todayDate.getTime() - 90 * 24 * 60 * 60 * 1000,
  );
  const formattedTodayDate = todayDate.toISOString().split("T")[0];
  const formatted30DaysAgo = thirtyDaysAgo.toISOString().split("T")[0];
  const formatted60DaysAgo = sixtyDaysAgo.toISOString().split("T")[0];
  const formatted90DaysAgo = ninetyDaysAgo.toISOString().split("T")[0];

  const timeRange = document.getElementById("timeRange").value;

  if (timeRange === "30days") {
    fetchURL = `https://api.massive.com/v2/aggs/ticker/${stockName}/range/1/day/${formatted30DaysAgo}/${formattedTodayDate}?adjusted=true&sort=asc&limit=120&apiKey=iQhIzBjtpiC_CsV45ftT70iVllWf1u7b`;
  } else if (timeRange === "60days") {
    fetchURL = `https://api.massive.com/v2/aggs/ticker/${stockName}/range/1/day/${formatted60DaysAgo}/${formattedTodayDate}?adjusted=true&sort=asc&limit=120&apiKey=iQhIzBjtpiC_CsV45ftT70iVllWf1u7b`;
  } else if (timeRange === "90days") {
    fetchURL = `https://api.massive.com/v2/aggs/ticker/${stockName}/range/1/day/${formatted90DaysAgo}/${formattedTodayDate}?adjusted=true&sort=asc&limit=120&apiKey=iQhIzBjtpiC_CsV45ftT70iVllWf1u7b`;
  }

  const resultJson = await fetch(fetchURL).then((result) => result.json());

  resultJson.results.forEach((stock) => {
    stockPrices.push(stock.c);
    stockDates.push(new Date(stock.t).toLocaleDateString());
  });

  if (stockChart) {
    stockChart.destroy();
  }

  const ctx = document.getElementById("myChart");
  stockChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: `${stockName} Closing Price`,
          data: stockPrices,
          borderWidth: 2,
          borderColor: "coral",
          backgroundColor: "rgba(255, 127, 80, 0.2)",
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

async function getRedditStocks() {
  const resultJson = await fetch(
    "https://apewisdom.io/api/v1.0/filter/all-stocks/page/1",
  ).then((result) => result.json());

  const top5 = resultJson.results.slice(0, 5);

  const tableBody = document.getElementById("redditStocksBody");

  top5.forEach((stock) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
            <td>${stock.mentions}</td>
            <td>${stock.upvotes > 1 ? '<img src="bullish.png" width="100px">' : '<img src="bearish.png" width="100px">'}</td>`;

    tableBody.appendChild(row);
  });
}

async function getDogImages() {
  const response = await fetch(
    "https://dog.ceo/api/breeds/image/random/10",
  ).then((result) => result.json());

  const swiperWrapper = document.getElementById("dogImages");

  response.message.forEach((imageUrl) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `<img src="${imageUrl}" alt="Dog Image">`;
    swiperWrapper.appendChild(slide);
  });

  new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

async function getDogBreeds() {
  const response = await fetch("https://dogapi.dog/api/v2/breeds").then(
    (result) => result.json(),
  );
  const shuffled = response.data.sort(() => Math.random() - 0.5).slice(0, 10);
  const breedButtons = document.getElementById("breedButtons");

  shuffled.forEach((breed) => {
    const button = document.createElement("button");
    button.classList.add("button-62");
    button.textContent = breed.attributes.name;
    button.onclick = () => showBreedInfo(breed);
    breedButtons.appendChild(button);
  });
}

function showBreedInfo(breed) {
  const breedInfo = document.getElementById("breedInfo");

  document.getElementById("breedName").textContent = breed.attributes.name;
  document.getElementById("breedDescription").textContent =
    breed.attributes.description;
  document.getElementById("breedMinLife").textContent =
    `Min Life: ${breed.attributes.life.min} years`;
  document.getElementById("breedMaxLife").textContent =
    `Max Life: ${breed.attributes.life.max} years`;

  breedInfo.style.display = "block";
}

function setupAnnyang() {
  if (annyang.isSpeechRecognitionSupported()) {
    const commands = {
      hello: () => {
        alert("Hello World");
      },
      "change color to :color": (color) => {
        document.body.style.backgroundColor = color.toLowerCase();
      },
      "navigate to :page": (page) => {
        const p = page.toLowerCase();
        if (p === "home") window.location.href = "home.html";
        else if (p === "stocks") window.location.href = "stocks.html";
        else if (p === "dogs") window.location.href = "dogs.html";
      },
      "lookup :stock": (stock) => {
        if (document.getElementById("stockName")) {
          document.getElementById("stockName").value = stock.toUpperCase();
          document.getElementById("timeRange").value = "30days";
          getStock();
        }
      },
      "load dog breed :breed": (breed) => {
        if (document.getElementById("breedButtons")) {
          const buttons = document.querySelectorAll("#breedButtons button");
          buttons.forEach((button) => {
            if (button.textContent.toLowerCase() === breed.toLowerCase()) {
              button.click();
            }
          });
        }
      },
    };

    annyang.addCommands(commands);

    document.getElementById("audio_on").addEventListener("click", () => {
      annyang.start();
    });

    document.getElementById("audio_off").addEventListener("click", () => {
      annyang.abort();
    });
  }
}

window.onload = function () {
  setupAnnyang();

  if (document.getElementById("quoteText")) {
    quoteOfTheDay();
  }
  if (document.getElementById("redditStocksBody")) {
    getRedditStocks();
  }
  if (document.getElementById("dogImages")) {
    getDogImages();
    getDogBreeds();
  }
};
