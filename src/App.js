import React, { useState } from "react";
import classes from "./App.module.css";
import Search from "./components/Search";
import img from "./imgs/weather-1.jpg";
import { FORECAST_API_URL, WEATHER_API_URL } from "./api";
import WeatherMainData from "./components/WeatherMainData";
import WeatherDetails from "./components/WeatherDetails";

const API_KEY = "afe9b724a26a14fbadda1645cd33f621";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const currentWeatherFetch = (api) =>
    fetch(`${api}`)
      .then((data) => data.json())
      .then((data) => {
        setCurrentWeather({
          name: data.name,
          temp: data.main.temp,
          wind: data.wind.speed,
          cloudy: data.clouds.all,
          description: data.weather[0].description,
        });

        setIsLoaded(true);
      })
      .catch((err) => console.log(err));

  const forecastWeatherFetch = (api) => {
    fetch(`${api}`)
      .then((data) => data.json())
      .then((data) => {
        setForecastWeather({
          time1: data.list[0].dt,
          temp1: data.list[0].main.temp,
          time2: data.list[1].dt,
          temp2: data.list[1].main.temp,
          time3: data.list[2].dt,
          temp3: data.list[2].main.temp,
        });
      })
      .catch((err) => console.log(err));
  };

  if (!isLoaded) {
    currentWeatherFetch(
      `${WEATHER_API_URL}lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );

    forecastWeatherFetch(
      `${FORECAST_API_URL}lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );
  }

  const handleOnSearchChange = (searchData) => {
    currentWeatherFetch(
      `${WEATHER_API_URL}lat=${searchData.value[0]}&lon=${searchData.value[1]}&appid=${API_KEY}`
    );

    forecastWeatherFetch(
      `${FORECAST_API_URL}lat=${searchData.value[0]}&lon=${searchData.value[1]}&appid=${API_KEY}`
    );

    console.log(forecastWeather);
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
        <WeatherDetails
          currentWeather={currentWeather}
          isLoaded={isLoaded}
          forecastWeather={forecastWeather}
        />
      </div>
    </div>
  );
}

export default App;
