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
  // console.log(new Date().getTime());
  // if (!weatherData) {
  //   return <p>Loading</p>;
  // }
  return (
    <main>
      <SearchLocation
        handleSubmit={handleSubmit}
        inputData={inputData}
        setInputData={setInputData}
      />
      {weatherData && (
        <>
          <section className="weather-information">
            <h2 className="location">{weatherData.timezone.split("/")[1]}</h2>
            <h3 className="temperature">{`${weatherData.current.temp} °C`}</h3>
            {/* <img src="" alt="weather-icon" /> */}
            <h3 className="weather-description">
              {weatherData.current.weather[0].description}
            </h3>
            <h4>{`Feels like: ${weatherData.current.feels_like} °C`}</h4>
            <h4>{`Humidity Level: ${weatherData.current.humidity} %`}</h4>
            <h4>{`Wind Speed: ${weatherData.current.wind_speed} km/hr`}</h4>
          </section>
          <section className="daily-weather">
            <h3>Daily Weather</h3>
            {weatherData.daily.map((day, index) => {
              return <p key={index}>{`${day.weather[0].main}`}</p>;
            })}
          </section>
          <section className="hourly-weather">
            <h3>Hourly Weather</h3>
            {weatherData.hourly.map((hour, index) => {
              return index < 24 && <p>{`${hour.weather[0].main}`}</p>;
            })}
          </section>
        </>
      )}
    </main>
  );
}

export default App;
