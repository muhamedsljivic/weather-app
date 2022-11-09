import React, { useState } from "react";
import classes from "./App.module.css";
import Search from "./components/Search";
import img from "./imgs/weather-1.jpg";
import { WEATHER_API_URL } from "./api";
import WeatherMainData from "./components/WeatherMainData";
const API_KEY = "afe9b724a26a14fbadda1645cd33f621";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const currentWeatherFetch = (api) =>
    fetch(`${api}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setCurrentWeather({ name: data.name, temp: data.main.temp });
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));

  if (!isLoaded) {
    currentWeatherFetch(
      `${WEATHER_API_URL}lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );
  }

  const handleOnSearchChange = (searchData) => {
    currentWeatherFetch(
      `${WEATHER_API_URL}lat=${searchData.value[0]}&lon=${searchData.value[1]}&appid=${API_KEY}`
    );
  };

  const handleLatLng = (lat, lng) => {
    setLat(lat);
    setLng(lng);
  };

  return (
    <div className={classes.container}>
      <div>
        <img className={classes.img} src={img} alt="Weather" />
        <WeatherMainData
          onLatLng={handleLatLng}
          isLoaded={isLoaded}
          currentWeather={currentWeather}
        />
      </div>
      <div className={classes.weatherInfo}>
        <Search onSearchChange={handleOnSearchChange} />
        <div className={classes.weatherDetails}>
          <p>Weather Details</p>
          <div className={classes.whw}>
            <p>Cloudy</p>
            <p>86%</p>
          </div>
          <div className={classes.whw}>
            <p>Humidity</p>
            <p>62%</p>
          </div>
          <div className={classes.whw}>
            <p>Wind</p>
            <p>8km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
