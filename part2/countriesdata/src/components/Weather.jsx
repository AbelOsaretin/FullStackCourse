const Weather = ({ data }) => {
  console.log(data);
  let celsius;

  if (data) {
    const cal = data.main.temp - 273.15;
    celsius = cal.toFixed(2);
    // console.log(celsius.toFixed(2));
    //  celsius.toFixed(2);

    // `${celsius.toFixed(2)}°C`;
  }

  return (
    <>
      {data ? (
        <div>
          <h2>Weather in {data.name}</h2>
          <p>Temperature {`${celsius} °C`}</p>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          ></img>
          <p>Wind {`${data.wind.speed.toFixed(1)} m/s`}</p>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Weather;
