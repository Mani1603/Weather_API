const apiKey = '791ec2dcfbf25583ccb6e252acacd74e'; 

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod !== 200) {
            document.getElementById('weather-data').innerHTML = `<p>${data.message}</p>`;
            return;
        }

        const weatherData = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <div class="temp">${data.main.temp} °C</div>
            <div class="desc">${data.weather[0].description}</div>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        document.getElementById('weather-data').innerHTML = weatherData;

        const weatherCondition = data.weather[0].main.toLowerCase();
        changeBackgroundImage(weatherCondition);
    } catch (error) {
        document.getElementById('weather-data').innerHTML = `<p>Error fetching weather data</p>`;
        console.error(error);
    }
}

function changeBackgroundImage(condition) {
    let imageUrl = '';

    switch (condition) {
        case 'clear':
            imageUrl = 'url("picture/clear sky.jpg")';
            break;
        case 'clouds':
            imageUrl = 'url("picture/clouds.png")';
            break;
        case 'rain':
            imageUrl = 'url("picture/rain.png")';
            break;
        case 'snow':
            imageUrl = 'url("picture/snow.png")';
            break;
        case 'thunderstorm':
            imageUrl = 'url("picture/thunderstorm.jpg")';
            break;
        case 'haze':
            imageUrl = 'url("picture/haze.png")';
        default:
            imageUrl = 'url("picture/default.png")';
    }

    document.body.style.backgroundImage = imageUrl;
}
