import { useEffect, useState } from "react";
import SearchLocation from "./Components/SearchLocation";

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [inputData, setInputData] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (location) {
      async function getWeatherData() {
        try {
          // fetch geograhical co-ordinates by using Geocoding API
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=e0df6556437f2cd771ad7a0fe9ec3724`
          );
          const coordinates = await response.json();
          console.log(coordinates);
          const lat = coordinates[0].lat;
          const lon = coordinates[0].lon;
          // fetch weather data
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=e0df6556437f2cd771ad7a0fe9ec3724
&units=metric`
          );
          const weather = await weatherResponse.json();
          console.log(weather);
          await setWeatherData(weather);
          // weather.current.map((item) => {
          //   return console.log("item", item);
          // });
          await console.log("weather data", weatherData);
        } catch (error) {
          console.log("error", error);
        }
      }
      getWeatherData();
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(inputData);
  };
  const getIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  // console.log(new Date().getTime());
  // if (!weatherData) {
  //   return <p>Loading</p>;
  // }
  return (
    <>
      <main>
        <div className="weather-info">
          <SearchLocation
            handleSubmit={handleSubmit}
            inputData={inputData}
            setInputData={setInputData}
          />
          {weatherData && (
            <div className="card">
              <h1 className="card__location">
                {weatherData.timezone.split("/")[1]}
              </h1>
              <div className="card--flex">
                <img
                  className="card__icon"
                  src={getIcon(weatherData.current.weather[0].icon)}
                  alt="Weather Condition Icon"
                />
                <h3 className="card__temperature">{`${weatherData.current.temp}° C`}</h3>
              </div>
              {/* <img src="" alt="weather-icon" /> */}
              <h3 className="card__description">
                {weatherData.current.weather[0].description}
              </h3>
              <h4>{`Feels like: ${weatherData.current.feels_like}° C`}</h4>
              <h4>{`Humidity Level: ${weatherData.current.humidity}%`}</h4>
              <h4>{`Wind Speed: ${weatherData.current.wind_speed} km/hr`}</h4>
            </div>
          )}
        </div>
        {weatherData && (
          <div className="forecast">
            <div className="forecast-daily">
              <div className="forecast__header">
                <h3>Daily Weather</h3>
              </div>
              <ul className="forecast__list">
                {weatherData.daily.map((day, index) => {
                  return (
                    <li key={index}>
                      <div className="forecast__content">
                        <p className="forecast__text">Day</p>
                        <img
                          className="forecast__icon"
                          src={getIcon(day.weather[0].icon)}
                          alt="Weather Condition Icon"
                        />
                        <p className="forecast__text">{`${day.feels_like.day}° C`}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="forecast-hourly">
              <div className="forecast__header">
                <h3>Hourly Weather</h3>
              </div>
              <ul className="forecast__list">
                {weatherData.hourly.map((hour, index) => {
                  return (
                    <li key={index}>
                      {index < 24 && (
                        <div className="forecast__content">
                          <p className="forecast__text">Time</p>
                          <img
                            className="forecast__icon"
                            src={getIcon(hour.weather[0].icon)}
                            alt="Weather Condition Icon"
                          />
                          <p className="forecast__text">{`${hour.temp}° C`}</p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
