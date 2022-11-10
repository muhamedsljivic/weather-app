import classes from "./WeatherDetails.module.css";
import WeatherHourly from "./WeatherHourly";

const WeatherDetails = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.weatherDetails}>
        <p className={classes.title}>Weather Details</p>
        <div className={classes.whw}>
          <p>Description</p>
          <p>
            {props.isLoaded &&
              props.currentWeather.description[0].toUpperCase() +
                props.currentWeather.description.substring(1)}
          </p>
        </div>
        <div className={classes.whw}>
          <p>Cloudy</p>
          <p>{props.isLoaded && props.currentWeather.cloudy}%</p>
        </div>
        <div className={classes.whw}>
          <p>Wind</p>
          <p>
            {props.isLoaded &&
              Math.round((props.currentWeather.wind * 3600) / 1000)}
            km/h
          </p>
        </div>
      </div>
      <WeatherHourly
        isForecastLoaded={props.isForecastLoaded}
        forecastWeather={props.forecastWeather}
      />
    </div>
  );
};

export default WeatherDetails;
