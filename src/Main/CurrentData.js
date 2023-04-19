import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Prognosis from "./Prognosis";

let temperatureData = null;

export default function CurrentData(props) {
  const [changingCity, setChangingCity] = useState("");
  const [city, setCity] = useState(props.defaultCity);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);
  const [time, setTime] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [date, setDate] = useState("");
  const [celsius, setCelsius] = useState(true);

  useEffect(() => {
    const url = `https://api.shecodes.io/weather/v1/current?query=${city}&units=metric&key=o54b38af539a41d076df6ce6a0c0btb0`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        temperatureData = Math.round(data.temperature.current);
        setTemperature(temperatureData);
        setHumidity(data.temperature.humidity);
        setWind(data.wind.speed);
        setIcon(data.condition.icon_url);
      });
  }, []);

  useEffect(() => {
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let fullDate = new Date();
    let year = fullDate.getFullYear();
    let month = fullDate.getMonth();
    let day = fullDate.getDate();
    let currentDate = `${month}/${day}/${year}`;
    let weekdayNumber = fullDate.getDay();
    let currentWeekday = week[weekdayNumber];
    let hours = fullDate.getHours();
    let minutes = fullDate.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let currentTime = `${hours}:${minutes}`;
    setTime(currentTime);
    setWeekDay(currentWeekday);
    setDate(currentDate);
  }, []);

  function search() {
    const url = `https://api.shecodes.io/weather/v1/current?query=${city}&units=metric&key=o54b38af539a41d076df6ce6a0c0btb0`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTemperature(Math.round(data.temperature.current));
        setHumidity(data.temperature.humidity);
        setWind(data.wind.speed);
        setIcon(data.condition.icon_url);
      });
  }

  function submitCity(event) {
    event.preventDefault();
    setCity(changingCity);
  }

  useEffect(() => {
    if (city) {
      search(city);
    }
  }, [city]);

  function trackCity(event) {
    setChangingCity(event.target.value);
  }

  function convertToCelsius(event) {
    event.preventDefault();
    setCelsius(true);
  }

  function convertToFahrenheit(event) {
    event.preventDefault();
    setCelsius(false);
  }

  const temperatureInCelsius = (
    <span className="currentTemperature">
      {temperature}° <strong>C</strong> | °
      <a href="/" onClick={convertToFahrenheit} className="metrics">
        F
      </a>
    </span>
  );

  const temperatureInFahrenheit = (
    <span className="currentTemperature">
      {temperature * 1.8 + 32.0}°
      <a href="/" onClick={convertToCelsius} className="metrics">
        C
      </a>{" "}
      | <strong>°F</strong>
    </span>
  );

  const weatherContent = (
    <div className="weather">
      <div className="TimeAndSearch">
        <div className="row">
          <div className="col-5 currentDate">
            {weekDay} {date} <span className="time">{time}</span>
          </div>
          <div className="col-7">
            <form onSubmit={submitCity}>
              <input
                className="enterACity"
                placeholder="Enter a city..."
                type="search"
                onChange={trackCity}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="currentData">
        <div className="row">
          <div className="col-7">
            <h1 className="currentCity">{city}</h1>
            <ul className="humidityAndWind">
              <li>Humidity: {humidity}%</li>
              <li>Wind: {wind} km/h</li>
            </ul>
          </div>
          <div className="col-5">
            <div>
              <img src={icon} className="weatherIcon" alt="weatherIcon" />
            </div>
            {celsius ? temperatureInCelsius : temperatureInFahrenheit}
          </div>
        </div>
        <hr />
      </div>
      <Prognosis location={city} />
    </div>
  );

  const loading = <div>Loading...</div>;

  return <div>{temperature ? weatherContent : loading}</div>;
}
