import Country from "./Country";

const Countries = ({ countries, searchValue }) => {
  const countriesToShow = searchValue
    ? countries.filter((country) => country.name.common.toLowerCase().includes(searchValue))
    : [];

  if (countriesToShow.length > 10) {
    return "Too many matches, specify another filter";
  }

  if (countriesToShow.length === 1) {
    const country = countriesToShow[0];
    console.log("country :", country);
    return (
      <>
        <div>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <p>
            <b>languages</b>
          </p>
          <ul>
            {Object.values(country.languages).map((lang) => (
              <li>{lang}</li>
            ))}
          </ul>
          {country.flag}
        </div>
      </>
    );
  }

  return (
    <ul>
      {countriesToShow.map((country) => (
        <Country key={country.name.common} country={country} />
      ))}
    </ul>
  );
};

export default Countries;
