import React from "react";

function ForecastList({
  weatherData,
  forecastType,
  getIcon,
  toggleTemperature,
  isCelsius,
}) {
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
      // return timeOfTheDay;
    } else if (timeOfTheDay === 24) {
      return "12 am";
    } else if (timeOfTheDay > 24 && timeOfTheDay - 24 < 12) {
      return `${timeOfTheDay - 24} am`;
      // return timeOfTheDay;
    } else if (timeOfTheDay > 24 && timeOfTheDay - 24 === 12) {
      return "12 pm";
    } else if (timeOfTheDay > 24 && timeOfTheDay - 24 > 12) {
      return `${timeOfTheDay - 24 - 12} am`;
    } else if (timeOfTheDay > 24) {
      return `${timeOfTheDay - 24} am`;
    }
  };
  return (
    <ul className="forecast__list">
      {weatherData.map((item, index) => {
        return (
          <li key={index}>
            {index < 24 && (
              <div className="forecast__content">
                {forecastType === "daily" && (
                  <p className="forecast__text day">{getDay(index)}</p>
                )}
                {forecastType === "hourly" && (
                  <p className="forecast__text">{getHour(index)}</p>
                )}
                <img
                  className="forecast__icon"
                  src={getIcon(item.weather[0].icon)}
                  alt="Weather Condition Icon"
                />
                {forecastType === "daily" && (
                  <p className="forecast__text">
                    {isCelsius
                      ? `${item.feels_like.day}° C`
                      : `${toggleTemperature(item.feels_like.day)}° F`}
                  </p>
                )}
                {forecastType === "hourly" && (
                  <p className="forecast__text">
                    {isCelsius
                      ? `${item.temp}° C`
                      : `${toggleTemperature(item.temp)} ° C`}
                  </p>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ForecastList;
