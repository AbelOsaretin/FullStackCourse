import { useState, useEffect } from "react";
import axios from "axios";
import CountryData from "./components/CountryData";

// import "./App.css";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

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
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setAllCountries(response.data));
  }, []);

  console.log("********************************************************");

  console.log(searchResult);

  console.log("********************************************************");
  return (
    <>
      <form>
        Find Countries: <input type="text" onChange={handleInputChange}></input>
      </form>

      {/* {console.log(searchResult.name.common)} */}

      <CountryData countries={searchResult} />
    </>
  );
}

export default App;
