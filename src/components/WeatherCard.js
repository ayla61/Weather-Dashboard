import React from "react";

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherDetails, wind } = weather;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{weatherDetails[0].description}</p>
      <h3>{Math.round(main.temp)}°C</h3>
      <p>Feels like: {Math.round(main.feels_like)}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind: {Math.round(wind.speed)} m/s</p>
    </div>
  );
};

export default WeatherCard;
