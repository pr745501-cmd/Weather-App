import React, { useState } from 'react';
import './App.css';

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [humidity, setHumidity] = useState("");

  const changeHandler = (event) => {
    
    setCity(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    
    fetch(`https://api.weatherapi.com/v1/current.json?key=2ee68d53137e4c3282642413252607&q=${city}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setResult(data.error.message || "City not found");
          setHumidity("");

          return;
        }

        setResult(`Temperature at ${city}: ${Math.round(data.current.temp_c)}°C`);
        setHumidity(`Humidity: ${data.current.humidity}%`);
      })
      .catch(() => {
        setResult("Error fetching data.");
        setHumidity("");
      });
  };
  return (

    <div className="weather-bg">
      
      {/* Clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>

      {/* Glass neon card */}
      <div className="card card-glow">
        <div className="card-body center">
          <h1 className="card-title">Weather App</h1>
          <form onSubmit={submitHandler}>
            <div className="input-group">
              <input
                type="text"
                name="city"
                value={city}
                onChange={changeHandler}
                required
                placeholder=" "
                autoComplete="off"
              />
              <label>Enter City Name..</label>
            </div>
            <input type="submit" value="Get Temperature" />
          </form>
          <h2>{result}</h2>
          <h3>{humidity}</h3>
        </div>
      </div>
    </div>
  );
}