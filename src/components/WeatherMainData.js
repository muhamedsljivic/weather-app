import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { WEATHER_API_URL } from "../weatherApi";

const WeatherMainData = (props) => {
  const API_KEY = "afe9b724a26a14fbadda1645cd33f621";
  const loadWeatherOptions = () => {
    return fetch(
      `${WEATHER_API_URL}?lat=${props.lat}&lon=${props.lng}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  return <div>{props.children}</div>;
};

export default WeatherMainData;
