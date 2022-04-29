const Country = ({ country }) => {
  return (
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
  );
};

export default Country;
