const Search = ({ searchValue, searchCountries }) => {
  return (
    <div>
      find countries <input value={searchValue} onChange={searchCountries} />
    </div>
  );
};

export default Search;
