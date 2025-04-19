import { useState } from "react";

import axios from "axios";

const CountryData = ({ countries }) => {
  let condition;

  const [buttonShow, setButtonShow] = useState(null);

  const handleShowButtonClick = (countryData) => {
    console.log();
    console.log(countryData.latlng[1]);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          countryData.capitalInfo.latlng[0]
        }&lon=${countryData.capitalInfo.latlng[1]}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      )
      .then((response) => console.log(response.data));
    setButtonShow(countryData);
  };

  const handleCloseButtonClick = () => {
    setButtonShow(null);
  };

  if (countries.length > 10) {
    condition = <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    //   axios
    //     .get(
    //       `https://api.openweathermap.org/data/2.5/weather?lat=${
    //         singleCountry.capitalInfo.latlng[0]
    //       }&lon=${singleCountry.capitalInfo.latlng[1]}&appid=${
    //         import.meta.env.VITE_WEATHER_API_KEY
    //       }`
    //     )
    //     .then((response) => console.log(response.data));
    //   console.log("Single Country", singleCountry.capitalInfo[0]);

    condition = countries.map((country, index) => (
      <div key={index}>
        <h1>{country.name.common}</h1>
        <p> Capital {country.capital}</p>
        <p> Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([code, language]) => (
            <li key={code}>{language}</li>
          ))}
        </ul>
        <img
          src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
          alt={`${country.name.common} flag`}
        />

        {/* <div>
          {axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${
                country.capitalInfo.latlng[0]
              }&lon=${country.capitalInfo.latlng[1]}&appid=${
                import.meta.env.VITE_WEATHER_API_KEY
              }`
            )
            .then((response) => console.log(response.data))}
        </div> */}
      </div>
    ));
  } else {
    condition = countries.map((country, index) => (
      <div key={index}>
        {/* {console.log(country.name.common)} */}
        {country.name.common}
        {/* {console.log(country.name.common)} */}
        <button onClick={() => handleShowButtonClick(country)}>Show</button>
      </div>
    ));
  }

  return (
    <>
      <div>{condition}</div>
      {buttonShow ? (
        <div>
          <h1>{buttonShow.name.common}</h1>
          <p> Capital {buttonShow.capital}</p>
          <p> Area {buttonShow.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.entries(buttonShow.languages).map(([code, language]) => (
              <li key={code}>{language}</li>
            ))}
          </ul>
          <img
            src={`https://flagcdn.com/w320/${buttonShow.cca2.toLowerCase()}.png`}
            alt={`${buttonShow.name.common} flag`}
          />
          <button onClick={() => handleCloseButtonClick()}>Close</button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default CountryData;
