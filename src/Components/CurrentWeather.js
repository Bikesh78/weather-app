import React from "react";

function CurrentWeather({
  getIcon,
  toggleTemperature,
  isCelsius,
  setIsCelsius,
  location,
  weatherData,
}) {
  return (
    <div className="card">
      <h1 className="card__location">{location.split(",")[0]}</h1>
      <div className="card--flex">
        <img
          className="card__icon"
          src={getIcon(weatherData.current.weather[0].icon)}
          alt="Weather Condition Icon"
        />
        <h3 className="card__temperature">
          {isCelsius
            ? `${weatherData.current.temp}° C`
            : `${toggleTemperature(weatherData.current.temp)}° F`}
        </h3>
      </div>
      <h3 className="card__description">
        {weatherData.current.weather[0].description}
      </h3>
      <h4>
        Feels like:{" "}
        {isCelsius
          ? `${weatherData.current.feels_like}° C`
          : `${toggleTemperature(weatherData.current.feels_like)}° F`}
      </h4>
      <h4>{`Humidity Level: ${weatherData.current.humidity}%`}</h4>
      <h4>{`Wind Speed: ${weatherData.current.wind_speed} km/hr`}</h4>
      <div className="toggle-switch">
        <input type="checkbox" id="toggle__checkbox" />
        <label
          htmlFor="toggle__checkbox"
          className="toggle__label"
          onClick={() => setIsCelsius(!isCelsius)}
        >
          <span className="toggle__background"></span>
        </label>
      </div>
    </div>
  );
}

export default CurrentWeather;
