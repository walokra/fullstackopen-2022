import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const eventHandler = (response) => {
      setCountries(response.data);
      // console.log("response.data :", response.data);
    };

    const promise = axios.get("https://restcountries.com/v3.1/all");
    promise.then(eventHandler);
  }, []);

  const searchCountries = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <Search searchValue={searchValue} searchCountries={searchCountries} />

      <Countries countries={countries} searchValue={searchValue} />
    </div>
  );
};

export default App;
