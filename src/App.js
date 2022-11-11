import React, { useState } from "react";
import classes from "./App.module.css";
import Search from "./components/Search";
import cloudsImg from "./imgs/weather-1.jpg";
import clearSkyImg from "./imgs/clear-sky.jpg";
import thunderstormImg from "./imgs/thunderstorm.jpg";
import mistImg from "./imgs/mist.jpg";
import cloudsImgBlur from "./imgs/weather-1-blur.png";
import thunderstormImgBlur from "./imgs/thunderstorm-blur.png";
import mistImgBlur from "./imgs/mist-blur.png";
import clearSkyImgBlur from "./imgs/clear-sky-blur.png";
import { FORECAST_API_URL, WEATHER_API_URL } from "./api";
import WeatherMainData from "./components/WeatherMainData";
import WeatherDetails from "./components/WeatherDetails";

const API_KEY = "b4a4296b885c7588699125c60c7d16fc";

function App() {
  const [img, setImg] = useState(cloudsImg);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isForecastLoaded, setIsForecastLoaded] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const currentWeatherFetch = (api) =>
    fetch(`${api}`)
      .then((data) => data.json())
      .then((data) => {
        const timeVar = new Date();

        timeVar.setHours(timeVar.getHours() + (data.timezone / 3600 - 1));
        setCurrentWeather({
          name: data.name,
          temp: data.main.temp,
          wind: data.wind.speed,
          cloudy: data.clouds.all,
          description: data.weather[0].description,
          time: timeVar.toString().slice(0, 21),
        });
        if (data.weather[0].description.includes("clouds")) {
          setImg(cloudsImg);
          document.body.style.backgroundImage = `url(${cloudsImgBlur})`;
        }
        if (
          data.weather[0].description.includes("thunderstorm") ||
          data.weather[0].description.includes("snow") ||
          data.weather[0].description.includes("rain")
        ) {
          setImg(thunderstormImg);
          document.body.style.backgroundImage = `url(${thunderstormImgBlur})`;
        }
        if (data.weather[0].description.includes("clear")) {
          setImg(clearSkyImg);
          document.body.style.backgroundImage = `url(${clearSkyImgBlur})`;
        }
        if (data.weather[0].description.includes("mist")) {
          setImg(mistImg);
          document.body.style.backgroundImage = `url(${mistImgBlur})`;
        }
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));

  const forecastWeatherFetch = (api) => {
    fetch(`${api}`)
      .then((data) => data.json())
      .then((data) => {
        const minutes = [];
        const temp = [];
        for (let i = 0; i < 6; i++) {
          temp.push(`${data.list[i].main.temp}`);
          minutes.push(
            `${new Date(data.list[i].dt_txt).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          );
        }

        setForecastWeather({
          temp,
          minutes,
        });
        setIsForecastLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  if (!isLoaded) {
    currentWeatherFetch(
      `${WEATHER_API_URL}lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );
  }

  if (!isForecastLoaded) {
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
  };
  const handleLatLng = (lat, lng) => {
    setLat(lat);
    setLng(lng);
  };

  return (
    <div className={classes.container}>
      <div>
        {isLoaded && <img className={classes.img} src={img} alt="Weather" />}
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
          isForecastLoaded={isForecastLoaded}
        />
      </div>
    </div>
  );
}

export default App;
