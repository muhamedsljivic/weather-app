import classes from "./WeatherDetails.module.css";

const WeatherDetails = (props) => {
  console.log(props.currentWeather);
  return (
    <>
      <div className={classes.weatherDetails}>
        <p>Weather Details</p>
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
      <div>
        <p>Hourly</p>
      </div>
    </>
  );
};

export default WeatherDetails;
