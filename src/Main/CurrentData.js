import React from "react";

export default function CurrentData() {
  const currentData = {
    city: "New York",
    humidity: 45,
    wind: 4.12,
    weatherIcon: "☁️",
    temperature: 12,
  };
  return (
    <div className="currentData">
      <div className="row">
        <div className="col-7">
          <h1 className="currentCity">{currentData.city}</h1>
          <ul className="humidityAndWind">
            <li>Humidty: {currentData.humidity}%</li>
            <li>Wind: {currentData.wind} km/h</li>
          </ul>
        </div>
        <div className="col-5">
          <div>
            <span className="weatherIcon" role="img" aria-label="cloud">
              {currentData.weatherIcon}
            </span>
          </div>
          <span className="currentTemperature">
            {currentData.temperature}°C | °F
          </span>
        </div>
      </div>
      <hr />
    </div>
  );
}
