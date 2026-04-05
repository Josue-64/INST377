
var map = L.map('map').setView([40, -100], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

    

function multi() {
    for (let i = 0; i < 3; i++) {
        let latitude = getRandomInRange(30, 35, 3);
        let longitude =  getRandomInRange(-90, -100, 3);
        console.log(`Marker ${i + 1} — Latitude: ${latitude}, Longitude: ${longitude}`);
        document.getElementById("coordinates").innerHTML += `<br> <br> Marker ${i + 1}: Latitude: ${latitude}, Longitude: ${longitude} <span id="locality-${i}"></span>`;
        
       
        L.marker([latitude, longitude]).addTo(map);
        

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then((result) => result.json())
        .then((resultJson) => {
            console.log(resultJson)
            document.getElementById(`locality-${i}`).innerHTML = `<br> Locality: ${resultJson.locality}`;
        });

    }
}


     window.onload = multi;