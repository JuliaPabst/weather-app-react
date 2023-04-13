import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function CurrentData(props) {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Paris");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
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
  }, []);

  function submitCity(event) {}

  function trackCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div className="weather">
      <div className="TimeAndSearch">
        <div className="row">
          <div className="col-5 currentDate">Saturday 10:00</div>
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
              <li>Humidty: {humidity}%</li>
              <li>Wind: {wind} km/h</li>
            </ul>
          </div>
          <div className="col-5">
            <div>
              <img src={icon} className="weatherIcon" />
            </div>
            <span className="currentTemperature">{temperature}°C | °F</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
