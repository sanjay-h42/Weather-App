 const weatherForm = document.querySelector(".weatherForm");
    const cityInput = document.querySelector(".cityInput");
    const card = document.querySelector(".card");
    const apiKey = "ae99b425787b62225a8696431f5707f2"; 

    weatherForm.addEventListener("submit", async event => {
        event.preventDefault();
        const city = cityInput.value.trim();

        if (city) {
            try {
                const weatherData = await getWeatherData(city);
                displayWeatherInfo(weatherData);
            } catch (error) {
                displayError("Could not fetch weather data");
            }
        } else {
            displayError("Please enter a city");
        }
    });

    async function getWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        return await response.json();
    }

    function displayWeatherInfo(data) {
        const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

        card.innerHTML = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`; // Optional: switch to °C
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");

        card.append(cityDisplay, tempDisplay, humidityDisplay, descDisplay, weatherEmoji);
    }

    function getWeatherEmoji(id) {
        switch (true) {
            case id >= 200 && id < 300: return "⛈";
            case id >= 300 && id < 400: return "🌧";
            case id >= 500 && id < 600: return "🌧";
            case id >= 600 && id < 700: return "❄";
            case id >= 700 && id < 800: return "🌫";
            case id === 800: return "☀";
            case id >= 801 && id < 810: return "☁";
            default: return "❓";
        }
    }

    function displayError(message) {
        card.innerHTML = "";
        card.style.display = "flex";

        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("errorDisplay");

        card.appendChild(errorDisplay);
    }