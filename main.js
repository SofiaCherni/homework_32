let city = document.querySelector('.input');
let btn = document.querySelector('.btn');
const weatherContent = document.getElementById('weather-content');

btn.addEventListener('click', function(){
    getWeather(city.value);
    weatherContent.style.display = 'flex';
});

function getWeather(city) {
    let xhr = new XMLHttpRequest();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=dafd50c8747cfa5d65394f97622d5a56`;
    

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                displayWeather(data);
            } else {
                alert('Error: такого міста не існує, введіть назву латинськими літерами Код ошибки: ' + xhr.status);
            }
        }
    };
    xhr.send();
}



function displayWeather(data) {
    let iconCode = data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherContent.innerHTML = `
        <h2> &#128205; ${data.name}, ${data.sys.country}</h2>
        <p class="temperature">${data.main.temp}°C</p>
        <img src="${iconUrl}" alt="Weather icon">
        <div class="box">
            <p>Вологість : ${data.main.humidity}%</p>
            <p>Швидкість вітру: ${data.wind.speed} m/s</p>
            <p>Тиск: ${data.main.pressure} hPa</p>
            <p>Напрям вітру у градусах: ${data.wind.deg}°</p>
        </div>
        <p>Опис: ${data.weather[0].description}</p>
    `;
}
