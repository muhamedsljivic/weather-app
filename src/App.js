import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import Search from "./components/Search";
import img from "./imgs/weather-1.jpg";
import { WEATHER_API_URL } from "./api";
const API_KEY = "afe9b724a26a14fbadda1645cd33f621";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnSearchChange = (searchData) => {
    const currentWeatherFetch = () =>
      fetch(
        `${WEATHER_API_URL}lat=${searchData.value[0]}&lon=${searchData.value[1]}&appid=${API_KEY}`
      )
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setCurrentWeather({ name: data.name, temp: data.main.temp });
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));

    currentWeatherFetch();
  };

  return (
    <div className={classes.container}>
      <div>
        <img className={classes.img} src={img} alt="Weather" />
        <div className={classes.cityDetails}>
          <h1 className={classes.degree}>
            {isLoaded && Math.round(currentWeather.temp - 273.15)}°
          </h1>
          <h1 className={classes.cityName}>
            {isLoaded && currentWeather.name}
          </h1>
          <p>{`${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`}</p>
        </div>
      </div>
      <div className={classes.weatherInfo}>
        <Search onSearchChange={handleOnSearchChange} />
      </div>
    </div>
  );
}

export default App;
