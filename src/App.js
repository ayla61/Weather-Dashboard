import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import iconMapping from "./iconMapping";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a valid city name.");
      return;
    }

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const BASE_URL = process.env.REACT_APP_WEATHER_BASE_URL;
    const URL = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(URL);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <div className="temp">{weather.main.temp}°C</div>
          <div className="description">{weather.weather[0].description}</div>

          {/* Display the weather icon */}
          <div className="icon-container">
            <img
              src={iconMapping[weather.weather[0].icon]}
              alt={weather.weather[0].description}
            />
          </div>

          <div className="details">
            <div>Humidity: {weather.main.humidity}%</div>
            <div>Wind Speed: {weather.wind.speed} m/s</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
