import React, { useState } from "react";
import classes from "./App.module.css";
import Search from "./components/Search";
import img from "./imgs/weather-1.jpg";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };

  return (
    <div className={classes.container}>
      <img className={classes.img} src={img} alt="Weather" />
      <div className={classes.weatherInfo}>
        <Search onSearchChange={handleOnSearchChange} />
      </div>
    </div>
  );
}

export default App;
