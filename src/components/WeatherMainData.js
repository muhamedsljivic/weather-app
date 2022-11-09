import React, { useState } from "react";
import classes from "./WeatherMainData.module.css";

const WeatherMainData = (props) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    setLat(crd.latitude);
    setLng(crd.longitude);

    props.onLatLng(lat, lng);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
  return (
    <div lat={lat} lng={lng} className={classes.cityDetails}>
      <h1 className={classes.degree}>
        {props.isLoaded && Math.round(props.currentWeather.temp - 273.15)}°
      </h1>
      <h1 className={classes.cityName}>
        {props.isLoaded && props.currentWeather.name}
      </h1>
      <p>{`${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`}</p>
    </div>
  );
};

export default WeatherMainData;
