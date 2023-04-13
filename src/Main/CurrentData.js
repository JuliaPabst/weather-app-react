import React from "react";
import { useState } from "react";
import { useEffect } from "react";

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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8c78e9e7e9928cd1a2a6f923072c3dec`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        temperatureData = Math.round(data.main.temp);
        setTemperature(temperatureData);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setIcon(
          `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`
        );
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
    minutes < 10 ? (minutes = `0${minutes}`) : (minutes = minutes);
    let currentTime = `${hours}:${minutes}`;
    setTime(currentTime);
    setWeekDay(currentWeekday);
    setDate(currentDate);
  });

  function search() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8c78e9e7e9928cd1a2a6f923072c3dec`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTemperature(Math.round(data.main.temp));
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setIcon(
          `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`
        );
      });
  }

  function submitCity(event) {
    event.preventDefault();
    search();
    setCity(changingCity);
  }

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
    console.log(temperature);
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

  return (
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
              <img src={icon} className="weatherIcon" />
            </div>
            {celsius ? temperatureInCelsius : temperatureInFahrenheit}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
