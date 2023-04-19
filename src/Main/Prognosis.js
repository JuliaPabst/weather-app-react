import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Prognosis(props) {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [weekday, setWeekday] = useState(null);

  const week = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  useEffect(() => {
    let fullDate = new Date();
    let weekdayNumber = fullDate.getDay();
    setWeekday(weekdayNumber);
  }, []);

  useEffect(() => {
    const url = `https://api.shecodes.io/weather/v1/forecast?query=${props.location}&key=o54b38af539a41d076df6ce6a0c0btb0`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let weatherForecastObject = [
          {
            icon: data.daily[0].condition.icon_url,
            minTemp: Math.round(data.daily[0].temperature.minimum),
            maxTemp: Math.round(data.daily[0].temperature.maximum),
          },
          {
            icon: data.daily[1].condition.icon_url,
            minTemp: Math.round(data.daily[1].temperature.minimum),
            maxTemp: Math.round(data.daily[1].temperature.maximum),
          },
          {
            icon: data.daily[2].condition.icon_url,
            minTemp: Math.round(data.daily[2].temperature.minimum),
            maxTemp: Math.round(data.daily[2].temperature.maximum),
          },
          {
            icon: data.daily[3].condition.icon_url,
            minTemp: Math.round(data.daily[3].temperature.minimum),
            maxTemp: Math.round(data.daily[3].temperature.maximum),
          },
          {
            icon: data.daily[4].condition.icon_url,
            minTemp: Math.round(data.daily[4].temperature.minimum),
            maxTemp: Math.round(data.daily[4].temperature.maximum),
          },
          {
            icon: data.daily[5].condition.icon_url,
            minTemp: Math.round(data.daily[5].temperature.minimum),
            maxTemp: Math.round(data.daily[5].temperature.maximum),
          },
        ];

        setWeatherForecast(weatherForecastObject);
      });
  }, [props.location]);

  if (weatherForecast === null) {
    return (
      <div className="prognosis">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="prognosis">
      <div className="row weatherDays">
        <div className="col-4 col-sm-2 weekday">
          {week[weekday + 1]}
          <img
            src={weatherForecast[0].icon}
            alt="weatherimage"
            className="miniWeatherIcon"
          />
          <br />
          {2}° {weatherForecast[0].maxTemp}°
        </div>
        <div className="col-4 col-sm-2 weekday">
          {week[weekday + 2]}
          <img
            src={weatherForecast[1].icon}
            alt="weatherimage"
            className="miniWeatherIcon"
          />
          <br />
          {weatherForecast[1].minTemp}° {weatherForecast[1].maxTemp}°
        </div>
        <div className="col-4 col-sm-2 weekday">
          {week[weekday + 3]}
          <img
            src={weatherForecast[2].icon}
            alt="weatherimage"
            className="miniWeatherIcon"
          />
          <br />
          {weatherForecast[2].minTemp}° {weatherForecast[2].maxTemp}°
        </div>
        <div className="col-4 col-sm-2 weekday">
          {week[weekday + 4]}
          <img
            src={weatherForecast[3].icon}
            alt="weatherimage"
            className="miniWeatherIcon"
          />
          <br />
          {weatherForecast[3].minTemp}° {weatherForecast[3].maxTemp}°
        </div>
        <div className="col-4 col-sm-2 weekday">
          {week[weekday + 5]}
          <img
            src={weatherForecast[4].icon}
            alt="weatherimage"
            className="miniWeatherIcon"
          />
          <br />
          {weatherForecast[4].minTemp}° {weatherForecast[4].maxTemp}°
        </div>
        <div className="col-4 col-sm-2 weekday">
          {week[weekday + 6]}
          <img
            src={weatherForecast[5].icon}
            alt="weatherimage"
            className="miniWeatherIcon"
          />{" "}
          <br />
          {weatherForecast[5].minTemp}° {weatherForecast[5].maxTemp}°
        </div>
      </div>
    </div>
  );
}
