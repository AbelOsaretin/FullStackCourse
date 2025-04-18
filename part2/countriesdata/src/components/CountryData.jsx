import { useState } from "react";

const CountryData = ({ countries }) => {
  let condition;

  const [buttonShow, setButtonShow] = useState(null);

  const handleShowButtonClick = (countryData) => {
    setButtonShow(countryData);
  };

  if (countries.length > 10) {
    condition = <div>Too many matches, specify another filter</div>;
  }

  //   else if (countries.length === 1) {
  //     condition = countries.map((country, index) => (
  //       <div key={index}>
  //         <h1>{country.name.common}</h1>
  //         <p> Capital {country.capital}</p>
  //         <p> Area {country.area}</p>
  //         <h2>Languages</h2>
  //         <ul>
  //           {Object.entries(country.languages).map(([code, language]) => (
  //             <li key={code}>{language}</li>
  //           ))}
  //         </ul>
  //         <img
  //           src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
  //           alt={`${country.name.common} flag`}
  //         />
  //       </div>
  //     ));
  //   }
  else {
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
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default CountryData;
