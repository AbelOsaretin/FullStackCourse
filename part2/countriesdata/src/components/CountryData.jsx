const CountryData = ({ countries }) => {
  console.log("Country Data", countries);

  let condition;

  if (countries.length > 10) {
    condition = <div>Hi</div>;
  } else if (countries.length === 1) {
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
      </div>
    ));
  } else {
    condition = countries.map((country, index) => (
      <div key={index}>{country.name.common}</div>
    ));
  }

  return condition;
};

export default CountryData;
