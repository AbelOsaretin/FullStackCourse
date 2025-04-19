import { useState, useEffect } from "react";
import axios from "axios";
import CountryData from "./components/CountryData";
import Weather from "./components/Weather";

// import "./App.css";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (event) => {
    // setSearch(event.target.value);

    setSearchResult([]);
    const result = allCountries.filter((country) => {
      if (
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        return country;
      }
    });
    console.log("-------------------------------------------");
    console.log(result);
    console.log("-------------------------------------------");
    setSearchResult(result);
    setWeatherData(null);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setAllCountries(response.data));
  }, []);

  useEffect(() => {
    if (searchResult.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            searchResult[0].capitalInfo.latlng[0]
          }&lon=${searchResult[0].capitalInfo.latlng[1]}&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        )
        .then((response) => setWeatherData(response.data));
    }
  }, [searchResult]);

  console.log("********************************************************");

  // console.log(weatherData);

  console.log("********************************************************");
  return (
    <>
      <form>
        Find Countries: <input type="text" onChange={handleInputChange}></input>
      </form>

      {/* {console.log(searchResult.name.common)} */}

      <CountryData countries={searchResult} />
      <Weather data={weatherData} />
    </>
  );
}

export default App;
