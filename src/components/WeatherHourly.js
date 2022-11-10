import classes from "./WeatherHourly.module.css";

const WeatherHourly = (props) => {
  return (
    <div className={classes.perHour}>
      <p>Hourly forecast</p>
      {props.isForecastLoaded &&
        props.forecastWeather.temp.map((item, i) => {
          return (
            <div key={i} className={`${classes.whw} ${classes.tempTime}`}>
              <p>{props.forecastWeather.minutes[i]}</p>
              <p>{Math.round(item - 273.15)}°</p>
            </div>
          );
        })}
    </div>
  );
};

export default WeatherHourly;
