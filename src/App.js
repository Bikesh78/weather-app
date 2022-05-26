import { useEffect, useState } from "react";
import CurrentWeather from "./Components/CurrentWeather";
import ForecastList from "./Components/ForecastList";
import SearchLocation from "./Components/SearchLocation";

function App() {
  const [weatherData, setWeatherData] = useState("");
  const [inputData, setInputData] = useState("");
  const [location, setLocation] = useState("Kathmandu");
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(false);
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
          setError(true);
        }
      }
      getWeatherData();
    }
  }, [location]);
  if (!weatherData) {
    return <p>Loading...</p>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(inputData);
  };

  const getIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  const toggleTemperature = (temperature) => {
    if (!isCelsius) {
      const farenheightTemperature = (9 / 5) * temperature + 32;
      return farenheightTemperature.toFixed(2);
    }
  };

  return (
    <>
      <main>
        <div className="weather-info">
          <SearchLocation
            handleSubmit={handleSubmit}
            inputData={inputData}
            setInputData={setInputData}
          />
          {error && <p>There was an error fetching location</p>}
          {!error && weatherData && (
            <CurrentWeather
              weatherData={weatherData}
              location={location}
              getIcon={getIcon}
              toggleTemperature={toggleTemperature}
              isCelsius={isCelsius}
              setIsCelsius={setIsCelsius}
            />
          )}
        </div>
        {!error && weatherData && (
          <div className="forecast">
            <div className="forecast-daily">
              <div className="forecast__header">
                <h3>Daily Weather</h3>
              </div>
              <ForecastList
                forecastType={"daily"}
                weatherData={weatherData.daily}
                getIcon={getIcon}
                toggleTemperature={toggleTemperature}
                isCelsius={isCelsius}
              />
            </div>
            <div className="forecast-hourly">
              <div className="forecast__header">
                <h3>Hourly Weather</h3>
              </div>
              <ForecastList
                forecastType={"hourly"}
                weatherData={weatherData.hourly}
                getIcon={getIcon}
                toggleTemperature={toggleTemperature}
                isCelsius={isCelsius}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
