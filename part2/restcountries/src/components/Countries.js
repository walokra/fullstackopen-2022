import { useState } from "react";
import Country from "./Country";
import Weather from "./Weather";

const Countries = ({ countries, searchValue }) => {
  const [showCountry, setShowCountry] = useState();

  const countriesToShow = searchValue
    ? countries.filter((country) => country.name.common.toLowerCase().includes(searchValue))
    : [];

  if (countriesToShow.length > 10) {
    return "Too many matches, specify another filter";
  }

  if (countriesToShow.length === 1) {
    const country = countriesToShow[0];

    return (
      <div>
        <Country country={country} />
        <Weather city={country.capital} />
      </div>
    );
  }

  if (showCountry) {
    return <Country country={showCountry} />;
  }

  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.name.common}>
          {country.name.common} <button onClick={() => setShowCountry(country)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
