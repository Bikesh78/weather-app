import { useEffect, useState } from "react";
import SearchLocation from "./Components/SearchLocation";

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [inputData, setInputData] = useState("");
  const [location, setLocation] = useState("Kathmandu");
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (location) {
      async function getWeatherData() {
        try {
          // fetch geograhical co-ordinates by using Geocoding API
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=e0df6556437f2cd771ad7a0fe9ec3724`
          );
          const coordinates = await response.json();
          // console.log(coordinates);
          const lat = coordinates[0].lat;
          const lon = coordinates[0].lon;
          // fetch weather data
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=e0df6556437f2cd771ad7a0fe9ec3724
&units=metric`
          );
          const weather = await weatherResponse.json();
          // console.log(weather);
          await setWeatherData(weather);
          // weather.current.map((item) => {
          //   return console.log("item", item);
          // });
          // await console.log("weather data", weatherData);
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
  const getDay = (index) => {
    const currentDay = new Date().getDay();
    let dayOfTheWeek = currentDay + index;
    if (dayOfTheWeek > 6) {
      dayOfTheWeek = dayOfTheWeek - 7;
    }
    switch (dayOfTheWeek) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return;
    }
  };
  const getHour = (index) => {
    const currentHour = new Date().getHours();
    let timeOfTheDay = currentHour + index;
    if (timeOfTheDay < 12) {
      return `${timeOfTheDay} am`;
    } else if (timeOfTheDay === 12) {
      return "12 pm";
    } else if (timeOfTheDay > 12 && timeOfTheDay < 24) {
      return `${timeOfTheDay - 12} pm`;
    } else if (timeOfTheDay === 24) {
      return "12 am";
    } else if (timeOfTheDay > 24 && timeOfTheDay - 24 < 12) {
      return `${timeOfTheDay - 24} pm`;
    } else if (timeOfTheDay > 24 && timeOfTheDay - 24 === 12) {
      return "12 pm";
    } else if (timeOfTheDay > 24 && timeOfTheDay - 24 > 12) {
      return `${timeOfTheDay - 24 - 12} am`;
    } else if (timeOfTheDay > 24) {
      return `${timeOfTheDay - 24} am`;
    }
  };
  // F = 9/5C + 32
  const toggleTemperature = (temperature) => {
    if (!isCelsius) {
      const farenheightTemperature = (9 / 5) * temperature + 32;
      return farenheightTemperature.toFixed(2);
    }
  };
  toggleTemperature(3.6);
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
                        <p className="forecast__text day">{getDay(index)}</p>
                        <img
                          className="forecast__icon"
                          src={getIcon(day.weather[0].icon)}
                          alt="Weather Condition Icon"
                        />
                        <p className="forecast__text">
                          {isCelsius
                            ? `${day.feels_like.day}° C`
                            : `${toggleTemperature(day.feels_like.day)}° F`}
                        </p>
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
                          <p className="forecast__text">{getHour(index)}</p>
                          <img
                            className="forecast__icon"
                            src={getIcon(hour.weather[0].icon)}
                            alt="Weather Condition Icon"
                          />
                          <p className="forecast__text">
                            {isCelsius
                              ? `${hour.temp}° C`
                              : `${toggleTemperature(hour.temp)} ° C`}
                          </p>
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
