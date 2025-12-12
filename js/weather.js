document.addEventListener("DOMContentLoaded", async () => {
    try {
        const API_KEY = "15c66fe79009e3ffd4df41e8264b631d";
        const location = "Stockholm";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=sv&appid=${API_KEY}`;

        const weatherInfoSection = document.getElementById("weather-info");
        const weatherIconImg = document.getElementById("weather-icon");
        const weatherLocationP = document.getElementById("weather-location");
        const weatherTempP = document.getElementById("weather-temp");
        const weatherFeelsP = document.getElementById("weather-feels");


        const response = await fetch(url);

        if (!response.ok) {
            // Avbryt och ge html fallback
            weatherInfoSection.innerHTML = `<p class"error-weather-info">Ingen väderdata tillgänglig</p>`
            return;
        }

        const data = await response.json();

        const { temp, feels_like } = data.main;
        const { description, icon } = data.weather[0];

        weatherIconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        // weatherDescriptionP.textContent = description;
        weatherTempP.textContent = `${Math.round(temp)} °C`;
        weatherFeelsP.textContent = `Känns som ${Math.round(feels_like)} °C`;
        weatherLocationP.textContent = location;

    } catch (error) {
        console.error("Väder API-fel:", error);
        return;
    }

})

