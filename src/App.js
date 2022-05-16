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
          setWeatherData(weather);
          // weather.current.map((item) => {
          //   return console.log("item", item);
          // });
          console.log("weather data", weatherData);
        } catch (error) {
          console.log("error", error);
        }
      }
      console.log(location);
      getWeatherData();
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(inputData);
  };
  if (!weatherData) {
    <p>Loading</p>;
  }
  return (
    <main>
      <SearchLocation
        handleSubmit={handleSubmit}
        inputData={inputData}
        setInputData={setInputData}
      />
    </main>
  );
}

export default App;
